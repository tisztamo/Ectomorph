import {copyAssets, copyHtml, copyMocks, copyWebModules, copyConf, rollupCode} from "./devtools/build/app_builder.js"

import pkg from 'gulp'
const {series} = pkg

export default series(
  series(copyAssets, copyHtml, copyMocks, copyConf, copyWebModules, rollupCode)
)
