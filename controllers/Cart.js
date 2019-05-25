'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.addBookToCart = function addBookToCart (req, res, next) {
  var body = req.swagger.params['body'].value;
  if (req.session.user && req.cookies.user_sid) {
    Cart.addBookToCart(body, req.session.user.id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(602, 'User is not logged in')));
  }
};

module.exports.deleteAllBooks = function deleteAllBooks (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    Cart.deleteAllBooks(req.session.user.id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(602, 'User is not logged in')));
  }
};

module.exports.getCart = function getCart (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    Cart.getCart(req.session.user.id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(602, 'User is not logged in')));
  }
};

module.exports.modifyBookQuantity = function modifyBookQuantity (req, res, next) {
  var body = req.swagger.params['body'].value;
  if (req.session.user && req.cookies.user_sid) {
    Cart.modifyBookQuantity(body, req.session.user.id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(602, 'User is not logged in')));
  }
};
