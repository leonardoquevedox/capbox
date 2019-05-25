const prompt = require('../utils/prompt')

module.exports = {
  getPlatform: () =>
    new Promise(async (resolve, reject) => {
      try {
        const platform = (
          process.env.CAPBOX_PLATFORM || (await prompt.askForPlatform())
        ).toLowerCase()
        resolve(platform)
      } catch (e) {
        reject(e)
      }
    }),
  getBuildType: () =>
    new Promise(async (resolve, reject) => {
      try {
        const buildType = (
          process.env.CAPBOX_BUILD_TYPE || (await prompt.askForBuildType())
        ).toLowerCase()
        resolve(buildType)
      } catch (e) {
        reject(e)
      }
    })
}
