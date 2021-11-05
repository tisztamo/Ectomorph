import {buildConf} from "./build_config.js"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const rollup = require("rollup")
const terser = require("rollup-plugin-terser")
const {src, dest} = require("gulp")

const {distDir, loaderFile} = buildConf.options

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
}

export async function bundleAppCode(application) {
  const inputOptions = {
    input: loaderFile,
    plugins: [terser.terser({
      keep_classnames: true
    })],
    onwarn (warning, warn) {
      if (warning.code === 'UNRESOLVED_IMPORT' &&
        warning.message.indexOf("web_modules") !== -1) return
      warn(warning)
    }
  }

  const outputOptions = {
    format: "esm",
    file: distDir + loaderFile
  }
  await build(inputOptions, outputOptions)
}

export async function copyAppAssets() {
  return src("assets/**")
    .pipe(dest(distDir + "assets"))
}

export async function copyAppHtml() {
  return src("index.html")
    .pipe(dest(distDir))
}

export async function copyAppConf() {
  return src("config.js")
    .pipe(dest(distDir))
}

export async function copyAppWebModules() {
  return src("web_modules/**")
    .pipe(dest(distDir + "web_modules"))
}

export async function copyAppMocks() {
  return src("mocks/**")
    .pipe(dest(distDir + "mocks"))
}

export async function copyAppLegacyDeps() {
  return src("legacy_deps/**")
    .pipe(dest(distDir + "legacy_deps"))
}
