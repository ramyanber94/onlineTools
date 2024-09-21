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
exports.UserController = void 0;
const users_service_1 = require("../services/users.service");
class UserController {
    constructor() {
        this.userServices = new users_service_1.UsersService();
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.getUsers();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.getUserById(id);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.createUser(user);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.updateUser(id, user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.deleteUser(id);
        });
    }
    getUserByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userServices.getUsersByAccountId(accountId);
        });
    }
}
exports.UserController = UserController;
