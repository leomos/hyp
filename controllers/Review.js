'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.getReview = function getReview (req, res, next) {
  var id = req.swagger.params['id'].value;
  Review.getReview(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
