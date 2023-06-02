import { Sequelize } from "sequelize-typescript";
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_PASS, DB_NAME, DB_HOST, DB_USER_NAME } = process.env;

export const sequelize = new Sequelize(
    DB_NAME || '', 
    DB_USER_NAME || '', 
    DB_PASS || '', 
    {
      host: DB_HOST,
      port: 5432,
      dialect: 'postgres',
      dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
      },
    }
);

sequelize.sync().then(() => {
  console.log('Database and tables created!');
});
