#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _brotli = _interopRequireDefault(require("brotli"));

var _klawSync = _interopRequireDefault(require("klaw-sync"));

var _log = _interopRequireDefault(require("../../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var exec = _shelljs.default.exec;

var getFileName = function getFileName(filePath) {
  return _path.default.basename(filePath);
};

var gzip = function gzip(filePath) {
  return regeneratorRuntime.async(function gzip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _log.default.info("Gzipping ".concat(getFileName(filePath), " file...").yellow);

          _context.next = 3;
          return regeneratorRuntime.awrap(exec("npx ngzip ".concat(filePath, " > ").concat(filePath, ".gz"), {
            silent: true
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var brotle = function brotle(filePath) {
  var brotled;
  return regeneratorRuntime.async(function brotle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _log.default.info("Brotling ".concat(getFileName(filePath), " file...").yellow);

          brotled = _brotli.default.compress(_fsExtra.default.readFileSync(filePath));
          _context2.next = 4;
          return regeneratorRuntime.awrap(_fsExtra.default.writeFileSync("".concat(filePath, ".br"), brotled, {
            encode: 'UTF-8'
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var optimizeJS = function optimizeJS(filePath) {
  return regeneratorRuntime.async(function optimizeJS$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _log.default.info("Optimizing ".concat(getFileName(filePath), " file...").yellow);

          _context3.next = 3;
          return regeneratorRuntime.awrap(exec("npm run babel ".concat(filePath, " -- --out-file ").concat(filePath, " --presets=@babel/env --compact=true --quiet"), {
            silent: true
          }));

        case 3:
          _log.default.info("Uglyfying ".concat(getFileName(filePath), " file...").yellow);

          _context3.next = 6;
          return regeneratorRuntime.awrap(exec("npx uglifyjs ".concat(filePath, " -o ").concat(filePath, " --compress --mangle")));

        case 6:
          if (!process.env.CAPBOX_ZIP_ASSETS) {
            _context3.next = 11;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(gzip(filePath));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(brotle(filePath));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var optimizeJSFilesFor = function optimizeJSFilesFor(buildDir, options) {
  var files;
  return regeneratorRuntime.async(function optimizeJSFilesFor$(_context4) {
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
  });
};

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise(function _callee(resolve, reject) {
    var capacitorConfig, buildDir, blacklist;
    return regeneratorRuntime.async(function _callee$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));
            buildDir = _path.default.join(rootPath, capacitorConfig.webDir);
            blacklist = ['polyfills.js', 'sw-toolbox.js'];
            _context5.next = 6;
            return regeneratorRuntime.awrap(optimizeJSFilesFor(buildDir, {
              blacklist: blacklist
            }));

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
    }, null, null, [[0, 9]]);
  });
};

exports.default = _default;