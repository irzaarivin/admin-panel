'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.SubModule, {
        foreignKey: 'module_id',
        as: 'Subodule'
      });
    }
  }
  await Module.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: true
  });
  return Module;
};