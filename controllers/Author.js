'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.getAllAuthors = function getAllAuthors (req, res, next) {
  Author.getAllAuthors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthor = function getAuthor (req, res, next) {
  var id = req.swagger.params['id'].value;
  Author.getAuthor(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
