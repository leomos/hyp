'use strict';

var models = require('../models');
var utils = require('../utils/writer.js');

const cleanSimilarBooks = (book) => {
  let newBook = book.withAssociationsIds(['Authors','Themes','Reviews','Events']);
  newBook['similar_books_ids'] = new Array();
  newBook['similar_books_ids'] = newBook['similar_books_ids'].concat(newBook.book1.map(similarBook => similarBook.id));
  newBook['similar_books_ids'] = newBook['similar_books_ids'].concat(newBook.book2.map(similarBook => similarBook.id));
  delete newBook.book1;
  delete newBook.book2;
  return newBook;
};

/**
 * Returns an array with all the books.
 *
 * returns List
 **/
exports.getAllBooks = function() {
  return new Promise(async function(resolve, reject) {
    await models.Book.findAll({
      include: [{
        model: models.Book,
        as: 'book2',
      },{
        model: models.Book,
        as: 'book1',
      },{
        model: models.Author,
      },{
        model: models.Theme,
      },{
        model: models.Review,
      },{
        model: models.Event,
      }]
    })
      .then(books => {
        resolve(books.map(book => cleanSimilarBooks(book)));
      })
      .catch(err => {
        console.log(err);
        reject(utils.respondWithCode(500));
      });
  });
}


/**
 * Returns the details of a specific book.
 *
 * id Integer The book ID
 * returns Book
 **/
exports.getBook = function(id) {
  return new Promise(async function(resolve, reject) {
    if(parseInt(id)) {
      await models.Book.findByPk(id, {
        include: [{
          model: models.Book,
          as: 'book2',
        },{
          model: models.Book,
          as: 'book1',
        },{
          model: models.Author,
        },{
          model: models.Theme,
        },{
          model: models.Review,
        },{
          model: models.Event,
        }]
      })
        .then(book => {
          if(book) {
            resolve(cleanSimilarBooks(book));
          } else {
            reject(utils.respondWithCode(404, models.Error(501, 'Book not found')));
          }
        })
        .catch(err => {
          reject(utils.respondWithCode(500));
        })
    } else {
      reject(utils.respondWithCode(400, models.Error(502, 'Id is not a valid number')));
    }
  });
}

