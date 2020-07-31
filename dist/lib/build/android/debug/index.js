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
    var androidPath, isWin;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            androidPath = _path.default.join(rootPath, 'android');
            isWin = process.platform === "win32";

            _log.default.header("Generating android build...".yellow);

            if (!isWin) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(exec('gradlew assembleDebug', {
              cwd: androidPath
            }));

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(exec('./gradlew assembleDebug', {
              cwd: androidPath
            }));

          case 11:
            _log.default.success("Android built successfully!".green.bold);

            resolve();
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 15]]);
  });
};

exports.default = _default;