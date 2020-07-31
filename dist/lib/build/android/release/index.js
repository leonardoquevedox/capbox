"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _path = _interopRequireDefault(require("path"));

var _log = _interopRequireDefault(require("../../../../utils/log"));

require('colors');

var exec = _shelljs.default.exec;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var androidPath, isWin;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              androidPath = _path.default.join(rootPath, 'android');
              isWin = process.platform === "win32";

              _log.default.header("Generating android build...".yellow);

              console.log("Using root path ".concat(rootPath));
              console.log("Using android path ".concat(androidPath));

              if (!isWin) {
                _context.next = 11;
                break;
              }

              _context.next = 9;
              return exec('gradlew assembleRelease', {
                cwd: androidPath
              });

            case 9:
              _context.next = 13;
              break;

            case 11:
              _context.next = 13;
              return exec('./gradlew assembleRelease', {
                cwd: androidPath
              });

            case 13:
              _log.default.success("Android built successfully!".green.bold);

              resolve();
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.default = _default;