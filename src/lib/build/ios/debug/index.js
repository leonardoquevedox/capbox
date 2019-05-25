require('colors')

const shell = require('shelljs')
const path = require('path')

const { log } = console
const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const iosPath = path.join(rootPath, 'ios')
    console.log(iosPath)
    log(`Generating Android apk file...`.yellow)
    await exec(`./gradlew assembleDebug`, { cwd: iosPath })
    log(`Android apk successfully!`.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

