import fs from "fs"
import path from "path"

import {rollup} from "rollup"
import {nodeResolve} from '@rollup/plugin-node-resolve'

const sourcedir = "node_modules"
const outputdir = "web_modules"

function readPackageJson(dir) {
  const raw = fs.readFileSync(path.join(dir, "package.json"))
  return JSON.parse(raw)
}

function findEntry(pkgDir) {
  return readPackageJson(pkgDir).module
}

function parseModuleDescriptorStr(moduleDescStr) {
  const parts = moduleDescStr.split("/")
  const whole = path.join(...parts)
  const lastpart = parts.pop()
  if (lastpart.indexOf(".") !== -1) { // File name at the end
    return {
      dir: path.join(sourcedir, ...parts),
      entry: lastpart,
      output: whole
    }
  } else {
    const dir = path.join(sourcedir, ...parts, lastpart)
    let entry = findEntry(dir)
    if (!entry) {
      entry = "index.js"
      console.warn("WARNING: No module entry found in " + dir + ". Assuming " + entry)
    }
    return {
      dir,
      entry,
      output: path.join(whole, entry)
    }
  }
}

async function generateWebModule(moduleDescStr) {
  const moduleDesc = parseModuleDescriptorStr(moduleDescStr)
  console.log(moduleDesc)
  const outputOptions = {
    file: path.join(outputdir, moduleDesc.output),
    format: "esm"
  }
  const bundle = await rollup({
    input: path.join(moduleDesc.dir, moduleDesc.entry),
    plugins: [nodeResolve()]
  })
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
}

export function generateWebmodules() {
  const ownpackage = readPackageJson(".")
  const webModules = ownpackage.webModules
  console.log(`Generating ${webModules.length} dependencies to ${outputdir}:`)
  webModules.forEach(dep => generateWebModule(dep))
}
