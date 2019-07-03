require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios', 'App')
    log.header('Generating iOS build...'.yellow)
    await exec(`xcodebuild build-for-testing -workspace App.xcworkspace -scheme App -destination generic/platform=iOS`, { cwd: iosPath })
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

