'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.weapon)
      models.comment.belongsTo(models.monster)
      models.comment.belongsTo(models.armor)
    }
  };
  comment.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    weaponId: DataTypes.INTEGER,
    monsterId: DataTypes.INTEGER,
    armorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};