const inquirer = require('inquirer')
const platforms = require('../config/platforms')
const buildTypes = require('../config/buildTypes')

module.exports = {
  askForPlatform: () =>
    new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'platform',
            message: 'On which platform would you like to run the app?',
            choices: [
              { value: platforms.ANDROID, name: 'Android' },
              { value: platforms.IOS, name: 'iOS' },
              { value: platforms.PWA, name: 'PWA' }
            ],
            default: platforms.ANDROID
          }
        ])
        .then(value => {
          resolve(value.platform ? value.platform : platforms.ANDROID)
        })
        .catch(e => {
          reject(e)
        })
    }),
  askForBuildType: () =>
    new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'buildType',
            message: 'Is this a release build?',
            choices: [
              { value: buildTypes.DEBUG, name: 'Debug' },
              { value: buildTypes.RELEASE, name: 'Release' }
            ],
            default: buildTypes.DEBUG
          }
        ])
        .then(value => {
          resolve(value.buildType ? value.buildType : buildTypes.DEBUG)
        })
        .catch(e => {
          reject(e)
        })
    }),
  askForDistributionStage: (platform, capacitorConfig) =>
    new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'buildType',
            message: `For which stage of ${capacitorConfig.appName} would you like to distribute?`,
            choices: Object.keys(capacitorConfig.distribute.appcenter[platform]),
            default: buildTypes.DEBUG
          }
        ])
        .then(value => {
          resolve(value.buildType ? value.buildType : buildTypes.DEBUG)
        })
        .catch(e => {
          reject(e)
        })
    })
}
