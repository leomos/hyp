'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Returns an array with all the authors. 
 *
 * returns List
 **/
exports.getAllAuthors = function() {
  return new Promise(async function(resolve, reject) {
    await models.Author.findAll({
      include: models.Book,
    })
      .then(authors => {
        resolve(authors.map(author => author.withAssociationsIds(['Books'])));
      })
      .catch(err => {
        reject(utils.respondWithCode(500));
      })
  });
}


/**
 * Returns the details of a specific author
 *
 * id Integer The author ID
 * returns Author
 **/
exports.getAuthor = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Author.findByPk(id, {
        include: models.Book,
      })
        .then(author => {
          if(author) {
            resolve(author.withAssociationsIds(['Books']));
          } else {
            reject(utils.respondWithCode(404, models.Error(201, 'Author not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(202, 'Id is not a valid number')));
    }
  });
}

