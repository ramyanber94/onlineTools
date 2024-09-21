"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("./controllers/account.controller");
const product_controller_1 = require("./controllers/product.controller");
const user_controller_1 = require("./controllers/user.controller");
const router = (0, express_1.Router)();
const accountController = new account_controller_1.AccountController();
const productController = new product_controller_1.ProductsController();
const userController = new user_controller_1.UserController();
/** Account routes */
router.get("/accounts", accountController.getAccounts.bind(accountController));
router.get("/accounts/:accountId", accountController.getAccountById.bind(accountController));
router.post("/accounts", accountController.createAccount.bind(accountController));
router.put("/accounts/:accountId", accountController.updateAccount.bind(accountController));
router.delete("/accounts/:accountId", accountController.deleteAccount.bind(accountController));
/** Product routes */
router.get("/products", productController.getProducts.bind(productController));
router.get("/products/:productId", productController.getProductById.bind(productController));
router.get("/products/account/:accountId", productController.getProductsByAccountId.bind(productController));
router.post("/products", productController.createProduct.bind(productController));
router.put("/products/:productId", productController.updateProduct.bind(productController));
router.delete("/products/:productId", productController.deleteProduct.bind(productController));
/** User routes */
router.get("/users", userController.getUsers.bind(userController));
router.get("/users/:userId", userController.getUserById.bind(userController));
router.post("/users", userController.createUser.bind(userController));
router.put("/users/:userId", userController.updateUser.bind(userController));
router.delete("/users/:userId", userController.deleteUser.bind(userController));
router.get("/users/account/:accountId", userController.getUserByAccountId.bind(userController));
exports.default = router;
