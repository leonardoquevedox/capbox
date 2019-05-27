require('colors')

const shell = require('shelljs')
const path = require('path')

const { log } = console
const { exec } = shell

module.exports = new Promise(async (resolve, reject)=>{
  try{
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const androidPath = path.join(rootPath, 'android')
    console.log(androidPath)
    log('Generating android build...'.yellow)
    await exec('./gradlew assembleRelease', { cwd: androidPath })
    log('Android built successfully!'.green.bold)
    resolve()
  } catch(e){
    reject(e)
  }
})

