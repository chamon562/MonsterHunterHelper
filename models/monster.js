'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class monster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.monster.belongsTo(models.user)
      models.monster.hasMany(models.comment)
    }
  };
  monster.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    apiId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'monster',
  });
  return monster;
};