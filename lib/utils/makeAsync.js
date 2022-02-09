"use strict";

var wrapAsync = function wrapAsync(execution) {
  return function (req, res, next) {
    Promise.resolve(execution(req, res, next))["catch"](next);
  };
};

module.exports = {
  wrapAsync: wrapAsync
};