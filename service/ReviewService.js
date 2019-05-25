'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Returns the details of a specific review.
 *
 * id Integer The review ID
 * returns Review
 **/
exports.getReview = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Review.findByPk(id)
        .then(review => {
          if(review) {
            resolve(review);
          } else {
            reject(utils.respondWithCode(404, models.Error(801, 'Review not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(802, 'Id is not a valid number')));
    }
  });
}

