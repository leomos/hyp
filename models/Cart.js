const Sequelize = require('sequelize');

class Cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          notEmpty: true,
        },
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
  }
}

module.exports = Cart;