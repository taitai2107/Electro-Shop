const {
  db,
  hashPass,
  processError,
  handleCustomError,
  handleCustomErrorToken,
  createToken,
  jwt,
  Op,
  where,
} = require("./importLib");
// const { Category, Product, sequelize } = require("../models");
class ServicesCate {
  constructor() {}
  async handleGetAllCate() {
    try {
      const result = await db.Categories.findAll();
      if (!result) {
        handleCustomError(["not found !"]);
      }
      //   console.log(result);
      return {
        EC: 0,
        EM: result,
      };
    } catch (error) {
      //laptop
      processError(error);
    }
  }
  async handleDelCate({ id }) {
    const transaction = await db.sequelize.transaction();
    try {
      let errors = [];

      const category = await db.Categories.findOne({
        where: { categoryId: id },
        transaction,
      });
      if (!category) {
        errors.push("Category not found!");
      }

      if (errors.length > 0) {
        await transaction.rollback();
        return handleCustomError(errors);
      }

      await db.Products.destroy({
        where: { categoryId: id },
        transaction,
      });

      await category.destroy({ transaction });

      await transaction.commit();

      return {
        EC: 0,
        EM: "Delete category and related products success!",
      };
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      processError(error);
      return {
        EC: 1,
        EM: "An error occurred while deleting the category",
      };
    }
  }

  async handleAddCate({ categoryName }) {
    try {
      const result = await db.Categories.create({
        categoryName: categoryName,
      });
      if (result) {
        return {
          EC: 0,
          EM: "create success !",
        };
      }
    } catch (error) {
      processError(error);
    }
  }
}
module.exports = new ServicesCate();
