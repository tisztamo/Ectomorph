import {buildApps, copyApps, copyWebModules, copyCode, copyConf, copyMocks, copyAssets, copyHtml} from "./utils/build/platform_builder.js"

import pkg from 'gulp'
const {parallel, series} = pkg

export default parallel(
  series(buildApps, copyApps),
  copyWebModules,
  copyCode,
  copyConf,
  copyMocks,
  copyAssets,
  copyHtml,
)
