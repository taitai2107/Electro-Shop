const manageApi = require("./admin");
const errorHandler = require("../middleware/baseError");
const authApi = require("./auth");
const userApi = require("./user");
const productApi = require("./product");
const cateApi = require("./category");
const brandApi = require("./brand");
const useRouter = (app) => {
  app.use("/api/v1/admin", manageApi);
  app.use("/api/v1/auth", authApi);
  app.use("/api/v1/user", userApi);
  app.use("/api/v1/product", productApi);
  app.use("/api/v1/category", cateApi);
  app.use("/api/v1/brand", brandApi);
  app.use(errorHandler);
};
module.exports = {
  useRouter,
};
