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
exports.AccountController = void 0;
const accounts_service_1 = require("../services/accounts.service");
class AccountController {
    constructor() {
        this.accountService = new accounts_service_1.AccountService();
    }
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = req.body;
                const result = yield this.accountService.createAccount(account);
                res.status(201).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAccountById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = req.params.accountId;
                const result = yield this.accountService.getAccountById(accountId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.accountService.getAccounts();
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    updateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = req.params.accountId;
                const account = req.body;
                const result = yield this.accountService.updateAccount(accountId, account);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = req.params.accountId;
                const result = yield this.accountService.deleteAccount(accountId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.AccountController = AccountController;
