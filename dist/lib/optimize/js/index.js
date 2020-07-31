#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _brotli = _interopRequireDefault(require("brotli"));

var _klawSync = _interopRequireDefault(require("klaw-sync"));

var _log = _interopRequireDefault(require("../../../utils/log"));

require('colors');

var exec = _shelljs.default.exec;

var getFileName = function getFileName(filePath) {
  return _path.default.basename(filePath);
};

var gzip = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(filePath) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _log.default.info("Gzipping ".concat(getFileName(filePath), " file...").yellow);

            _context.next = 3;
            return exec("npx ngzip ".concat(filePath, " > ").concat(filePath, ".gz"), {
              silent: true
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function gzip(_x) {
    return _ref.apply(this, arguments);
  };
}();

var brotle = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(filePath) {
    var brotled;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _log.default.info("Brotling ".concat(getFileName(filePath), " file...").yellow);

            brotled = _brotli.default.compress(_fsExtra.default.readFileSync(filePath));
            _context2.next = 4;
            return _fsExtra.default.writeFileSync("".concat(filePath, ".br"), brotled, {
              encode: 'UTF-8'
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function brotle(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var optimizeJS = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(filePath) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _log.default.info("Optimizing ".concat(getFileName(filePath), " file...").yellow);

            _context3.next = 3;
            return exec("npm run babel ".concat(filePath, " -- --out-file ").concat(filePath, " --presets=@babel/env --compact=true --quiet"), {
              silent: true
            });

          case 3:
            _log.default.info("Uglyfying ".concat(getFileName(filePath), " file...").yellow);

            _context3.next = 6;
            return exec("npx uglifyjs ".concat(filePath, " -o ").concat(filePath, " --compress --mangle"));

          case 6:
            if (!process.env.CAPBOX_ZIP_ASSETS) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return gzip(filePath);

          case 9:
            _context3.next = 11;
            return brotle(filePath);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function optimizeJS(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var optimizeJSFilesFor = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(buildDir, options) {
    var files;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            files = (0, _klawSync.default)(buildDir).map(function (file) {
              if (file && file.path) return file.path;
            }).filter(function (file) {
              var filename = file || '';
              var nameChunks = filename.split('.');
              var extension = nameChunks[nameChunks.length - 1];
              return extension === 'js' && options.blacklist.indexOf(filename) == -1;
            });
            return _context4.abrupt("return", Promise.all(files.map(function (file) {
              return optimizeJS(file);
            })));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function optimizeJSFilesFor(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = function _default() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref5.rootPath;

  return new Promise( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {
      var capacitorConfig, buildDir, blacklist;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));
              buildDir = _path.default.join(rootPath, capacitorConfig.webDir);
              blacklist = ['polyfills.js', 'sw-toolbox.js'];
              _context5.next = 6;
              return optimizeJSFilesFor(buildDir, {
                blacklist: blacklist
              });

            case 6:
              resolve();
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              reject(_context5.t0);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    return function (_x6, _x7) {
      return _ref6.apply(this, arguments);
    };
  }());
};

exports.default = _default;