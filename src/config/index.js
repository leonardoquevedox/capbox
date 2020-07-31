import prompt from '../utils/prompt';

export default {
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
    }),
  getDistributionStage: (platform, capacitorConfig) =>
    new Promise(async (resolve, reject) => {
      try {
        const stage = (typeof process.env.CAPBOX_DISTRIBUTION_STAGE === 'string' &&
        process.env.CAPBOX_DISTRIBUTION_STAGE !== 'undefined'
          ? process.env.CAPBOX_DISTRIBUTION_STAGE
          : await prompt.askForDistributionStage(platform, capacitorConfig)
        ).toLowerCase()
        resolve(stage)
      } catch (e) {
        reject(e)
      }
    })
};
