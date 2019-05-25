const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
          min: 1,
          notEmpty: true,
        },
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
}

module.exports = Review;