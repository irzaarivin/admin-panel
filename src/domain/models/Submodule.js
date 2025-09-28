'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Submodule extends Model {
    static associate(models) {
      Submodule.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'Module'
      });
    }
  }
  await Submodule.init({
    module_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Submodule',
    tableName: 'submodules',
    timestamps: true
  });
  return Submodule;
};