const serviceUser = require("../services/admin_services");
const SeverError = require("../error/severError");
class AdminController {
  constructor() {}

  async addUser(req, res, next) {
    try {
      let response = await serviceUser.handleAddUser(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async delUser(req, res, next) {
    try {
      let response = await serviceUser.handleDelUser(req.params);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      let response = await serviceUser.handleUpdate(req.params, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async getAllUser(req, res, next) {
    try {
      let response = await serviceUser.handleGetAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
