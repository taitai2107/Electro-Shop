"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Products, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
    }
  }
  Categories.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      categoryName: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "Categories",
    }
  );
  return Categories;
};
