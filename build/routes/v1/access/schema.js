"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var validator_1 = require("../../../helpers/validator");
exports.default = {
    new_password: joi_1.default.object().keys({
        password: joi_1.default.string().required().min(6),
        token: joi_1.default.string().required(),
        userId: joi_1.default.number().required().min(1),
    }),
    validate_reset_token: joi_1.default.object().keys({
        token: joi_1.default.string().required(),
        id: joi_1.default.string().required().min(1),
    }),
    reset_password: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
    }),
    userCredential: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
    }),
    refreshToken: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required().min(1),
    }),
    auth: joi_1.default.object()
        .keys({
        authorization: (0, validator_1.JoiAuthBearer)().required(),
    })
        .unknown(true),
    signup: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(2),
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(3),
        phone: joi_1.default.string().required().min(0),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(6),
    }),
    saveCard: joi_1.default.object().keys({
        id: joi_1.default.string().required(),
    }),
    defaultCard: joi_1.default.object().keys({
        cardId: joi_1.default.string().required(),
    }),
    deleteCard: joi_1.default.object().keys({
        cardId: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=schema.js.map