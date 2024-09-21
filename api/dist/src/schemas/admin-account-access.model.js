"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAccountAccessModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const AdminAccountAccessModel = db_1.sequelize.define("AdminAccountAccess", {
    access_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
exports.AdminAccountAccessModel = AdminAccountAccessModel;
