'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Register a new user
 *
 * body UserRegistration 
 * returns User
 **/
exports.addUser = function(body) {
  return new Promise(async function(resolve, reject) {
    await models.User.create(body)
      .then(newUser => {
        // ugly hack to remove password field
        var userSafe = JSON.parse(JSON.stringify(newUser));
        delete userSafe.password;

        resolve(JSON.stringify(userSafe));
      })
      .catch(err => {
        const invalidFields = err.errors.map(error => {return error.path});
        console.log(err);
        reject(utils.respondWithCode(400, models.Error(101, 'One or more fields are invalid', {invalidFields})));
      });
  });
}


/**
 * Returns logged in user details
 *
 * user_sid String  (optional)
 * returns User
 **/
exports.getLoggedUserDetails = function(user_sid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve(utils.respondWithCode(403, {"details": 'user not found'}));
    }
  });
}


/**
 * Logs a user in, using cookies authentication method
 *
 * body UserLogin 
 * returns User
 **/
exports.login = function(body) {
  return new Promise(async function(resolve, reject) {
    if(body && body.email && body.password) {
      await models.User.findAll({
        where: {
          email: body.email,
        }
      })
        .then(users => {
          if(users.length > 1) {
            reject(utils.respondWithCode(500, {}));
          } else if(users.length < 1) {
            reject(utils.respondWithCode(400, models.Error(103, 'Credentials are not valid')));
          } else if(users.length === 1) {
            let user = users[0];
            if(models.User.validPassword(body.password, user.password)) {
              // ugly hack to remove password field
              var userSafe = JSON.parse(JSON.stringify(user));
              delete userSafe.password;

              resolve(JSON.stringify(userSafe));
            } else {
              reject(utils.respondWithCode(400, models.Error(103, 'Credentials are not valid')));
            }
          }
        })
        .catch(() => {
          reject(utils.respondWithCode(500, {}));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(103, 'Credentials are not valid')));
    }
  });
}


/**
 * Logs a user out, destroying the session previously created
 *
 * no response value expected for this operation
 **/
exports.logout = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

