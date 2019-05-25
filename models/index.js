if(!process.env.SQLITE_DB) {
  console.log("SQLITE_DB environment variable not set. Using in-memory database.");
}

const Sequelize = require('sequelize');

Sequelize.Model.prototype.withAssociationsIds = function(associations) {
  var t = JSON.parse(JSON.stringify(this));
  for (let association of associations) {
    const newAssociation = association.toLowerCase() + '_ids';
    t[newAssociation] = this[association] ? this[association].map(a => a.id) : null;
    delete t[association];
  }
  return t;
};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_DB,
});
const seed = require('./seed');

const User = require('./User');
const Genre = require('./Genre');
const Theme = require('./Theme');
const Author = require('./Author');
const Event = require('./Event');
const Review = require('./Review');
const Cart = require('./Cart');
const Book = require('./Book');
const BookAuthor = require('./BookAuthor');
const BookTheme = require('./BookTheme');
const SimilarBook = require('./SimilarBook');

const models = {
  User: User.init(sequelize, Sequelize),
  Genre: Genre.init(sequelize, Sequelize),
  Theme: Theme.init(sequelize, Sequelize),
  Author: Author.init(sequelize, Sequelize),
  Event: Event.init(sequelize, Sequelize),
  Review: Review.init(sequelize, Sequelize),
  Cart: Cart.init(sequelize, Sequelize),
  Book: Book.init(sequelize, Sequelize),
  BookAuthor: BookAuthor.init(sequelize, Sequelize),
  BookTheme: BookTheme.init(sequelize, Sequelize),
  SimilarBook: SimilarBook.init(sequelize, Sequelize),
  Error: (code, message, details) => {return {code, message, details}},
};


Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

sequelize.sync({force: true})
  .then(() => seed(models))
  .then(() => {
  });

module.exports = models;
