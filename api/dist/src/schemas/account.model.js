"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const AccountModel = db_1.sequelize.define("account", {
    account_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_description: {
        type: sequelize_1.DataTypes.TEXT,
    },
});
exports.AccountModel = AccountModel;
