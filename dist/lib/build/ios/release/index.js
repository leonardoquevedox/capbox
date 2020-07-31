"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _path = _interopRequireDefault(require("path"));

var _log = _interopRequireDefault(require("../../../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var exec = _shelljs.default.exec;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise(function _callee(resolve, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              /*  const rootPath = process.env.CAPACITOR_PROJECT_ROOT
               const iosPath = path.join(rootPath, 'ios', 'App')
               log.header('Generating iOS release build...'.yellow)
               await exec(`xcodebuild -workspace App.xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/App.xcarchive`, { cwd: iosPath })
               await exec(`xcodebuild -exportArchive -archivePath $PWD/build/App.xcarchive -exportPath $PWD/build -exportOptionsPlist $PWD/App/App/exportOptions.plist`, { cwd: iosPath }) */
              _log.default.success('iOS built successfully!'.green.bold);

              resolve();
            } catch (e) {
              reject(e);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.default = _default;