"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.getProductImage = exports.customOrderUserResponse = exports.customProductOrderCollectionResponse = exports.customProductResponse = exports.customOrderCollectionResponse = exports.customOrderResponse = void 0;
var urls_1 = __importDefault(require("../constants/urls"));
var OrderRepo_1 = __importDefault(require("../database/repository/OrderRepo"));
var UserRepo_1 = __importDefault(require("../database/repository/UserRepo"));
var utils_1 = require("../function/utils");
var user_responses_1 = require("./user-responses");
function customOrderResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var userObj, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [__assign({}, data)];
                    _b = {};
                    return [4 /*yield*/, customOrderUserResponse(data.orderUserId)];
                case 1:
                    _b.user = _c.sent();
                    return [4 /*yield*/, customProductOrderCollectionResponse(data.orderId)];
                case 2:
                    userObj = __assign.apply(void 0, _a.concat([(_b.products = _c.sent(), _b)]));
                    return [2 /*return*/, userObj];
            }
        });
    });
}
exports.customOrderResponse = customOrderResponse;
function customOrderCollectionResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var orders, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orders = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < data.length)) return [3 /*break*/, 4];
                    _b = (_a = orders).push;
                    return [4 /*yield*/, customOrderResponse(data[i])];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, orders];
            }
        });
    });
}
exports.customOrderCollectionResponse = customOrderCollectionResponse;
function customProductResponse(product) {
    return __awaiter(this, void 0, void 0, function () {
        var productObj;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {
                        ProductTotalPrice: product.totalPrice,
                        ProductTotalTax: product.totalTax,
                        productId: product.productId,
                        productCategoryId: product.productCategoryId,
                        productStoreId: product.productStoreId,
                        productItemSKU: product.productItemSKU,
                        productItemBarCode: product.productItemBarCode,
                        productItemName: product.productItemName,
                        productItemBrand: product.productItemBrand,
                        productItemSize: product.productItemSize,
                        productItemColor: product.productItemColor,
                        productItemDescription: product.productItemDescription
                    };
                    return [4 /*yield*/, getProductImage(product.productItemImage, product.productItemThumbnail)];
                case 1:
                    productObj = (_a.productItemImage = _b.sent(),
                        _a.productItemThumbnail = product.productItemThumbnail
                            ? (0, utils_1.getHomeForImage)(urls_1.default.values.imageProductLiveUrl) + product.productItemThumbnail
                            : "".concat((0, utils_1.getHomeUrl)(urls_1.default.values.imageLiveUrl), "imgPlaceholder.png"),
                        _a.productIsActive = product.productIsActive,
                        _a.productUnitPrice = product.productUnitPrice,
                        _a.productIsTaxable = product.productIsTaxable,
                        _a.productTaxPercentage = product.productTaxPercentage,
                        _a.productQuantity = product.quantity,
                        _a.productPurchasedPrice = product.productPurchasedPrice,
                        _a.productComparativePrice = product.productComparativePrice,
                        _a.productRevenuePrice = product.productRevenuePrice,
                        _a.productGrossMargin = product.productGrossMargin,
                        _a.productItemExpiry = product.productItemExpiry,
                        _a.productDiscountAvailable = product.productDiscountAvailable,
                        _a.productDiscountActive = product.productDiscountActive,
                        _a.productFranchiseId = product.productFranchiseId,
                        _a.productCompanyId = product.productCompanyId,
                        _a.productCreatedAt = product.productCreatedAt,
                        _a.productUpdatedAt = product.productUpdatedAt,
                        _a);
                    return [2 /*return*/, productObj];
            }
        });
    });
}
exports.customProductResponse = customProductResponse;
function customProductOrderCollectionResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var orderProducts, products, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderProducts = [];
                    return [4 /*yield*/, OrderRepo_1.default.findProductsByOrderId(data)];
                case 1:
                    products = _c.sent();
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < products.length)) return [3 /*break*/, 5];
                    _b = (_a = orderProducts).push;
                    return [4 /*yield*/, customProductResponse(products[i])];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, orderProducts];
            }
        });
    });
}
exports.customProductOrderCollectionResponse = customProductOrderCollectionResponse;
function customOrderUserResponse(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepo_1.default.findById(userId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.customOrderUserResponse = customOrderUserResponse;
function getProductImage(image, thumbnail) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (image)
                return [2 /*return*/, (0, utils_1.getHomeForImage)(urls_1.default.values.imageProductLiveUrl) + image];
            if (thumbnail)
                return [2 /*return*/, (0, utils_1.getHomeForImage)(urls_1.default.values.imageProductLiveUrl) + thumbnail];
            else
                return [2 /*return*/, "".concat((0, utils_1.getHomeUrl)(urls_1.default.values.imageLiveUrl), "imgPlaceholder.png")];
            return [2 /*return*/];
        });
    });
}
exports.getProductImage = getProductImage;
//# sourceMappingURL=order-responses.js.map