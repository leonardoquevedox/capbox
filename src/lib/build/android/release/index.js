require('colors')

import shell from 'shelljs';
import path from 'path';
import log from '../../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const androidPath = path.join(rootPath, 'android')
    const isWin = process.platform === "win32"
    log.header(`Generating android build...`.yellow)

    console.log(`Using root path ${rootPath}`)
    console.log(`Using android path ${androidPath}`)

    if (isWin) await exec('gradlew assembleRelease', { cwd: androidPath })
    else await exec('./gradlew assembleRelease', { cwd: androidPath })

    log.success(`Android built successfully!`.green.bold)
    resolve()
  } catch (e) {
    reject(e)
  }
});

