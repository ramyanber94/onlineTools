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
exports.AccountService = void 0;
const account_model_1 = require("../schemas/account.model");
class AccountService {
    constructor() {
        this.accountModel = account_model_1.AccountModel;
    }
    createAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountModel.create(account);
        });
    }
    getAccountById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountModel.findByPk(accountId);
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountModel.findAll();
        });
    }
    updateAccount(accountId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountModel.update(account, {
                where: {
                    account_id: accountId,
                },
            });
        });
    }
    deleteAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountModel.destroy({
                where: {
                    account_id: accountId,
                },
            });
        });
    }
}
exports.AccountService = AccountService;
