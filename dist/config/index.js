"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prompt = _interopRequireDefault(require("../utils/prompt"));

var _default = {
  getPlatform: function getPlatform() {
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
        var platform;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = process.env.CAPBOX_PLATFORM;

                if (_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return _prompt.default.askForPlatform();

              case 5:
                _context.t0 = _context.sent;

              case 6:
                platform = _context.t0.toLowerCase();
                resolve(platform);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t1 = _context["catch"](0);
                reject(_context.t1);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  getBuildType: function getBuildType() {
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {
        var buildType;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.t0 = process.env.CAPBOX_BUILD_TYPE;

                if (_context2.t0) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return _prompt.default.askForBuildType();

              case 5:
                _context2.t0 = _context2.sent;

              case 6:
                buildType = _context2.t0.toLowerCase();
                resolve(buildType);
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t1 = _context2["catch"](0);
                reject(_context2.t1);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  },
  getDistributionStage: function getDistributionStage(platform, capacitorConfig) {
    return new Promise( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, reject) {
        var stage;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!(typeof process.env.CAPBOX_DISTRIBUTION_STAGE === 'string' && process.env.CAPBOX_DISTRIBUTION_STAGE !== 'undefined')) {
                  _context3.next = 5;
                  break;
                }

                _context3.t0 = process.env.CAPBOX_DISTRIBUTION_STAGE;
                _context3.next = 8;
                break;

              case 5:
                _context3.next = 7;
                return _prompt.default.askForDistributionStage(platform, capacitorConfig);

              case 7:
                _context3.t0 = _context3.sent;

              case 8:
                stage = _context3.t0.toLowerCase();
                resolve(stage);
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t1 = _context3["catch"](0);
                reject(_context3.t1);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
  }
};
exports.default = _default;