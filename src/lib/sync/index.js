require('colors')

const path = require('path')
const paths = require('../../utils/paths')
const log = require('../../utils/log')

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const script = path.join(__dirname, 'capacitor')
    const rootPath = paths.getRootPath()
    log.header(`Preparing ${platform} build...`.yellow)
    log.header(`Got build folder: ${rootPath}`)
    log.header(`Running script ${script}`)
    await require(script)({ rootPath })
    resolve()
  } catch (e) {
    reject(e)
  }
})
