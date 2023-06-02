import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_PASS, DB_NAME, DB_HOST, DB_USER_NAME } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: DB_HOST,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export const sequelize = new Sequelize(
  DB_NAME || '',
  DB_USER_NAME || '',
  DB_PASS || '',
  sequelizeOptions
);
