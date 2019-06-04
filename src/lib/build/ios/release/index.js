require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios')
    /* eslint-disable-next-line */
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const { appName } = capacitorConfig
    log.header('Generating iOS release build...'.yellow)
    await exec(`xcodebuild -workspace ${appName}.xcworkspace -scheme ${appName} -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/${appName}.xcarchive`, { cwd: iosPath })
    await exec(`xcodebuild -exportArchive -archivePath $PWD/build/${appName}.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build`, { cwd: iosPath })
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

