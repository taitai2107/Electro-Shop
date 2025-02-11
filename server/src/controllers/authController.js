const servicesAuth = require("../services/auth");
class AuthController {
  constructor() {}
  async Login(req, res, next) {
    try {
      let response = await servicesAuth.handleLogin(req.body);
      res.json(response);
    } catch (error) {
      console.log("đây là check error", error);
      next(error);
    }
  }
  async findUserByToken(req, res, next) {
    try {
      let response = await servicesAuth.handleFindUser(req.user.id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async forGotPassword(req, res, next) {
    try {
      let response = await servicesAuth.handleForgotPassword(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async authForGotPassword(req, res, next) {
    try {
      let response = await servicesAuth.handleAuthForgotPass(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
