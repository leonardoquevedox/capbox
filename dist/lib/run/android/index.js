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
    var androidPath, apkPath, capacitorConfig;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            androidPath = _path.default.join(rootPath, 'android');
            apkPath = _path.default.join(androidPath, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
            /* eslint-disable-next-line */

            capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));

            _log.default.info("Transfering application on device...".yellow);

            _context.next = 7;
            return regeneratorRuntime.awrap(exec("adb install -r ".concat(apkPath), {
              cwd: androidPath
            }));

          case 7:
            _log.default.info("Launching application on device...".yellow);

            _context.next = 10;
            return regeneratorRuntime.awrap(exec("adb shell monkey -p ".concat(capacitorConfig.appId, " -c android.intent.category.LAUNCHER 1")));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });
};

exports.default = _default;