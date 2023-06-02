"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_PASS, DB_NAME, DB_HOST, DB_USER_NAME } = process.env;
exports.sequelize = new sequelize_typescript_1.Sequelize(DB_NAME, DB_USER_NAME, DB_PASS, {
    host: DB_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
