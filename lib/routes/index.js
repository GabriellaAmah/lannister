"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _computation = _interopRequireDefault(require("../controllers/computation"));

var _post = _interopRequireDefault(require("../controllers/post.fees"));

var router = (0, _express.Router)();
router.route("/fees").post(_post["default"]);
router.route("/compute-transaction-fee").post(_computation["default"]);
var _default = router;
exports["default"] = _default;