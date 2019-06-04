require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject) => {
  try {
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios')
    /* eslint-disable-next-line */
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const { appName, appId } = capacitorConfig
    log.header('Generating iOS build...'.yellow)
    await exec(
      `xcodebuild -project ${appName}.xcodeproj -scheme ${appName} -sdk iphonesimulator10.3 clean analyze`,
      { cwd: iosPath }
    )
    await exec(
      `xcrun xcodebuild -arch i386 \
    -scheme ${appName} \
    -workspace ${appName}.xcworkspace \
    -configuration Debug \ 
    -derivedDataPath build`,
      {
        cwd: iosPath
      }
    )
    // await exec(`xcrun simctl install booted ${appId}`, { cwd: iosPath })
    // await exec(`xcrun simctl launch booted ${appId}`, { cwd: iosPath })
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch (e) {
    reject(e)
  }
})
