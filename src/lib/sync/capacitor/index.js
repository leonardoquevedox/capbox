require('colors')

const ip = require('ip')
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')

const { exec } = shell
const { log } = console

module.exports = new Promise(async (resolve, reject) => {
  try {
    const rootPath = process.env.CAPACITOR_PROJECT_ROOT
    const capacitorConfigFile = path.join(rootPath, 'capacitor.config.json')
    /* eslint-disable-next-line */
    const capacitorConfigContent = require(capacitorConfigFile)
    const isLivereload = process.env.CAPBOX_LIVERELOAD
    log(`Generating capacitor config....`.yellow)
    if (isLivereload) {
      const LIVERELOAD_IP = ip.address()
      const LIVERELOAD_PORT = process.env.PORT
      const LIVERELOAD_SERVER = `http://${LIVERELOAD_IP}:${LIVERELOAD_PORT}`
      capacitorConfigContent.server = { url: LIVERELOAD_SERVER }
    }
    fs.writeFileSync(capacitorConfigFile, JSON.stringify(capacitorConfigContent, null, 2))
    log(`Generating capacitor config....`.yellow)
    await exec('npx cap sync', { cwd: rootPath })
    log('Capacitor build updated successfully!'.green)
    resolve()
  } catch (e) {
    reject(e)
  }
})
