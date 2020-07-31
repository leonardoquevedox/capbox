"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _path = _interopRequireDefault(require("path"));

var _log = _interopRequireDefault(require("../../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var exec = _shelljs.default.exec;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise(function _callee(resolve, reject) {
    var iosPath, capacitorConfig, appName, appId;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            iosPath = _path.default.join(rootPath, 'ios');
            /* eslint-disable-next-line */

            capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));
            appName = capacitorConfig.appName, appId = capacitorConfig.appId;

            _log.default.header('Generating iOS build...'.yellow);

            _context.next = 7;
            return regeneratorRuntime.awrap(exec("xcodebuild -project ".concat(appName, ".xcodeproj -scheme ").concat(appName, " -sdk iphonesimulator10.3 clean analyze"), {
              cwd: iosPath
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(exec("xcrun xcodebuild -arch i386     -scheme ".concat(appName, "     -workspace ").concat(appName, ".xcworkspace     -configuration Debug  \n    -derivedDataPath build"), {
              cwd: iosPath
            }));

          case 9:
            // await exec(`xcrun simctl install booted ${appId}`, { cwd: iosPath })
            // await exec(`xcrun simctl launch booted ${appId}`, { cwd: iosPath })
            _log.default.success('iOS built successfully!'.green.bold);

            resolve();
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
};

exports.default = _default;