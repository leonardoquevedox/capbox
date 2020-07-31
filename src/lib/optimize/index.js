require('colors')

import path from 'path';
import {exec} from 'shelljs';
import paths from '../../utils/paths';
import log from '../../utils/log';

export default () =>
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
  });
