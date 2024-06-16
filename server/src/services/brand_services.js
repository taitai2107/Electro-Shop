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
class ServicesBrand {
  constructor() {}
  async handleGetAllBrand() {
    try {
      const result = await db.Brands.findAll();
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
  async handleDelBrand({ id }) {
    const transaction = await db.sequelize.transaction();
    try {
      let errors = [];

      const brand = await db.Brands.findOne({
        where: { brandId: id },
        transaction,
      });
      if (!brand) {
        errors.push("Brand not found!");
      }

      if (errors.length > 0) {
        await transaction.rollback();
        return handleCustomError(errors);
      }

      await db.Products.destroy({
        where: { brandId: id },
        transaction,
      });

      await brand.destroy({ transaction });

      await transaction.commit();

      return {
        EC: 0,
        EM: "Delete brand and related products success!",
      };
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      processError(error);
      return {
        EC: 1,
        EM: "An error occurred while deleting the brand",
      };
    }
  }

  async handleAddBrand({ brandName }) {
    try {
      const result = await db.Brands.create({
        brandName: brandName,
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
module.exports = new ServicesBrand();
