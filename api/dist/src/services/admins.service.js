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
exports.AdminsService = void 0;
const admin_model_1 = require("../schemas/admin.model");
class AdminsService {
    constructor() {
        this.adminModel = admin_model_1.AdminModel;
    }
    createAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.create(admin);
        });
    }
    getAdminById(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.findByPk(adminId);
        });
    }
    getAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.findAll();
        });
    }
    updateAdmin(adminId, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.update(admin, {
                where: {
                    admin_id: adminId,
                },
            });
        });
    }
    deleteAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.destroy({
                where: {
                    admin_id: adminId,
                },
            });
        });
    }
    getAdminsByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.findAll({
                where: {
                    account_id: accountId,
                },
            });
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminModel.findOne({
                where: {
                    email: email,
                },
            });
        });
    }
}
exports.AdminsService = AdminsService;
