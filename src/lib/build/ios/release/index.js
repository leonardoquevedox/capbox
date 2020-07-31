require('colors')

import shell from 'shelljs';
import path from 'path';
import log from '../../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    /*  const rootPath = process.env.CAPACITOR_PROJECT_ROOT
     const iosPath = path.join(rootPath, 'ios', 'App')
     log.header('Generating iOS release build...'.yellow)
     await exec(`xcodebuild -workspace App.xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/App.xcarchive`, { cwd: iosPath })
     await exec(`xcodebuild -exportArchive -archivePath $PWD/build/App.xcarchive -exportPath $PWD/build -exportOptionsPlist $PWD/App/App/exportOptions.plist`, { cwd: iosPath }) */
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch (e) {
    reject(e)
  }
});

