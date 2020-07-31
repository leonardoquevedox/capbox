#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 */

require('colors')
import shell from 'shelljs';
import path from 'path';
import klawSync from 'klaw-sync';
import log from '../../../utils/log';

const { exec } = shell

const getFileName = filePath => path.basename(filePath)

const optimizeCSS = async filePath => {
  log.info(`Optimizing CSS on ${getFileName(filePath)} file...`.yellow)
  await exec(`npx cleancss ${filePath} -o ${filePath} -02`, { silent: true })
  if (process.env.CAPBOX_ZIP_ASSETS) {
    await gzip(filePath)
    await brotle(filePath)
  }
}

const optimizeCSSFor = async buildDir => {
  let files = klawSync(buildDir)
    .map(file => {
      if (file && file.path) return file.path
    })
    .filter(file => {
      const filename = file || ''
      const nameChunks = filename.split('.')
      const extension = nameChunks[nameChunks.length - 1]
      return extension === 'css' && options.blacklist.indexOf(filename) == -1
    })
  return Promise.all(files.map(file => optimizeCSS(file)))
}

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const buildDir = path.join(rootPath, capacitorConfig.webDir)
    await optimizeCSSFor(buildDir)
    resolve()
  } catch (e) {
    reject(e)
  }
});
