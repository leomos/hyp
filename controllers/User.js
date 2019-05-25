'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.addUser = function addUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.addUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLoggedUserDetails = function getLoggedUserDetails (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    utils.writeJson(res, req.session.user);
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(102, 'User is not logged in')));
  }
};

module.exports.login = function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.login(body)
    .then(function (response) {
      req.session.user = JSON.parse(response);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logout = function logout (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy(function(err) {
      if(err) {
        utils.writeJson(res, utils.respondWithCode(500, {}));
      } else {
        utils.writeJson(res, utils.respondWithCode(204, {}));
      }
    });
  } else {
    utils.writeJson(res, utils.respondWithCode(403, models.Error(104, 'User is not logged in')));
  }
};
