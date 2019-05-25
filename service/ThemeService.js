'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Returns an array with all the themes.
 *
 * returns List
 **/
exports.getAllThemes = function() {
  return new Promise(async function(resolve, reject) {
    await models.Theme.findAll({
      include: models.Book,
    })
      .then(themes => {
        resolve(themes.map(theme => theme.withAssociationsIds(['Books'])));
      })
      .catch(err => {
        console.log(err);
        reject(utils.respondWithCode(500));
      })
  });
}


/**
 * Returns the details of a specific theme.
 *
 * id Integer The theme ID
 * returns Theme
 **/
exports.getTheme = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Theme.findByPk(id, {
        include: models.Book,
      })
        .then(theme => {
          if(theme) {
            resolve(theme.withAssociationsIds(['Books']));
          } else {
            reject(utils.respondWithCode(404, models.Error(301, 'Theme not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(302, 'Id is not a valid number')));
    }
  });
}

