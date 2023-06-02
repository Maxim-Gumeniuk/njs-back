"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = exports.HeroClass = void 0;
const connection_1 = require("./connection");
const sequelize_typescript_1 = require("sequelize-typescript");
class HeroClass extends sequelize_typescript_1.Model {
}
exports.HeroClass = HeroClass;
exports.HeroModel = connection_1.sequelize.define('Heroes', {
    id: {
        type: sequelize_typescript_1.DataType.STRING,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    },
    nickName: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'nickname',
    },
    realName: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'real_name',
    },
    originalDescription: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'original_description',
    },
    superPowers: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'superpowers'
    },
    catchPhrase: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'catch_phrase'
    },
    images: {
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        defaultValue: [],
        field: 'images'
    },
});
connection_1.sequelize.sync().then(() => {
    console.log('Database and tables created!');
});
