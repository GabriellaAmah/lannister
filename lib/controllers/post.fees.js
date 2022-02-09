"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

var writeToFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var _rawData;

    var rawData, stringifiedData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stringifiedData = _fs["default"].readFileSync(_path["default"].join(process.cwd(), 'data', 'data.json'));
            rawData = JSON.parse(stringifiedData);

            (_rawData = rawData).push.apply(_rawData, (0, _toConsumableArray2["default"])(data));

            _fs["default"].writeFile(_path["default"].join(process.cwd(), 'data', 'data.json'), JSON.stringify(rawData), function (err) {
              if (err) throw err;
              console.log("fee configuration spec successfully added");
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function writeToFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var postFees = (0, _utils.wrapAsync)( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var configSpecArray;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            configSpecArray = req.body.FeeConfigurationSpec.split("\n");
            _context2.next = 3;
            return writeToFile(configSpecArray);

          case 3:
            return _context2.abrupt("return", res.status(201).json({
              status: "ok"
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = postFees;
exports["default"] = _default;