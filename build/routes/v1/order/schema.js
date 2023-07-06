"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var deliveryMethods_1 = __importDefault(require("../../../constants/deliveryMethods"));
var order_1 = require("../../../constants/order");
var payment_1 = __importDefault(require("../../../constants/payment"));
exports.default = {
    order: joi_1.default.object().keys({
        paymentMethodId: joi_1.default.string().optional(),
        cardId: joi_1.default.string().optional(),
        deliveryMethod: joi_1.default.string().required().valid(deliveryMethods_1.default.DOOR, deliveryMethods_1.default.PICKUP),
        totalTax: joi_1.default.number().required(),
        totalPayable: joi_1.default.number().required(),
        discount: joi_1.default.number().optional(),
        totalPrice: joi_1.default.number().required(),
        orderType: joi_1.default.number().required().valid(order_1.ORDER_TYPE.TYPE24, order_1.ORDER_TYPE.TYPE20),
        paymentMethod: joi_1.default.string()
            .required()
            .valid(payment_1.default.CREDITCARD, payment_1.default.BANKACCOUNT),
        deliveryAddress: joi_1.default.optional(),
        deliveryLatLng: joi_1.default.optional(),
        products: joi_1.default.array().items(joi_1.default.object({
            productUnitPrice: joi_1.default.number().required(),
            productId: joi_1.default.number().required(),
            productName: joi_1.default.string().required(),
            quantity: joi_1.default.number().required(),
            totalTax: joi_1.default.number().required(),
            totalPrice: joi_1.default.number().required(),
            productItemSKU: joi_1.default.string().required(),
        }).required()),
    }),
};
//# sourceMappingURL=schema.js.map