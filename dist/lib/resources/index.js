"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shelljs = require("shelljs");

var _paths = _interopRequireDefault(require("../../utils/paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var _default = function _default() {
  return new Promise(function _callee(resolve, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _shelljs.exec)('npx capacitor-resources', {
              cwd: _paths.default.getRootPath()
            }));

          case 3:
            resolve();
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  });
};

exports.default = _default;