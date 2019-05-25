require('colors')

const shell = require('shelljs')
const path = require('path')

const { exec } = shell
const rootPath = path.resolve(__dirname, '../../../')
const androidPath = path.join(rootPath, 'android')
const apkPath = path.join(androidPath, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk')
/* eslint-disable-next-line */
const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))

const build = async () => {
  console.log(`Trying to remove old application versions...`.yellow)
  await exec(`adb uninstall -k ${capacitorConfig.appId}`, { silent: true })
  console.log(`Transfering apk to device...`.yellow)
  await exec(`adb install ${apkPath}`, { cwd: androidPath })
  console.log(`Launching application on device...`.yellow)
  await exec(`adb shell monkey -p ${capacitorConfig.appId} -c android.intent.category.LAUNCHER 1`, {
    silent: true
  })
  console.log(`Android build installed successfully!`.green.bold)
  process.exit()
}

build()
