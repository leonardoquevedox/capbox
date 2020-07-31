require('colors')

const shell = require('shelljs')
const path = require('path')
const log = require('../../../../utils/log')

const { exec } = shell

module.exports = ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const androidPath = path.join(rootPath, 'android')
    const isWin = process.platform === "win32"
    log.header(`Generating android build...`.yellow)

    if (isWin) await exec('gradlew assembleDebug', { cwd: androidPath })
    else await exec('./gradlew assembleDebug', { cwd: androidPath })

    log.success(`Android built successfully!`.green.bold)
    resolve()
  } catch (e) {
    reject(e)
  }
})

