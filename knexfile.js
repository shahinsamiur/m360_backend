require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, "src/database/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src/database/seeds"),
    },
  },
};
