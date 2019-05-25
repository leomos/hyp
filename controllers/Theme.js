'use strict';

var utils = require('../utils/writer.js');
var Theme = require('../service/ThemeService');

module.exports.getAllThemes = function getAllThemes (req, res, next) {
  Theme.getAllThemes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTheme = function getTheme (req, res, next) {
  var id = req.swagger.params['id'].value;
  Theme.getTheme(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
