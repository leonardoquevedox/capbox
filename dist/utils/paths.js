"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _default = {
  getRootPath: function getRootPath() {
    var developmentRoot = _path.default.resolve(__dirname, '../../test');

    var productionRoot = _path.default.resolve(__dirname, '../../../../');

    return process.env.CAPBOX_STAGE === 'development' ? developmentRoot : productionRoot;
  }
};
exports.default = _default;