const Sequelize = require('sequelize');

class Theme extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
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
    this.belongsToMany(models.Book, {
      through: {
        model: models.BookTheme,
      },
      foreignKey: 'theme_id'
    });
  }
}

module.exports = Theme;