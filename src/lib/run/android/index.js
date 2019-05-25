require('colors')

const shell = require('shelljs')
const path = require('path')

const { exec } = shell

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rootPath = process.env.CAPACITOR_PROJECT_ROOT
      const androidPath = path.join(rootPath, 'android')
      const apkPath = path.join(
        androidPath,
        'app',
        'build',
        'outputs',
        'apk',
        'debug',
        'app-debug.apk'
      )
      /* eslint-disable-next-line */
      const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
      console.log(`Trying to remove old application versions...`.yellow)
      await exec(`adb uninstall -k ${capacitorConfig.appId}`, { silent: true })
      console.log(`Transfering apk to device...`.yellow)
      await exec(`adb install ${apkPath}`, { cwd: androidPath })
      console.log(`Launching application on device...`.yellow)
      await exec(
        `adb shell monkey -p ${capacitorConfig.appId} -c android.intent.category.LAUNCHER 1`,
        {
          silent: true
        }
      )
    } catch (e) {
      reject(e)
    }
  })
