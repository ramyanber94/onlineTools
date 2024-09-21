"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const AdminModel = db_1.sequelize.define("Admin", {
    admin_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.AdminModel = AdminModel;
