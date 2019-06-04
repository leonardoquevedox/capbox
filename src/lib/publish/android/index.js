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
    const appName = capacitorConfig.publish.appcenter.android[stage]
    const androidPath = path.join(rootPath, 'android')
    const appExecutable = path.join(
      androidPath,
      'app',
      'build',
      'outputs',
      'apk',
      'release',
      'app-release.apk'
    )
    log.header(`Uploading app build...`.yellow)
    await exec(
      `npx appcenter-cli distribute release --app ${appName} -f ${appExecutable} -g Collaborators`,
      { cwd: androidPath }
    )
    resolve()
  } catch (e) {
    reject(e)
  }
})
