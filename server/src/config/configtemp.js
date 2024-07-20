// require("dotenv").config();
const dbPassword =
  process.env.DB_PASSWORD === "null" ? null : process.env.DB_PASSWORD;
// console.log(process.env.DB_USER);
module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: dbPassword || "null",
    database: process.env.DB_DBNAME || "db_shop",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
