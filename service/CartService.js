'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

/**
 * Adds a book to the logged user's cart with the given quantity.  If the book is already in the cart an error is returned.
 *
 * body BookQuantity
 * no response value expected for this operation
 **/
exports.addBookToCart = function(body, user_id) {
  return new Promise(async function(resolve, reject) {
    await models.Cart.create({
      user_id: user_id,
      quantity: body.quantity,
      book_id: body.book_id,
    })
      .then(addedBook => {
        resolve(utils.respondWithCode(204));
      })
      .catch(err => {
        console.log(err);
        reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid')));
      });
  });
}


/**
 * Remove all the books from the cart.
 *
 * no response value expected for this operation
 **/
exports.deleteAllBooks = function(user_id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(user_id)) {
      await models.Cart.destroy({
        where: {
          user_id: user_id,
        }
      })
        .then(numberOfDeletedBooks => {
          resolve(utils.respondWithCode(204));
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(500));
    }
  });
}


/**
 * Returns the details of the logged user's cart.
 *
 * returns Cart
 **/
exports.getCart = function(user_id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(user_id)) {
      await models.Cart.findAll({
        where: {
          user_id: user_id,
        }
      })
        .then(cart => {
          if(cart) {
            resolve({
              books_quantities: cart.map(c => { return {
                quantity: c.quantity,
                book_id: c.book_id,
              }})
            });
          } else {
            resolve({book_quantities:[]})
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(500));
    }
  });
}


/**
 * Modify the quantity of a book in the user's cart. If the book is not present in the cart, an error is returned.
 *
 * body BookQuantity
 * no response value expected for this operation
 **/
exports.modifyBookQuantity = function(body, user_id) {
  return new Promise(async function(resolve, reject) {
    // from here on, shitty code, beware...
    if(!parseInt(user_id)) {
      reject(utils.respondWithCode(500));
    } else if (!body.book_id) {
      reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid'), {
        invalidFields: ['book_id']
      }));
    } else if(!body.quantity && body.quantity !== 0) {
      reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid'), {
        invalidFields: ['quantity']
      }));
    } else {
      if(parseInt(body.quantity) === 0) {
        await models.Cart.destroy({
          where: {
            user_id: user_id,
            book_id: body.book_id,
          }
        })
          .then(numberOfDeletedBooks => {
            if(numberOfDeletedBooks > 0) {
              resolve(utils.respondWithCode(204));
            } else {
              reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid')));
            }
          })
          .catch(err => {
            reject(utils.respondWithCode(500));
          })
      } else {
        await models.Cart.update({
          quantity: body.quantity
        }, {
          where: {
            user_id: user_id,
            book_id: body.book_id
          }
        })
          .then(resultArray => {
            if (resultArray[0] > 0) {
              resolve(utils.respondWithCode(204));
            } else {
              reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid')));
            }
          })
          .catch(err => {
            const invalidFields = err.errors.map(error => {
              return error.path
            });
            reject(utils.respondWithCode(400, models.Error(681, 'One or more fields are invalid', {invalidFields})));
          })
      }
    }
  });
}

