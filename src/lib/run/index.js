require('colors')

import path from 'path'
import { exec } from 'shelljs'
import config from '../../config'
import paths from '../../utils/paths'
import log from '../../utils/log'

export default () =>
  new Promise(async (resolve, reject) => {
    try {
      const platform = await config.getPlatform()
      const script = path.join(__dirname, platform)
      const rootPath = paths.getRootPath()
      log.header(`Preparing ${platform} build...`.yellow)
      log.header(`Got build folder: ${rootPath}`)
      log.header(`Running script ${script}`)
      const runScript = require(script).default
      await runScript({ rootPath })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
