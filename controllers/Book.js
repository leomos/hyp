'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.getAllBooks = function getAllBooks (req, res, next) {
  Book.getAllBooks()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBook = function getBook (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.getBook(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
