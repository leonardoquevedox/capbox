require('colors')

const path = require('path')
const { exec } = require('shelljs')
const paths = require('../../utils/paths')
const log = require('../../utils/log')

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const optimizeJS = path.join(__dirname, 'js')
      const optimizeCSS = path.join(__dirname, 'css')
      const rootPath = paths.getRootPath()
      log.header(`Optimizing application static files...`.yellow)
      await require(optimizeJS)({ rootPath })
      await require(optimizeCSS)({ rootPath })
      resolve()
    } catch (e) {
      reject(e)
    }
  })
