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
exports.OrdersService = void 0;
const order_model_1 = require("../schemas/order.model");
class OrdersService {
    constructor() {
        this.orderModel = order_model_1.OrderModel;
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.create(order);
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.findByPk(orderId);
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.findAll();
        });
    }
    updateOrder(orderId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.update(order, {
                where: {
                    order_id: orderId,
                },
            });
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.destroy({
                where: {
                    order_id: orderId,
                },
            });
        });
    }
    getOrdersByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderModel.findAll({
                where: {
                    account_id: accountId,
                },
            });
        });
    }
}
exports.OrdersService = OrdersService;
