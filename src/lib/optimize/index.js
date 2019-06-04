require('colors')

const path = require('path')
const { exec } = require('shelljs')
const paths = require('../../utils/paths')
const log = require('../../utils/log')

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const optimizeJS = path.join(__dirname, 'js')
      // const optimizeCSS = path.join(__dirname, 'css')
      const CAPBOX_ENVIRONMENT = `npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()}`
      log.header(`Optimizing application static files...`.yellow)
      await exec(`${CAPBOX_ENVIRONMENT} node ${optimizeJS}`)
      // await exec(`${CAPBOX_ENVIRONMENT} node ${optimizeCSS}`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
