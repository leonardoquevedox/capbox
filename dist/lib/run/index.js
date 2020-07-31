"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _shelljs = require("shelljs");

var _config = _interopRequireDefault(require("../../config"));

var _paths = _interopRequireDefault(require("../../utils/paths"));

var _log = _interopRequireDefault(require("../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var _default = function _default() {
  return new Promise(function _callee(resolve, reject) {
    var platform, script, rootPath;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_config.default.getPlatform());

          case 3:
            platform = _context.sent;
            script = _path.default.join(__dirname, platform);
            rootPath = _paths.default.getRootPath();

            _log.default.header("Preparing ".concat(platform, " build...").yellow);

            _log.default.header("Got build folder: ".concat(rootPath));

            _log.default.header("Running script ".concat(script));

            _context.next = 11;
            return regeneratorRuntime.awrap(require(script)({
              rootPath: rootPath
            }));

          case 11:
            resolve();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  });
};

exports.default = _default;