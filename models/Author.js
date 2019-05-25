const Sequelize = require('sequelize');

class Author extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      }
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsToMany(models.Book, {
      through: {
        model: models.BookAuthor,
      },
      foreignKey: 'author_id'
    });
  }
}

module.exports = Author;