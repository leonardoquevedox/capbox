#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

var _build = _interopRequireDefault(require("./lib/build"));

var _resources = _interopRequireDefault(require("./lib/resources"));

var _run = _interopRequireDefault(require("./lib/run"));

var _optimize = _interopRequireDefault(require("./lib/optimize"));

var _sync = _interopRequireDefault(require("./lib/sync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Scripts */

/* CLI startup */
process.env.CAPBOX_STAGE = process.env.CAPBOX_STAGE || 'production';

_commander.default.version(_package.default.version).option('-h, --help', 'Shows this help description.', function () {
  _commander.default.help();
});
/* ----- Run ------ */


_commander.default.command('run <platform>').option('--release', 'Performs an optimized and signed release build.').description('Build application for specified platform: "android", "ios" or "pwa".').action(function (platform, options) {
  process.env.CAPBOX_PLATFORM = platform;
  process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug';
  (0, _sync.default)().then(function () {
    (0, _build.default)().then(function () {
      (0, _run.default)();
    });
  });
});
/* ----- Build ------ */


_commander.default.command('build <platform>').description('Run application on specified platform: "android", "ios" or "pwa".').option('--release', 'Performs an optimized and signed release build.').action(function (platform, options) {
  process.env.CAPBOX_PLATFORM = platform;
  process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug';
  (0, _sync.default)().then(function () {
    (0, _build.default)();
  });
});
/* ----- Optimize ------ */


_commander.default.command('optimize').option('--zip', 'Gzips and brotlis static files.').description('Optimizes application statics for specified platform: "android", "ios" or "pwa".').action(function (platform, options) {
  process.env.CAPBOX_ZIP_ASSETS = true;
  process.env.CAPBOX_PLATFORM = platform;
  (0, _optimize.default)();
});
/* ----- Resources ------ */


_commander.default.command('resources').description('Generates icons & splashscreens for the configured platforms.').action(function () {
  (0, _resources.default)();
});

_commander.default.parse(process.argv);