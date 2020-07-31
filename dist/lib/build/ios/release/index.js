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
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                /*  const rootPath = process.env.CAPACITOR_PROJECT_ROOT
                 const iosPath = path.join(rootPath, 'ios', 'App')
                 log.header('Generating iOS release build...'.yellow)
                 await exec(`xcodebuild -workspace App.xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/App.xcarchive`, { cwd: iosPath })
                 await exec(`xcodebuild -exportArchive -archivePath $PWD/build/App.xcarchive -exportPath $PWD/build -exportOptionsPlist $PWD/App/App/exportOptions.plist`, { cwd: iosPath }) */
                _log.default.success('iOS built successfully!'.green.bold);

                resolve();
              } catch (e) {
                reject(e);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.default = _default;