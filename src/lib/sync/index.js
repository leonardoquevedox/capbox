require('colors')

import path from 'path'
import paths from '../../utils/paths'
import log from '../../utils/log'

export default () =>
  new Promise(async (resolve, reject) => {
    try {
      const script = path.join(__dirname, 'capacitor', 'index.js')
      const rootPath = paths.getRootPath()
      log.header(`Got build folder: ${rootPath}`)
      log.header(`Running script ${script}`)
      const runScript = require(script).default
      await runScript({ rootPath })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
