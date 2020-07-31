require('colors')

import {exec} from 'shelljs';
import paths from '../../utils/paths';

export default () =>
  new Promise(async (resolve, reject) => {
    try {
      await exec('npx capacitor-resources', { cwd: paths.getRootPath() })
      resolve()
    } catch (e) {
      reject(e)
    }
  });
