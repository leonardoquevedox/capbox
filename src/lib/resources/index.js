require('colors')

const { exec } = require('shelljs')
const paths = require('../../utils/paths')

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      await exec('npx capacitor-resources', { cwd: paths.getRootPath() })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
