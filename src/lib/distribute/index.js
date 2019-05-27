require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { log } = console
      const platform = await config.getPlatform()
      /* eslint-disable-next-line */
      const capacitorConfig = require(path.join(paths.getRootPath(), 'capacitor.config.json'))
      const stage = await config.getDistributionStage(platform, capacitorConfig)
      const script = path.join(__dirname, platform)
      const environmentVars = `npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()}`
      log(`Distributing a new version ${platform} ${stage} version...`.yellow)
      await exec(`${environmentVars} node ${script}`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
