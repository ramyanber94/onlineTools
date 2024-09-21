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
exports.ProductsService = void 0;
const product_model_1 = require("../schemas/product.model");
class ProductsService {
    constructor() {
        this.productModel = product_model_1.ProductModel;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.create(product);
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findByPk(productId);
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findAll();
        });
    }
    updateProduct(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.update(product, {
                where: {
                    product_id: productId,
                },
            });
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.destroy({
                where: {
                    product_id: productId,
                },
            });
        });
    }
    getProductsByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findAll({
                where: {
                    accountId: accountId,
                },
            });
        });
    }
}
exports.ProductsService = ProductsService;
