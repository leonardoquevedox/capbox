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

var _path = _interopRequireDefault(require("path"));

var _klawSync = _interopRequireDefault(require("klaw-sync"));

var _log = _interopRequireDefault(require("../../../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');

var exec = _shelljs.default.exec;

var getFileName = function getFileName(filePath) {
  return _path.default.basename(filePath);
};

var optimizeCSS = function optimizeCSS(filePath) {
  return regeneratorRuntime.async(function optimizeCSS$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _log.default.info("Optimizing CSS on ".concat(getFileName(filePath), " file...").yellow);

          _context.next = 3;
          return regeneratorRuntime.awrap(exec("npx cleancss ".concat(filePath, " -o ").concat(filePath, " -02"), {
            silent: true
          }));

        case 3:
          if (!process.env.CAPBOX_ZIP_ASSETS) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(gzip(filePath));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(brotle(filePath));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var optimizeCSSFor = function optimizeCSSFor(buildDir) {
  var files;
  return regeneratorRuntime.async(function optimizeCSSFor$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          files = (0, _klawSync.default)(buildDir).map(function (file) {
            if (file && file.path) return file.path;
          }).filter(function (file) {
            var filename = file || '';
            var nameChunks = filename.split('.');
            var extension = nameChunks[nameChunks.length - 1];
            return extension === 'css' && options.blacklist.indexOf(filename) == -1;
          });
          return _context2.abrupt("return", Promise.all(files.map(function (file) {
            return optimizeCSS(file);
          })));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise(function _callee(resolve, reject) {
    var capacitorConfig, buildDir;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));
            buildDir = _path.default.join(rootPath, capacitorConfig.webDir);
            _context3.next = 5;
            return regeneratorRuntime.awrap(optimizeCSSFor(buildDir));

          case 5:
            resolve();
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.default = _default;