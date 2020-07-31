"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getRootPath: function getRootPath() {
    var developmentRoot = _path.default.resolve(__dirname, '../../test');

    var productionRoot = _path.default.resolve(__dirname, '../../../../');

    return process.env.CAPBOX_STAGE === 'development' ? developmentRoot : productionRoot;
  }
};
exports.default = _default;