require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios', 'App')
    log.header('Generating iOS release build...'.yellow)
    await exec(`xcodebuild -workspace App.xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/App.xcarchive`, { cwd: iosPath })
    await exec(`xcodebuild -exportArchive -archivePath $PWD/build/App.xcarchive -exportPath $PWD/build -exportOptionsPlist $PWD/exportOptions.plist`, { cwd: iosPath })
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

