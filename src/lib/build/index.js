require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')
const log = require('../../utils/log')

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const platform = await config.getPlatform()
    const buildType = await config.getBuildType()
    const script = path.join(__dirname, platform, buildType)
    log.header(`Preparing ${platform} build...`.yellow)
    log.header(`Got build folder: ${paths.getRootPath()}`)
    log.header(`Running script ${script}`)
    await exec(`npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()} node ${script}`)
    resolve()
  } catch (e) {
    reject(e)
  }
})
