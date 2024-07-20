const transporter = require("../config/transporterConfig");
const errorM = require("./errorHelper");
const client = require("../config/redisConfig");
const sendMailT = async (code, email) => {
  try {
    const option = {
      from: "anonymous",
      to: email,
      subject: "codexxx",
      text: code,
    };
    client.setEx(email, 90, code);
    await transporter.sendMail(option);
    console.log("send mail succ !");
  } catch (e) {
    errorM.handleCustomError([e]);
  }
};
module.exports = sendMailT;
