"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const OrderModel = db_1.sequelize.define("Order", {
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_status: {
        type: sequelize_1.DataTypes.ENUM("pending", "processing", "shipped", "delivered"),
        allowNull: false,
    },
});
exports.OrderModel = OrderModel;
