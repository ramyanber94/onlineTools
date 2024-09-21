"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = require("./schemas/account.model");
const admin_account_access_model_1 = require("./schemas/admin-account-access.model");
const admin_model_1 = require("./schemas/admin.model");
const order_item_model_1 = require("./schemas/order-item.model");
const order_model_1 = require("./schemas/order.model");
const product_model_1 = require("./schemas/product.model");
const user_model_1 = require("./schemas/user.model");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create accounts
        const account1 = yield account_model_1.AccountModel.create({
            account_name: "Website 1",
            account_description: "Description for Website 1",
        });
        const account2 = yield account_model_1.AccountModel.create({
            account_name: "Website 2",
            account_description: "Description for Website 2",
        });
        // Create products
        const product1 = yield product_model_1.ProductModel.create({
            accountId: account1.toJSON().account_id,
            name: "Product 1",
            description: "Description for Product 1",
            price: 10.99,
        });
        const product2 = yield product_model_1.ProductModel.create({
            accountId: account1.toJSON().account_id,
            name: "Product 2",
            description: "Description for Product 2",
            price: 20.49,
        });
        const product3 = yield product_model_1.ProductModel.create({
            accountId: account2.toJSON().account_id,
            name: "Product 3",
            description: "Description for Product 3",
            price: 15.75,
        });
        // Create users
        const user1 = yield user_model_1.UserModel.create({
            accountId: account1.toJSON().account_id,
            username: "User1",
            email: "user1@example.com",
            password: "password123",
        });
        const user2 = yield user_model_1.UserModel.create({
            accountId: account1.toJSON().account_id,
            username: "User2",
            email: "user2@example.com",
            password: "password123",
        });
        const user3 = yield user_model_1.UserModel.create({
            accountId: account2.toJSON().account_id,
            username: "User3",
            email: "user3@example.com",
            password: "password123",
        });
        // Create orders
        const order1 = yield order_model_1.OrderModel.create({
            accountId: account1.toJSON().account_id,
            user_id: user1.toJSON().user_id,
            order_status: "pending",
        });
        const order2 = yield order_model_1.OrderModel.create({
            accountId: account1.toJSON().account_id,
            user_id: user2.toJSON().user_id,
            order_status: "processing",
        });
        const order3 = yield order_model_1.OrderModel.create({
            accountId: account2.toJSON().account_id,
            user_id: user3.toJSON().user_id,
            order_status: "shipped",
        });
        // Create order items
        yield order_item_model_1.OrderItemModel.create({
            order_id: order1.toJSON().order_id,
            product_id: product1.toJSON().product_id,
            quantity: 2,
        });
        yield order_item_model_1.OrderItemModel.create({
            order_id: order2.toJSON().order_id,
            product_id: product2.toJSON().product_id,
            quantity: 1,
        });
        yield order_item_model_1.OrderItemModel.create({
            order_id: order3.toJSON().order_id,
            product_id: product3.toJSON().product_id,
            quantity: 3,
        });
        // Create admin
        const admin1 = yield admin_model_1.AdminModel.create({
            admin_name: "Admin1",
            email: "admin1@example.com",
        });
        const admin2 = yield admin_model_1.AdminModel.create({
            admin_name: "Admin2",
            email: "admin2@example.com",
        });
        // Assign admin access
        yield admin_account_access_model_1.AdminAccountAccessModel.create({
            admin_id: admin1.toJSON().admin_id,
            accountId: account1.toJSON().account_id,
        });
        yield admin_account_access_model_1.AdminAccountAccessModel.create({
            admin_id: admin2.toJSON().admin_id,
            accountId: account2.toJSON().account_id,
        });
        yield admin_account_access_model_1.AdminAccountAccessModel.create({
            admin_id: admin2.toJSON().admin_id,
            accountId: account1.toJSON().account_id,
        });
        console.log("Database seeded successfully.");
    }
    catch (error) {
        console.error("Error seeding database:", error);
    }
});
seedDatabase();
