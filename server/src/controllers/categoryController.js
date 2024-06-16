const servicesCate = require("../services/category_services");
class CateController {
  constructor() {}
  async getAll(req, res, next) {
    try {
      let response = await servicesCate.handleGetAllCate();
      res.json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }
  async delCate(req, res, next) {
    try {
      let response = await servicesCate.handleDelCate(req.params);
      res.status(200).json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }

  async createCate(req, res, next) {
    try {
      let response = await servicesCate.handleAddCate(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }
}
module.exports = new CateController();
