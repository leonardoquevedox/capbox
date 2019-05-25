require('colors')

const shell = require('shelljs')
const path = require('path')

const { log } = console
const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const androidPath = path.join(rootPath, 'android')
    log(`Generating Android apk file...`.yellow)
    await exec(`./gradlew assembleDebug`, { cwd: androidPath })
    log(`Android apk successfully!`.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

