const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 64],
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          len: [1, 50],
          notEmpty: true,
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          len: [1, 50],
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
        model: models.Cart,
      },
      foreignKey: 'user_id',
    });

    this.hasMany(models.Review, {
      foreignKey: 'user_id',
    });
  }


  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static validPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = User;