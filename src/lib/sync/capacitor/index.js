require('colors')

import ip from 'ip';
import path from 'path';
import fs from 'fs-extra';
import shell from 'shelljs';
import log from '../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const capacitorConfigFile = path.join(rootPath, 'capacitor.config.json')
    /* eslint-disable-next-line */
    const capacitorConfigContent = require(capacitorConfigFile)
    const isLivereload = process.env.CAPBOX_LIVERELOAD
    if (isLivereload) {
      const LIVERELOAD_IP = ip.address()
      const LIVERELOAD_PORT = process.env.PORT
      const LIVERELOAD_SERVER = `http://${LIVERELOAD_IP}:${LIVERELOAD_PORT}`
      capacitorConfigContent.server = { url: LIVERELOAD_SERVER }
    }
    fs.writeFileSync(capacitorConfigFile, JSON.stringify(capacitorConfigContent, null, 2))
    log.header(`Generating capacitor config....`.yellow)
    await exec('npx cap sync', { cwd: rootPath })
    log.success('Capacitor build updated successfully!'.green)
    resolve()
  } catch (e) {
    reject(e)
  }
});
