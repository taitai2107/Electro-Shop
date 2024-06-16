const servicesBrand = require("../services/brand_services");
class BrandController {
  constructor() {}
  async getAll(req, res, next) {
    try {
      let response = await servicesBrand.handleGetAllBrand();
      res.json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }
  async delBrand(req, res, next) {
    try {
      let response = await servicesBrand.handleDelBrand(req.params);
      res.status(200).json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }

  async createBrand(req, res, next) {
    try {
      let response = await servicesBrand.handleAddBrand(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }
}
module.exports = new BrandController();
