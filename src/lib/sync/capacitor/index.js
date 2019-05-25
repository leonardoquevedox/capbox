require('colors')

const ip = require('ip')
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const packageJSON = require('../../../../package.json')

const { exec } = shell
const { log } = console
const rootPath = path.resolve(__dirname, '../../../')
const capacitorConfigFile = path.join(rootPath, 'capacitor.config.json')
const capacitorConfigContent = packageJSON.capacitor

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      /* const isLivereload = process.env.CAPBOX_LIVERELOAD
    log(`Generating capacitor config....`.yellow)
    if (isLivereload) {
      const LIVERELOAD_IP = ip.address()
      const LIVERELOAD_PORT = process.env.PORT
      const LIVERELOAD_SERVER = `http://${LIVERELOAD_IP}:${LIVERELOAD_PORT}`
      capacitorConfigContent.server = { url: LIVERELOAD_SERVER }
      exec('node scripts/run/livereload', { async: true, cwd: rootPath })
    } */
      fs.writeFileSync(capacitorConfigFile, JSON.stringify(capacitorConfigContent, null, 2))
      log(`Generating capacitor config....`.yellow)
      await exec('npx cap sync')
      log('Capacitor build updated successfully!'.green)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
