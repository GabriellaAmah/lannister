"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

var readFileData = function readFileData() {
  var stringifiedData = _fs["default"].readFileSync(_path["default"].join(process.cwd(), 'data', 'data.json'));

  var rawData = JSON.parse(stringifiedData);
  return rawData;
};

var feeComputation = (0, _utils.wrapAsync)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, PaymentEntity, Amount, Currency, BearsFee, data, computation, feeObject, transactionFee, appliedFee, merchantFee;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, PaymentEntity = _req$body.PaymentEntity, Amount = _req$body.Amount, Currency = _req$body.Currency, BearsFee = _req$body.Customer.BearsFee;

            if (!(Currency !== "NGN")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next(new _utils.ErrorResponse("No fee configuration for USD transactions.", 422)));

          case 3:
            data = readFileData();
            computation = (0, _utils.getComputationData)(PaymentEntity, data);

            if (computation) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next((0, _utils.ErrorResponse)("We don not have a valid transaction for this payment details", 404)));

          case 7:
            feeObject = (0, _utils.extractFeeValue)(computation);
            transactionFee = (0, _utils.calculateFee)(feeObject, Amount);
            appliedFee = Number(Amount) + Number(transactionFee);
            merchantFee = Number(Amount) - Number(transactionFee);
            return _context.abrupt("return", res.status(200).json({
              AppliedFeeID: feeObject.fee_id,
              AppliedFeeValue: transactionFee,
              ChargeAmount: BearsFee ? appliedFee : Amount,
              SettlementAmount: BearsFee ? Amount : merchantFee
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = feeComputation;
exports["default"] = _default;