#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 */

require('colors')
import shell from 'shelljs';
import fs from 'fs-extra';
import path from 'path';
import brotli from 'brotli';
import klawSync from 'klaw-sync';

const { exec } = shell
import log from '../../../utils/log';

const getFileName = filePath => path.basename(filePath)

const gzip = async filePath => {
  log.info(`Gzipping ${getFileName(filePath)} file...`.yellow)
  await exec(`npx ngzip ${filePath} > ${filePath}.gz`, { silent: true })
}

const brotle = async filePath => {
  log.info(`Brotling ${getFileName(filePath)} file...`.yellow)
  let brotled = brotli.compress(fs.readFileSync(filePath))
  await fs.writeFileSync(`${filePath}.br`, brotled, { encode: 'UTF-8' })
}

const optimizeJS = async filePath => {
  log.info(`Optimizing ${getFileName(filePath)} file...`.yellow)
  await exec(
    `npm run babel ${filePath} -- --out-file ${filePath} --presets=@babel/env --compact=true --quiet`,
    { silent: true }
  )
  log.info(`Uglyfying ${getFileName(filePath)} file...`.yellow)
  await exec(`npx uglifyjs ${filePath} -o ${filePath} --compress --mangle`)
  if (process.env.CAPBOX_ZIP_ASSETS) {
    await gzip(filePath)
    await brotle(filePath)
  }
}

const optimizeJSFilesFor = async (buildDir, options) => {
  let files = klawSync(buildDir)
    .map(file => {
      if (file && file.path) return file.path
    })
    .filter(file => {
      const filename = file || ''
      const nameChunks = filename.split('.')
      const extension = nameChunks[nameChunks.length - 1]
      return extension === 'js' && options.blacklist.indexOf(filename) == -1
    })
  return Promise.all(files.map(file => optimizeJS(file)))
}

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    const buildDir = path.join(rootPath, capacitorConfig.webDir)
    const blacklist = ['polyfills.js', 'sw-toolbox.js']
    await optimizeJSFilesFor(buildDir, { blacklist })
    resolve()
  } catch (e) {
    reject(e)
  }
});
