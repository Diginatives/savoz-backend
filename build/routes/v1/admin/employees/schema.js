"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    employeeFormData: joi_1.default.object().keys({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        roleId: joi_1.default.number().required(),
        // storeId: Joi.number().required(),
        phone: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        isActive: joi_1.default.number().required(),
        email: joi_1.default.string().email().required(),
        profileImage: joi_1.default.string().optional(),
    }),
    employeeUpdateFormData: joi_1.default.object().keys({
        id: joi_1.default.number().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        roleId: joi_1.default.number().required(),
        // storeId: Joi.number().required(),
        phone: joi_1.default.string().required(),
        isActive: joi_1.default.number().required(),
        email: joi_1.default.string().email().required(),
        profileImage: joi_1.default.string().optional(),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.required(),
    }),
};
//# sourceMappingURL=schema.js.map