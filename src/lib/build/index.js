require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')

module.exports = new Promise(async (resolve, reject) => {
  try {
    const { log } = console
    const platform = await config.getPlatform()
    const buildType = await config.getBuildType()
    const buildScript = path.join(__dirname, platform, buildType)
    log(`Preparing application for ${platform} platform...`.yellow)
    await exec(`npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()} node ${buildScript}`)
    resolve()
  } catch (e) {
    reject(e)
  }
})
