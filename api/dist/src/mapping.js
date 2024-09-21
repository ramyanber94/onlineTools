"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = require("./schemas/account.model");
const admin_model_1 = require("./schemas/admin.model");
const admin_account_access_model_1 = require("./schemas/admin-account-access.model");
const order_model_1 = require("./schemas/order.model");
const order_item_model_1 = require("./schemas/order-item.model");
const product_model_1 = require("./schemas/product.model");
const user_model_1 = require("./schemas/user.model");
class Mapping {
    init() {
        account_model_1.AccountModel.hasMany(product_model_1.ProductModel, { foreignKey: "accountId" });
        product_model_1.ProductModel.belongsTo(account_model_1.AccountModel, { foreignKey: "accountId" });
        account_model_1.AccountModel.hasMany(user_model_1.UserModel, { foreignKey: "accountId" });
        user_model_1.UserModel.belongsTo(account_model_1.AccountModel, { foreignKey: "accountId" });
        account_model_1.AccountModel.hasMany(order_model_1.OrderModel, { foreignKey: "accountId" });
        order_model_1.OrderModel.belongsTo(account_model_1.AccountModel, { foreignKey: "accountId" });
        user_model_1.UserModel.hasMany(order_model_1.OrderModel, { foreignKey: "userId" });
        order_model_1.OrderModel.belongsTo(user_model_1.UserModel, { foreignKey: "userId" });
        order_model_1.OrderModel.hasMany(order_item_model_1.OrderItemModel, { foreignKey: "orderId" });
        order_item_model_1.OrderItemModel.belongsTo(order_model_1.OrderModel, { foreignKey: "orderId" });
        product_model_1.ProductModel.hasMany(order_item_model_1.OrderItemModel, { foreignKey: "productId" });
        order_item_model_1.OrderItemModel.belongsTo(product_model_1.ProductModel, { foreignKey: "productId" });
        admin_model_1.AdminModel.belongsToMany(account_model_1.AccountModel, {
            through: admin_account_access_model_1.AdminAccountAccessModel,
        });
        account_model_1.AccountModel.belongsToMany(admin_model_1.AdminModel, {
            through: admin_account_access_model_1.AdminAccountAccessModel,
        });
    }
}
const mappingInstance = new Mapping();
exports.default = mappingInstance;
