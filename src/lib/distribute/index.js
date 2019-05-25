require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const { log } = console
    const platform = await config.getPlatform()
    const script = path.join(__dirname, platform)
    log(`Distributing a new version ${platform} version...`.yellow)
    await exec(`npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()} node ${script}`)
    resolve()
  } catch (e) {
    reject(e)
  }
})
