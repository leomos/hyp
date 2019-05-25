'use strict';

var utils = require('../utils/writer.js');
var Genre = require('../service/GenreService');

module.exports.getAllGenres = function getAllGenres (req, res, next) {
  Genre.getAllGenres()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGenre = function getGenre (req, res, next) {
  var id = req.swagger.params['id'].value;
  Genre.getGenre(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
