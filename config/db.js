import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// MySQL-only configuration
// Configure via env variables in `backend/.env`.
// Required:
//   DB_DIALECT=mysql
//   DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
const dialect = process.env.DB_DIALECT || "mysql";

if (dialect !== "mysql") {
  throw new Error(
    `Unsupported DB_DIALECT: ${dialect}. This project is configured to use MySQL.`
  );
}

const options = {
  dialect,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  options
);



export default sequelize;
