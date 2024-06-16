const { param } = require("express/lib/router");
const servicesProduct = require("../services/product_services");
class ProductController {
  constructor() {}
  async getAllProducts(req, res, next) {
    try {
      let response = await servicesProduct.handleGetAllProduct();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getDeltailProducts(req, res, next) {
    try {
      let response = await servicesProduct.handleGetDeltailProduct(req.params);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCategoryProduct(req, res, next) {
    try {
      let response = await servicesProduct.handleGetCategory();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCategoryProductById(req, res, next) {
    try {
      let response = await servicesProduct.handleGetCategoryById(req.params);
      console.log(req.params);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async delProduct(req, res, next) {
    try {
      let response = await servicesProduct.handleDelProduct(req.params);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async createProduct(req, res, next) {
    try {
      let response = await servicesProduct.handleAddProduct(req.body, req.file);
      // console.log("check", req.file.path);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ProductController();
