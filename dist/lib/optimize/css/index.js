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

var _path = _interopRequireDefault(require("path"));

var _klawSync = _interopRequireDefault(require("klaw-sync"));

var _log = _interopRequireDefault(require("../../../utils/log"));

require('colors');

var exec = _shelljs.default.exec;

var getFileName = function getFileName(filePath) {
  return _path.default.basename(filePath);
};

var optimizeCSS = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(filePath) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _log.default.info("Optimizing CSS on ".concat(getFileName(filePath), " file...").yellow);

            _context.next = 3;
            return exec("npx cleancss ".concat(filePath, " -o ").concat(filePath, " -02"), {
              silent: true
            });

          case 3:
            if (!process.env.CAPBOX_ZIP_ASSETS) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return gzip(filePath);

          case 6:
            _context.next = 8;
            return brotle(filePath);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function optimizeCSS(_x) {
    return _ref.apply(this, arguments);
  };
}();

var optimizeCSSFor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(buildDir) {
    var files;
    return _regenerator.default.wrap(function _callee2$(_context2) {
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
    }, _callee2);
  }));

  return function optimizeCSSFor(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = function _default() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref3.rootPath;

  return new Promise( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, reject) {
      var capacitorConfig, buildDir;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              capacitorConfig = require(_path.default.join(rootPath, 'capacitor.config.json'));
              buildDir = _path.default.join(rootPath, capacitorConfig.webDir);
              _context3.next = 5;
              return optimizeCSSFor(buildDir);

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
      }, _callee3, null, [[0, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }());
};

exports.default = _default;