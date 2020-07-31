require('colors')

import path from 'path'
import paths from '../../utils/paths'
import log from '../../utils/log'

export default () =>
  new Promise(async (resolve, reject) => {
    try {
      const script = path.join(__dirname, 'capacitor')
      const rootPath = paths.getRootPath()
      log.header(`Got build folder: ${rootPath}`)
      log.header(`Running script ${script}`)
      await require(script)({ rootPath })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
