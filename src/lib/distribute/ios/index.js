require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject) => {
  try {
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const stage = process.env.CAPBOX_DISTRIBUTE_STAGE
    /* eslint-disable-next-line */
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const { appName } = capacitorConfig
    const distributionName = capacitorConfig.publish.appcenter.ios[stage]
    const iosPath = path.join(rootPath, 'ios')
    const appExecutable = path.join(iosPath, 'build', `${appName}.ipa`)
    log.header(`Uploading app build...`.yellow)
    await exec(
      `npx appcenter-cli distribute release --app ${distributionName} -f ${appExecutable} -g Collaborators`,
      { cwd: iosPath }
    )
    resolve()
  } catch (e) {
    reject(e)
  }
})
