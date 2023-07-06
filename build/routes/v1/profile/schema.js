"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    userId: joi_1.default.object().keys({
        id: joi_1.default.number().required(),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.required(),
    }),
    profile: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(2),
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(0),
        phone: joi_1.default.string().required().min(0),
        email: joi_1.default.string().email().required(),
        address: joi_1.default.string().optional(),
        dob: joi_1.default.string().optional(),
        userLat: joi_1.default.number().optional(),
        userLng: joi_1.default.number().optional(),
    }),
    updatePassword: joi_1.default.object().keys({
        oldPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required().min(6),
    }),
    deleteProfile: joi_1.default.object().keys({
        userId: joi_1.default.number().required(),
        roleId: joi_1.default.number().required(),
    }),
    profilePic: joi_1.default.object().keys({
        imageName: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=schema.js.map