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

var _config = _interopRequireDefault(require("../../config"));

var _paths = _interopRequireDefault(require("../../utils/paths"));

var _log = _interopRequireDefault(require("../../utils/log"));

require('colors');

var _default = function _default() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var platform, buildType, script, rootPath, runScript;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _config.default.getPlatform();

            case 3:
              platform = _context.sent;
              _context.next = 6;
              return _config.default.getBuildType();

            case 6:
              buildType = _context.sent;
              script = _path.default.join(__dirname, platform, buildType);
              rootPath = _paths.default.getRootPath();

              _log.default.header("Preparing ".concat(platform, " build...").yellow);

              _log.default.header("Got build folder: ".concat(rootPath));

              _log.default.header("Running script ".concat(script));

              runScript = require(script).default;
              _context.next = 15;
              return runScript({
                rootPath: rootPath
              });

            case 15:
              resolve();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = _default;