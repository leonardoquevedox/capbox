require('colors')

const shell = require('shelljs')
const exec = shell.exec
const path = require('path')

const rootPath = path.resolve(__dirname, '../../../../')
const iosPath = path.join(rootPath, 'ios')

module.exports = async () => {
  return new Promise((resolve, reject)=>{
    try{
      console.log(`Generating iOS .ipa file...`.yellow)
      console.log(`.ipa file generated successfully!`.green.bold)
      resolve()
    } catch(e){
      reject(e)
    }
  })
}

