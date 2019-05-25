'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Returns an array with all the genres.
 *
 * returns List
 **/
exports.getAllGenres = function() {
  return new Promise(async function(resolve, reject) {
    await models.Genre.findAll({
      include: models.Book,
    })
      .then(genres => {
        resolve(genres.map(genre => genre.withAssociationsIds(['Books'])));
      })
      .catch(err => {
        console.log(err);
        reject(utils.respondWithCode(500));
      })
  });
}


/**
 * Returns the details of a specific genre and books with that genre
 *
 * id Integer The genre ID
 * returns Genre
 **/
exports.getGenre = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Genre.findByPk(id, {
        include: models.Book,
      })
        .then(genre => {
          if(genre) {
            resolve(genre.withAssociationsIds(['Books']));
          } else {
            reject(utils.respondWithCode(404, models.Error(401, 'Genre not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(402, 'Id is not a valid number')));
    }
  });
}

