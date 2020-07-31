"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _paths = _interopRequireDefault(require("../../utils/paths"));

var _log = _interopRequireDefault(require("../../utils/log"));

require('colors');

var _default = function _default() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var script, rootPath, runScript;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              script = _path.default.join(__dirname, 'capacitor', 'index.js');
              rootPath = _paths.default.getRootPath();

              _log.default.header("Got build folder: ".concat(rootPath));

              _log.default.header("Running script ".concat(script));

              runScript = require(script).default;
              _context.next = 8;
              return runScript({
                rootPath: rootPath
              });

            case 8:
              resolve();
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = _default;