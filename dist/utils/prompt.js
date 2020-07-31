"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _platforms = _interopRequireDefault(require("../config/platforms"));

var _buildTypes = _interopRequireDefault(require("../config/buildTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  askForPlatform: function askForPlatform() {
    return new Promise(function (resolve, reject) {
      _inquirer.default.prompt([{
        type: 'list',
        name: 'platform',
        message: 'On which platform would you like to run the app?',
        choices: [{
          value: _platforms.default.ANDROID,
          name: 'Android'
        }, {
          value: _platforms.default.IOS,
          name: 'iOS'
        }, {
          value: _platforms.default.PWA,
          name: 'PWA'
        }],
        default: _platforms.default.ANDROID
      }]).then(function (value) {
        resolve(value.platform ? value.platform : _platforms.default.ANDROID);
      }).catch(function (e) {
        reject(e);
      });
    });
  },
  askForBuildType: function askForBuildType() {
    return new Promise(function (resolve, reject) {
      _inquirer.default.prompt([{
        type: 'list',
        name: 'buildType',
        message: 'Is this a release build?',
        choices: [{
          value: _buildTypes.default.DEBUG,
          name: 'Debug'
        }, {
          value: _buildTypes.default.RELEASE,
          name: 'Release'
        }],
        default: _buildTypes.default.DEBUG
      }]).then(function (value) {
        resolve(value.buildType ? value.buildType : _buildTypes.default.DEBUG);
      }).catch(function (e) {
        reject(e);
      });
    });
  },
  askForDistributionStage: function askForDistributionStage(platform, capacitorConfig) {
    return new Promise(function (resolve, reject) {
      _inquirer.default.prompt([{
        type: 'list',
        name: 'buildType',
        message: "For which stage of ".concat(capacitorConfig.appName, " would you like to distribute?"),
        choices: Object.keys(capacitorConfig.distribute.appcenter[platform]),
        default: _buildTypes.default.DEBUG
      }]).then(function (value) {
        resolve(value.buildType ? value.buildType : _buildTypes.default.DEBUG);
      }).catch(function (e) {
        reject(e);
      });
    });
  }
};
exports.default = _default;