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
exports.ProductsController = void 0;
const products_service_1 = require("../services/products.service");
class ProductsController {
    constructor() {
        this.productService = new products_service_1.ProductsService();
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const result = yield this.productService.createProduct(product);
                res.status(201).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const result = yield this.productService.getProductById(productId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.productService.getProducts();
                console.log(result);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const product = req.body;
                const result = yield this.productService.updateProduct(productId, product);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const result = yield this.productService.deleteProduct(productId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getProductsByAccountId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = req.params.accountId;
                console.log(accountId);
                const result = yield this.productService.getProductsByAccountId(accountId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.ProductsController = ProductsController;
