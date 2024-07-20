const redis = require("redis");

// const client = redis.createClient({
//   // url: "redis://127.0.0.1:6379",
//   url: "redis://redis:6379",
// });

// const data = {
//   socket: {
//     host: "redis",
//     port: 6379,
//   },
// };
const data = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
const client = redis.createClient(data);
(async () => {
  try {
    await client.connect();
    console.log("Redis connected successfully!");
  } catch (error) {
    console.error(`Redis connection failure: ${error}`);
  }
})();

client.on("error", (e) => {
  console.error(`Redis connection failed: ${e}`);
});
module.exports = client;
