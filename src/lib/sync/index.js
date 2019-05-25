require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const script = path.join(__dirname, 'capacitor')
    await exec(`npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()} node ${script}`)
    resolve()
  } catch (e) {
    reject(e)
  }
})