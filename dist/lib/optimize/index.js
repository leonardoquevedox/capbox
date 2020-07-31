"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _shelljs = require("shelljs");

var _paths = _interopRequireDefault(require("../../utils/paths"));

var _log = _interopRequireDefault(require("../../utils/log"));

require('colors');

var _default = function _default() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var optimizeJS, optimizeCSS, rootPath;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              optimizeJS = _path.default.join(__dirname, 'js');
              optimizeCSS = _path.default.join(__dirname, 'css');
              rootPath = _paths.default.getRootPath();

              _log.default.header("Optimizing application static files...".yellow);

              _context.next = 7;
              return require(optimizeJS)({
                rootPath: rootPath
              });

            case 7:
              _context.next = 9;
              return require(optimizeCSS)({
                rootPath: rootPath
              });

            case 9:
              resolve();
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
      }, _callee, null, [[0, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = _default;