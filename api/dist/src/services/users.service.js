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
exports.UsersService = void 0;
const user_model_1 = require("../schemas/user.model");
class UsersService {
    constructor() {
        this.userModel = user_model_1.UserModel;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.create(user);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findByPk(userId);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findAll();
        });
    }
    updateUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.update(user, {
                where: {
                    user_id: userId,
                },
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.destroy({
                where: {
                    user_id: userId,
                },
            });
        });
    }
    getUsersByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findAll({
                where: {
                    account_id: accountId,
                },
            });
        });
    }
}
exports.UsersService = UsersService;
