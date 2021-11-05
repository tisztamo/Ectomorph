import apps from "../../apps.js"
import {execSync} from "child_process"
import {buildConf} from "./build_config.js"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const {distDir} = buildConf.options

const {src, dest} = require("gulp")

export async function executeAppBuild(app) {
  console.log(`Building app "${app.baseDir}"...`)
  execSync("npm run dist",
    {
      cwd: app.baseDir,
    },
    function (err, stdout, stderr) {
      console.log(stdout)
      if (err) {
        console.log(stderr)
        throw (`ERROR: Unable to build app "${app.baseDir}" with command '':`, err)
      }
    }
  )
  console.log(`App "${app.baseDir}" built.`)
}

export async function buildApps() {
  await Promise.all(apps.filter(app => !app.excludeFromDist).map(executeAppBuild))
}

export async function copyAssets() {
  return src("assets/**")
    .pipe(dest(distDir + "assets/"))
}

export async function copyWebModules() {
  return src("web_modules/**/*js")
    .pipe(dest(distDir + "web_modules/"))
}

export async function copyCode() {
  return src("src/**")
    .pipe(dest(distDir + "src/"))
}

export async function copyConf() {
  return src("platform-config.js")
    .pipe(dest(distDir))
}
export async function copyHtml() {
  return src("index.html")
    .pipe(dest(distDir))
}

export async function copyMocks() {
  return src("mocks/**")
    .pipe(dest(distDir + "mocks/"))
}

export async function copyApp(app) {
  return src(app.baseDir + "dist/**")
    .pipe(dest(distDir + app.baseDir))
}

export async function copyApps() {
  return Promise.all(apps.filter(app => !app.excludeFromDist).map(copyApp))
}
