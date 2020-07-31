require('colors')

import path from 'path';
import {exec} from 'shelljs';
import config from '../../config';
import paths from '../../utils/paths';
import log from '../../utils/log';

export default () => new Promise(async (resolve, reject) => {
  try {
    const platform = await config.getPlatform()
    const buildType = await config.getBuildType()
    const script = path.join(__dirname, platform, buildType)
    const rootPath = paths.getRootPath()
    log.header(`Preparing ${platform} build...`.yellow)
    log.header(`Got build folder: ${rootPath}`)
    log.header(`Running script ${script}`)
    await require(script)({ rootPath })
    resolve()
  } catch (e) {
    reject(e)
  }
});
