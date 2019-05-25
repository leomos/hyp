const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      publication_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      abstract: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      number_of_pages: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          notEmpty: true,
        },
        allowNull: false,
      },
      format: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      author_interview: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      publishing_house: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.Genre, {
      foreignKey: 'genre_id',
    });

    this.hasMany(models.Event, {
      foreignKey: 'book_id',
    });

    this.belongsToMany(models.User, {
      through: {
        model: models.Cart,
      },
      foreignKey: 'book_id'
    });

    this.belongsToMany(models.Author, {
      through: {
        model: models.BookAuthor,
      },
      foreignKey: 'book_id'
    });

    this.belongsToMany(models.Theme, {
      through: {
        model: models.BookTheme,
      },
      foreignKey: 'book_id'
    });

    this.belongsToMany(models.Book, {
      through: {
        model: models.SimilarBook,
      },
      as: 'book1',
      foreignKey: 'book1_id',
    });
    this.belongsToMany(models.Book, {
      through: {
        model: models.SimilarBook,
      },
      as: 'book2',
      foreignKey: 'book2_id',
    });

    this.hasMany(models.Review, {
      foreignKey: 'book_id',
    });

  }
}

module.exports = Book;