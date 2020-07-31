require('colors')

import shell from 'shelljs';
import path from 'path';
import log from '../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
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
});
