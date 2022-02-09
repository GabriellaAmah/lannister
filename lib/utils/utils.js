"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _templateObject;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FeeLocale = Object.freeze({
  INTERNATIONAL: "INTL",
  LOCALE: "LOCL"
});
var FeeType = Object.freeze({
  FLAT_PERC: "FLAT_PERC",
  FLAT: "FLAT",
  PERC: "PERC"
});

var calculateFee = function calculateFee(_ref, transactionAmount) {
  var fee_type = _ref.fee_type,
      fee_value = _ref.fee_value;
  var amount;

  switch (fee_type) {
    case FeeType.FLAT:
      amount = 50;
      break;

    case FeeType.PERC:
      amount = +fee_value * +transactionAmount / 100;
      break;

    case FeeType.FLAT_PERC:
      fee_value = fee_value.split(":");
      amount = +fee_value[0] + +fee_value[1] * +transactionAmount / 100;
      break;
  }

  return amount;
};

var extractFeeValue = function extractFeeValue(str) {
  var feeArray = str.split(" ");
  return {
    fee_type: feeArray[feeArray.length - 2],
    fee_value: feeArray[feeArray.length - 1],
    fee_id: feeArray[0]
  };
};

var searchSpecificity = function searchSpecificity(_ref2, data) {
  var type = _ref2.type,
      locale = _ref2.locale,
      specificity = _ref2.specificity;
  var possibleCombination;

  if (specificity) {
    possibleCombination = ["".concat(locale, " ").concat(type, "(").concat(specificity, ")"), "".concat(locale, " *(").concat(specificity, ")"), "* ".concat(type, "(").concat(specificity, ")")(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["* *(", ")"])), specificity), "* *(*)"];
  }

  if (!specificity && type) {
    possibleCombination = ["".concat(locale, " ").concat(type, "(*)"), "* ".concat(type, "(*)"), "* *(*)"];
  }

  if (!specificity && !type && locale) {
    possibleCombination = ["".concat(locale, " *(*)"), "* *(*)"];
  }

  var finalPossibility = possibleCombination || "* *(*)";
  console.log(finalPossibility);
  var computation;

  var _iterator = _createForOfIteratorHelper(data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var str = _step.value;

      var _iterator2 = _createForOfIteratorHelper(finalPossibility),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var phrase = _step2.value;
          if (str.includes(phrase)) computation = str;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return computation;
};

var getComputationData = function getComputationData(_ref3, data) {
  var Country = _ref3.Country,
      Type = _ref3.Type,
      Issuer = _ref3.Issuer,
      Number = _ref3.Number,
      Brand = _ref3.Brand;
  console.log(data);
  var feeLocale = Country === "NG" ? FeeLocale.LOCALE : FeeLocale.INTERNATIONAL;
  var NumberExist = data.every(function (fcs) {
    return !fcs.includes("".concat(Number));
  });
  if (!NumberExist) return searchSpecificity({
    type: Type,
    locale: feeLocale,
    specificity: Number
  }, data);
  var IssuerExist = data.every(function (fcs) {
    return !fcs.includes("".concat(Issuer));
  });
  if (!IssuerExist) return searchSpecificity({
    type: Type,
    locale: feeLocale,
    specificity: Issuer
  }, data);
  var BrandExist = data.every(function (fcs) {
    return !fcs.includes("".concat(Brand));
  });
  if (!BrandExist) return searchSpecificity({
    type: Type,
    locale: feeLocale,
    specificity: Brand
  }, data);
  var typeExist = data.every(function (fcs) {
    return !fcs.includes(" ".concat(Type, "(*)"));
  });
  if (!typeExist) return searchSpecificity({
    type: Type,
    locale: feeLocale
  }, data);
  return searchSpecificity({
    locale: feeLocale
  }, data);
};

module.exports = {
  calculateFee: calculateFee,
  extractFeeValue: extractFeeValue,
  getComputationData: getComputationData
};