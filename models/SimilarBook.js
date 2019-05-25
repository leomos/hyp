const Sequelize = require('sequelize');

class SimilarBook extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
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

module.exports = SimilarBook;