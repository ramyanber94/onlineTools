"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const OrderItemModel = db_1.sequelize.define("order_item", {
    order_item_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.OrderItemModel = OrderItemModel;
