const Sequelize = require('sequelize');

class Genre extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1,64],
        },

      },
      description: {
        type: DataTypes.TEXT,
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
    this.hasMany(models.Book, {
      foreignKey: 'genre_id',
    });
  }
}

module.exports = Genre;