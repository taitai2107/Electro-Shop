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
  sendMailT,
  validateCode,
} = require("./importLib");
class servicesAuth {
  constructor() {}

  generateCode() {
    const nums = "0123456789";
    let res = "";
    for (let i = 0; i < 5; i++) {
      res += nums[Math.floor(Math.random() * nums.length)];
    }
    return res;
  }
  generatePass() {
    const abc = "qwertyuiopasdfghjklzxcvbnm";
    let res = "";
    for (let i = 0; i < 15; i++) {
      res += abc[Math.floor(Math.random() * abc.length)];
    }
    return res;
  }
  async handleLogin({ valueInput, password }) {
    // console.log("Received Value Input:", valueInput);
    // console.log("Received Password:", password);
    console.log(password);
    try {
      let account = await db.Users.findOne({
        where: {
          [Op.or]: [{ email: valueInput }, { userName: valueInput }],
        },
      });
      if (!account) {
        handleCustomErrorToken(["Account not found !"]);
      }
      let payload = {
        id: account.dataValues.userId,
        // username: account.dataValues.username,
        // groupId: account.dataValues.groupId,
        // group: account.dataValues.group,
      };
      let secretkey = process.env.ACCESS_TOKEN_SECRET;
      let expires = "1d";
      let token = createToken(payload, secretkey, expires, handleCustomError);
      token = "Bearer " + token;
      const data = {
        accountId: account.userId,
        userName: account.userName,
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        roleId: account.role,
      };
      if (hashPass.checkPassword(password, account.passWord)) {
        return {
          EC: 0,
          EM: "Đăng nhập thành công",
          // data: data,
          token: token,
        };
      } else {
        handleCustomErrorToken(["password error !"]);
      }
    } catch (error) {
      console.log("check e", error);
      processError(error);
    }
  }
  async handleFindUser(id) {
    try {
      const res = await db.Users.findByPk(id);

      return {
        EC: 0,
        EM: res,
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleForgotPassword({ email }) {
    try {
      const user = await db.Users.findOne({
        where: {
          email: email,
        },
      });
      // console.log("check", user);
      if (!user) {
        handleCustomError(["email not found !"]);
      }

      let code = this.generateCode();
      await sendMailT(code, user.email);

      return {
        EC: 0,
        EM: "sendMailSuccess!",
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleAuthForgotPass({ email, otp }) {
    try {
      const newPass = this.generatePass();

      let user = await db.Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        handleCustomError(["email not found !"]);
      } else {
        const isValidCode = await validateCode(email, otp);

        if (isValidCode) {
          const newHashPassword = hashPass.hashPassword(newPass);

          await db.Users.update(
            {
              password: newHashPassword,
            },
            {
              where: {
                email,
              },
            }
          );
          return {
            EC: 0,
            EM: `new your password is ${newPass}`,
          };
        }
      }
    } catch (error) {
      processError(error);
    }
  }
}
module.exports = new servicesAuth();
// const findByEmail = async () => {
//   try {
//     const user = await db.Users.findOne({
//       where: {
//         email: "nguyendat7.1998@gmail.com",
//       },
//     });
//     console.log(user.email);
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = findByEmail;
