const errorM = require("./errorHelper");
const client = require("../config/redisConfig");

const validateCode = async (key, code) => {
  try {
    let opt = await client.get(key);
    if (!code) {
      errorM.handleCustomError(["Code expired or invalid"]);
    }
    if (code !== opt) {
      errorM.handleCustomError(["Verification code failed"]);
    }
    return true;
  } catch (error) {
    console.log("checlk", error);
    errorM.handleCustomError([error.EM]);
    return false;
  }
};
module.exports = validateCode;
