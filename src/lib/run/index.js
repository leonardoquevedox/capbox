require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')
const log = require('../../utils/log')

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const platform = await config.getPlatform()
    const script = path.join(__dirname, platform)
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
