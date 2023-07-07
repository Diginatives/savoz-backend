"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var order_1 = require("../../../constants/order");
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
        password: joi_1.default.string().required().min(6),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.string().required(),
    }),
    profile: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(2),
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(0),
        phone: joi_1.default.string().required().min(0),
        email: joi_1.default.string().email().required(),
    }),
    auth: joi_1.default.object()
        .keys({
        authorization: (0, validator_1.JoiAuthBearer)().required(),
    })
        .unknown(true),
    orderList: joi_1.default.object().keys({
        searchText: joi_1.default.optional(),
        orderType: joi_1.default.number().optional().valid(order_1.ORDER_TYPE.TYPE24, order_1.ORDER_TYPE.TYPE20),
        page: joi_1.default.number().optional(),
        limit: joi_1.default.number().optional(),
    }),
    assingRider: joi_1.default.object().keys({
        orderId: joi_1.default.number().required(),
        riderName: joi_1.default.string().required(),
        date: joi_1.default.date().required(),
        time: joi_1.default.string()
            .regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
            .required()
            .messages({
            'object.regex': 'invalid time format',
            'string.pattern.base': 'invalid time format',
        }),
        orderStatus: joi_1.default.string()
            .valid(order_1.ORDER_STATUS.PENDING, order_1.ORDER_STATUS.INPROGRESS, order_1.ORDER_STATUS.DELIVERED, order_1.ORDER_STATUS.CANCELLED)
            .required(),
    }),
    deleteOrder: joi_1.default.object().keys({
        orderId: joi_1.default.number().required(),
    }),
    option: joi_1.default.object().keys({
        option: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=schema.js.map