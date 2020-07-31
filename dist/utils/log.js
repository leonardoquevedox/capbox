"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require('colors');

var _console = console,
    log = _console.log;
var _default = {
  info: function info(str) {
    log(str);
  },
  success: function success(str) {
    log("\u2713 ".concat(str).green);
  },
  error: function error(str) {
    log("\xD7 ".concat(str).red);
  },
  header: function header(str) {
    log('');
    log(str.yellow);
  }
};
exports.default = _default;