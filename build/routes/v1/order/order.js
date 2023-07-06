"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var deliveryMethods_1 = __importDefault(require("../../../constants/deliveryMethods"));
var ApiResponse_1 = require("../../../core/ApiResponse");
var Logger_1 = __importDefault(require("../../../core/Logger"));
var order_responses_1 = require("../../../custom/order-responses");
var OrderRepo_1 = __importDefault(require("../../../database/repository/OrderRepo"));
var UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
var payment_1 = __importDefault(require("../../../function/payment"));
var utils_1 = require("../../../function/utils");
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var userConstants_1 = __importDefault(require("../../../constants/userConstants"));
var ProductRepo_1 = __importDefault(require("../../../database/repository/ProductRepo"));
var router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
//User Order's API's
router.post('/order_place', (0, validator_1.default)(schema_1.default.order, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, deliveryMethod, totalTax, totalPayable, discount, totalPrice, orderType, paymentMethod, deliveryAddress, deliveryLatLng, cardId, paymentMethodId, products, orderObj, user, _b, isError, productsList, stripeId, cardData, result, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, deliveryMethod = _a.deliveryMethod, totalTax = _a.totalTax, totalPayable = _a.totalPayable, discount = _a.discount, totalPrice = _a.totalPrice, orderType = _a.orderType, paymentMethod = _a.paymentMethod, deliveryAddress = _a.deliveryAddress, deliveryLatLng = _a.deliveryLatLng, cardId = _a.cardId, paymentMethodId = _a.paymentMethodId, products = _a.products;
                orderObj = {
                    orderPaymentMethod: paymentMethod,
                    orderDeliveryMethod: deliveryMethod,
                    orderDeliveryLatLng: deliveryMethod === deliveryMethods_1.default.DOOR ? deliveryLatLng : null,
                    orderDeliveryAddress: deliveryMethod === deliveryMethods_1.default.DOOR ? deliveryAddress : null,
                    orderTotalDiscount: parseFloat(discount),
                    orderOrderType: orderType,
                    orderTotalPrice: parseFloat(totalPrice),
                    orderTotalPayable: parseFloat(totalPayable),
                    orderTotalTax: parseFloat(totalTax),
                    orderDeliveryCharges: 0,
                };
                if (req['userId'] === userConstants_1.default.GUEST_INFO.guestId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse("Guest can't place order").send(res)];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 10, , 11]);
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 2:
                user = _c.sent();
                return [4 /*yield*/, ProductRepo_1.default.validateProductQuantities(products, orderType)];
            case 3:
                _b = _c.sent(), isError = _b.isError, productsList = _b.productsList;
                if (isError) {
                    return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', { productsList: productsList, outOfStock: true }).send(res)];
                }
                if (!paymentMethodId && !cardId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('cardId is required').send(res)];
                }
                if (!paymentMethodId) return [3 /*break*/, 8];
                stripeId = user[0].stripeId;
                if (!(user[0] && (!user[0].stripeId || user[0].stripeId === null))) return [3 /*break*/, 5];
                return [4 /*yield*/, payment_1.default.createCustomer(user[0])];
            case 4:
                stripeId = _c.sent();
                _c.label = 5;
            case 5: return [4 /*yield*/, payment_1.default.attachCard(paymentMethodId, stripeId)];
            case 6:
                _c.sent();
                cardData = [stripeId, paymentMethodId];
                return [4 /*yield*/, UserRepo_1.default.updateStripeIdAndCardId(user[0].id, cardData)];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8: return [4 /*yield*/, OrderRepo_1.default.createOrder(orderObj, req.userId, productsList, cardId)];
            case 9:
                result = _c.sent();
                if (result)
                    return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', result).send(res)];
                return [3 /*break*/, 11];
            case 10:
                err_1 = _c.sent();
                Logger_1.default.info(err_1);
                console.log('eerr', err_1.message);
                return [2 /*return*/, new ApiResponse_1.InternalErrorResponse("".concat(err_1.message)).send(res)];
            case 11: return [2 /*return*/];
        }
    });
}); }));
router.get('/all_orders', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, limit, offSet, userId, countData, orders, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = (0, utils_1.getPaginationParams)(req), page = _a.page, limit = _a.limit, offSet = _a.offSet;
                userId = req['userId'];
                return [4 /*yield*/, OrderRepo_1.default.countOrderByUserId(userId)];
            case 1:
                countData = _e.sent();
                return [4 /*yield*/, OrderRepo_1.default.findByUserId(userId, limit, offSet)];
            case 2:
                orders = _e.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'success'];
                _d = {};
                return [4 /*yield*/, (0, order_responses_1.customOrderCollectionResponse)(orders)];
            case 3: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([(_d.orders = _e.sent(),
                        _d.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _d)])))().send(res)];
        }
    });
}); }));
router.get('/order_addresses', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req['userId'];
                return [4 /*yield*/, OrderRepo_1.default.findAddressByUserId(userId)];
            case 1:
                order = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', order).send(res)];
        }
    });
}); }));
router.get('/order_receipt/:orderId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, userId, customerDetails, orderProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.orderId;
                return [4 /*yield*/, OrderRepo_1.default.findOrderById(orderId)];
            case 1:
                order = _a.sent();
                if (!order)
                    throw new ApiResponse_1.BadRequestResponse('Order not found').send(res);
                userId = order[0].orderUserId;
                return [4 /*yield*/, UserRepo_1.default.findById(userId)];
            case 2:
                customerDetails = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.orderProducts(order[0].orderId)];
            case 3:
                orderProducts = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', {
                        order: order,
                        customerDetails: customerDetails,
                        orderProducts: orderProducts,
                    }).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=order.js.map