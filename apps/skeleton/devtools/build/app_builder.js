import {buildConf} from "../../../../devtools/build/build_config.js"

import {copyAppAssets, copyAppHtml, copyAppMocks, copyAppConf, copyAppWebModules, bundleAppCode} from "../../../../devtools/build/app_builder.js"

console.log("Build config: ", buildConf)

export const copyAssets = copyAppAssets
export const copyHtml = copyAppHtml
export const copyMocks = copyAppMocks
export const copyConf = copyAppConf
export const copyWebModules = copyAppWebModules
export const rollupCode = bundleAppCode
