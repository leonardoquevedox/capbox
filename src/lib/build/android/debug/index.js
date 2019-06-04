require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../../utils/log')

const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const androidPath = path.join(rootPath, 'android')
    log.header(`Generating android build...`.yellow)
    await exec(`./gradlew assembleDebug`, { cwd: androidPath })
    log.success(`Android built successfully!`.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

