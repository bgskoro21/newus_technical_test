import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import Regency from "../database/models/Regency";
import { Warehouse } from "../database/models/Warehouse";
import Category from "../database/models/Category";
import Product from "../database/models/Product";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = "postgres";

const sequelizeConnection = new Sequelize({
  host: dbHost,
  dialect: dbDialect,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  models: [Regency, Warehouse, Category, Product],
});

export default sequelizeConnection;
