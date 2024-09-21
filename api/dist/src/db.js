"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize = new sequelize_1.Sequelize((_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DB_NAME) !== null && _b !== void 0 ? _b : "", (_d = (_c = process.env) === null || _c === void 0 ? void 0 : _c.DB_USER) !== null && _d !== void 0 ? _d : "", (_f = (_e = process.env) === null || _e === void 0 ? void 0 : _e.DB_PASSWORD) !== null && _f !== void 0 ? _f : "", {
    host: (_h = (_g = process.env) === null || _g === void 0 ? void 0 : _g.DB_HOST) !== null && _h !== void 0 ? _h : "localhost",
    dialect: "mysql",
    logging: false,
});
exports.sequelize = sequelize;
