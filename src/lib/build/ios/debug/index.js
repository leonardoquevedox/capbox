require('colors')

const shell = require('shelljs')
const path = require('path')

const { log } = console
const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios')
    /* eslint-disable-next-line */
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const { appName } = capacitorConfig
    log('Generating iOS build...'.yellow)
    await exec(`xcodebuild build-for-testing -workspace ${appName}.xcworkspace -scheme ${appName} -destination generic/platform=iOS`, { cwd: iosPath })
    log('iOS built successfully!'.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

