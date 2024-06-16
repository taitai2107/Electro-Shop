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
class servicesProduct {
  constructor() {}
  async handleGetAllProduct() {
    try {
      const products = await db.Products.findAll({
        include: [
          {
            model: db.Categories,

            attributes: ["categoryId", "categoryName"],
          },
          {
            model: db.Brands,

            attributes: ["brandId", "brandName"],
          },
        ],
      });
      console.log(products);
      if (!products) {
        handleCustomError([`Get products fail !`]);
      }
      return {
        EC: 0,
        EM: products,
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleGetDeltailProduct({ productId }) {
    try {
      console.log(productId);
      const DetailtProduct = await db.Products.findOne({
        where: {
          productId: productId,
        },
        include: [
          {
            model: db.Categories,

            attributes: ["CategoryId", "categoryName"],
          },
          {
            model: db.Brands,

            attributes: ["BrandId", "brandName"],
          },
        ],
      });
      if (!DetailtProduct) {
        handleCustomError([`not found Product !`]);
      }
      return {
        EC: 0,
        EM: DetailtProduct,
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleGetCategory() {
    try {
      const listCate = await db.Categories.findAll({
        attributes: ["categoryId", "categoryName", "createdAt", "updatedAt"],
      });
      return {
        EC: 0,
        EM: listCate,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async handleGetCategoryById({ CateId }) {
    try {
      const DetailtCate = await db.Categories.findOne({
        where: {
          categoryId: CateId,
        },
        include: [
          {
            model: db.Products,
          },
        ],
      });
      if (!DetailtCate) {
        handleCustomError([`not found Product !`]);
      }
      return {
        EC: 0,
        EM: DetailtCate,
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleDelProduct({ productid }) {
    try {
      let errors = [];

      const result = await db.Products.findOne({
        where: { productId: productid },
      });
      if (!result) {
        errors.push("Product not found !");
      }
      console.log("check erros", errors);
      if (errors.length > 0) {
        handleCustomError(errors);
      }
      await result.destroy();
      return {
        EC: 0,
        EM: "Delete Product success !",
      };
    } catch (error) {
      console.log(error);
      // if (error.customError) {
      //   throw new Error400({ EC: error.EC, EM: error.EM });
      // } else {
      //   throw new ServerError({
      //     EC: 1,
      //     EM: "Failed to delete user due to an unexpected error.",
      //   });
      // }
      processError(error);
    }
  }
  async handleAddProduct(
    { name, description, price, stock, categoryId, brandId },
    { path }
  ) {
    try {
      let result = await db.Products.create({
        name: name,
        desciption: description,
        price: price,
        stock: stock,
        categoryId: categoryId,
        brandId: brandId,
        image: path,
      });
      if (result)
        return {
          EC: 0,
          EM: "upload success !",
        };
    } catch (error) {
      processError(error);
    }
  }
}

module.exports = new servicesProduct();
