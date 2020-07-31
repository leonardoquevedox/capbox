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

var _log = _interopRequireDefault(require("../../../utils/log"));

require('colors');

var exec = _shelljs.default.exec;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var iosPath, capacitorConfig, appName, appId;
      return _regenerator.default.wrap(function _callee$(_context) {
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
              return exec("xcodebuild -project ".concat(appName, ".xcodeproj -scheme ").concat(appName, " -sdk iphonesimulator10.3 clean analyze"), {
                cwd: iosPath
              });

            case 7:
              _context.next = 9;
              return exec("xcrun xcodebuild -arch i386     -scheme ".concat(appName, "     -workspace ").concat(appName, ".xcworkspace     -configuration Debug  \n    -derivedDataPath build"), {
                cwd: iosPath
              });

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
      }, _callee, null, [[0, 13]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.default = _default;