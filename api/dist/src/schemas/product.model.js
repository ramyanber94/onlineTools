"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const account_model_1 = require("./account.model");
const ProductModel = db_1.sequelize.define("product", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    wholesalePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    inventoryControl: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    assets: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue("assets");
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue("assets", JSON.stringify(value));
        },
    },
    sale_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    accountId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: account_model_1.AccountModel,
            key: "account_id",
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
exports.ProductModel = ProductModel;
