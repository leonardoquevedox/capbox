"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _paths = _interopRequireDefault(require("../../utils/paths"));

var _log = _interopRequireDefault(require("../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var _default = function _default() {
  return new Promise(function _callee(resolve, reject) {
    var script, rootPath;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            script = _path.default.join(__dirname, 'capacitor');
            rootPath = _paths.default.getRootPath();

            _log.default.header("Got build folder: ".concat(rootPath));

            _log.default.header("Running script ".concat(script));

            _context.next = 7;
            return regeneratorRuntime.awrap(require(script)({
              rootPath: rootPath
            }));

          case 7:
            resolve();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

exports.default = _default;