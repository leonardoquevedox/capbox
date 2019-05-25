require('colors')

const shell = require('shelljs')
const path = require('path')

const { exec } = shell

const build = async () => {
  const rootPath = process.env.CAPACITOR_PROJECT_ROOT
  const androidPath = path.join(rootPath, 'android')
  const apkPath = path.join(androidPath, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk')
  /* eslint-disable-next-line */
  const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
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
