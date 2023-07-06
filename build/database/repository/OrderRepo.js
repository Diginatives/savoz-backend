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
var order_1 = require("../../constants/order");
var userConstants_1 = __importDefault(require("../../constants/userConstants"));
var Logger_1 = __importDefault(require("../../core/Logger"));
var utils_1 = require("../../function/utils");
var index_1 = __importStar(require("../index"));
var Order_1 = require("../model/Order");
var OrderPrducts_1 = require("../model/OrderPrducts");
var Product_1 = require("../model/Product");
var ProductRepo_1 = __importDefault(require("./ProductRepo"));
var UserRepo_1 = __importDefault(require("./UserRepo"));
var OrderRepo = /** @class */ (function () {
    function OrderRepo() {
    }
    OrderRepo.createOrder = function (order, userId, products, cardId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, orderProductsName, user, now, orderObj, data, newOrder, productData, productObj, _i, products_1, product, productResponse, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.connection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 12, 14, 16]);
                        return [4 /*yield*/, connection.query('START TRANSACTION')];
                    case 3:
                        _a.sent();
                        orderProductsName = products.map(function (p) { return p.productName; }).join(',');
                        return [4 /*yield*/, UserRepo_1.default.findById(userId)];
                    case 4:
                        user = _a.sent();
                        console.log('at orderplace query...');
                        now = new Date();
                        orderObj = {
                            orderUserId: userId,
                            orderTotalPrice: (0, utils_1.fixedPrice)(order.orderTotalPrice),
                            orderTotalTax: (0, utils_1.fixedPrice)(order.orderTotalTax),
                            orderTotalPayable: (0, utils_1.fixedPrice)(order.orderTotalPayable),
                            orderStatus: order_1.ORDER_STATUS.INPROGRESS,
                            orderOrderType: order.orderOrderType,
                            orderTotalDiscount: (0, utils_1.fixedPrice)(order.orderTotalDiscount || 0),
                            orderDeliveryMethod: order.orderDeliveryMethod,
                            orderDeliveryAddress: order.orderDeliveryAddress,
                            orderDeliveryLatLng: order.orderDeliveryLatLng,
                            orderDeliveryCharges: order.orderDeliveryCharges,
                            orderPaymentMethod: order.orderPaymentMethod,
                            orderProductsName: orderProductsName,
                            orderUserName: "".concat(user[0].firstName, " ").concat(user[0].lastName),
                            orderCreatedAt: now,
                        };
                        return [4 /*yield*/, connection.query("INSERT INTO ".concat(Order_1.ORDER_TABLE_NAME, " SET ?"), orderObj)];
                    case 5:
                        data = _a.sent();
                        newOrder = __assign(__assign({}, orderObj), { orderId: data.insertId });
                        productData = [];
                        productObj = void 0;
                        if (!(newOrder && newOrder.orderId)) return [3 /*break*/, 10];
                        _i = 0, products_1 = products;
                        _a.label = 6;
                    case 6:
                        if (!(_i < products_1.length)) return [3 /*break*/, 10];
                        product = products_1[_i];
                        return [4 /*yield*/, ProductRepo_1.default.updateQuantity(product.product.productId, product.product.productQuantity - product.quantity)];
                    case 7:
                        _a.sent();
                        productObj = {
                            orderId: newOrder.orderId,
                            productName: product.productName,
                            productId: product.productId,
                            quantity: product.quantity,
                            unitPrice: product.productUnitPrice,
                            totalPrice: product.totalPrice,
                            totalTax: product.totalTax,
                            createdAt: now,
                        };
                        return [4 /*yield*/, connection.query("INSERT INTO ".concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, " SET ?"), productObj)];
                    case 8:
                        productResponse = _a.sent();
                        productData.push(__assign(__assign({}, productObj), { orderProductId: productResponse.insertId }));
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10: 
                    // const paymentIntent: any = await payment.chargePayment(
                    //   user[0],
                    //   cardId,
                    //   transferAmountForStripe(order.orderTotalPayable.toFixed(2)),
                    // );
                    // const paymentLog = {
                    //   userId: userId,
                    //   orderId: newOrder.orderId,
                    //   amount: order.orderTotalPayable,
                    //   transactionId: paymentIntent.id,
                    // };
                    // await PaymentLogsRepo.create(paymentLog);
                    return [4 /*yield*/, connection.query('COMMIT')];
                    case 11:
                        // const paymentIntent: any = await payment.chargePayment(
                        //   user[0],
                        //   cardId,
                        //   transferAmountForStripe(order.orderTotalPayable.toFixed(2)),
                        // );
                        // const paymentLog = {
                        //   userId: userId,
                        //   orderId: newOrder.orderId,
                        //   amount: order.orderTotalPayable,
                        //   transactionId: paymentIntent.id,
                        // };
                        // await PaymentLogsRepo.create(paymentLog);
                        _a.sent();
                        return [2 /*return*/, { order: newOrder, products: productData }];
                    case 12:
                        err_1 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 13:
                        _a.sent();
                        console.log('ROLLBACK at order place query');
                        Logger_1.default.info('DB Trasanction Failed at Order Place Creation');
                        Logger_1.default.info(err_1);
                        throw err_1;
                    case 14: return [4 /*yield*/, connection.release()];
                    case 15:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    OrderRepo.countOrderByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select count(*) as rowCount\n    from ".concat(Order_1.ORDER_TABLE_NAME, " \n    where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderUserId, " = ").concat(userId, "\n    and ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderIsActive, " = ").concat(userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE);
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    OrderRepo.findAddressByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select DISTINCT ".concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderDeliveryAddress, ",").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderDeliveryLatLng, " \n    from ").concat(Order_1.ORDER_TABLE_NAME, " \n    where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderUserId, " = ").concat(userId, "\n    and ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderDeliveryAddress, " IS NOT NULL;");
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    OrderRepo.findByOrderId = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select *\n    from ".concat(Order_1.ORDER_TABLE_NAME, " \n    where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderId, " = ").concat(orderId);
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    OrderRepo.findByUserId = function (userId, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select * from (Select *\n      from ".concat(Order_1.ORDER_TABLE_NAME, " \n      where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderUserId, " = ").concat(userId, "\n      and ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderIsActive, " = ").concat(userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE, "\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet, ") a ORDER BY ").concat(Order_1.ORDER_COL.orderId, " DESC");
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderRepo.findProductsByOrderId = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select *\n    from ".concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, "\n    inner join ").concat(Product_1.PRODUCT_TABLE_NAME, "\n    on ").concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, ".").concat(OrderPrducts_1.ORDER_PRODUCT_COL.productId, " = ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " \n    where ").concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, ".").concat(OrderPrducts_1.ORDER_PRODUCT_COL.orderId, " = ").concat(orderId);
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    OrderRepo.countAllOrder = function (orderType, searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select count(*) as rowCount\n    from ".concat(Order_1.ORDER_TABLE_NAME, "\n    where (").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderUserName, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderProductsName, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderId, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderDeliveryAddress, " LIKE '%").concat(searchText, "%')\n    and ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderIsActive, " = ").concat(userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE, "\n    ").concat(orderType ? "and( ".concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderOrderType, " = ").concat(orderType, ")") : '');
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    OrderRepo.assignRider = function (orderId, riderAssignData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.updateRecord)("update ".concat(Order_1.ORDER_TABLE_NAME, " set ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderAssignedTo, "=?,").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderAssignedDate, "=?,").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderAssignedTime, "=?,").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderStatus, "=? \n      where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderId, "=").concat(orderId), riderAssignData)];
            });
        });
    };
    OrderRepo.recentOrders = function (currentDate, spanOf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00' ORDER BY ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderCreatedAt, " ASC LIMIT 10"))];
            });
        });
    };
    OrderRepo.findOrderById = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderId, " = ").concat(orderId))];
            });
        });
    };
    OrderRepo.orderProducts = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT ".concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, ".* , productItemName as productName, productItemSKU as productSKU FROM ").concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, "\n      LEFT JOIN ").concat(Product_1.PRODUCT_TABLE_NAME, " ON ").concat(OrderPrducts_1.ORDER_PRODUCT_TABLE_NAME, ".").concat(OrderPrducts_1.ORDER_PRODUCT_COL.productId, " = ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " WHERE ").concat(OrderPrducts_1.ORDER_PRODUCT_COL.orderId, " = ").concat(orderId))];
            });
        });
    };
    OrderRepo.sales = function (currentDate, spanOf, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT SUM(orderTotalPrice) as totalSales FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00'"))];
            });
        });
    };
    OrderRepo.avgSales = function (currentDate, spanOf, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT AVG(orderTotalPrice) as avgSales FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, "='Delivered' AND ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00'"))];
            });
        });
    };
    OrderRepo.graphData = function (currentDate, spanOf, orderType, getDataBy, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT ".concat(getDataBy, "(").concat(Order_1.ORDER_COL.orderCreatedAt, ") as period, COUNT(*) AS total FROM ").concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, " NOT IN ('Delivered', 'Cancelled') AND ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND date(").concat(Order_1.ORDER_COL.orderCreatedAt, ") BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00' GROUP BY period ORDER BY ").concat(orderBy, "(period)"))];
            });
        });
    };
    OrderRepo.salesPreviousSpan = function (spanOf, previousSpanDays, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT SUM(orderTotalPrice) as previouseTotalSales FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, "='Delivered' AND ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(previousSpanDays, " 00:00:00' AND '").concat(spanOf, " 00:00:00'"))];
            });
        });
    };
    OrderRepo.deliveredOrders = function (currentDate, spanOf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, "='Delivered' AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00' ORDER BY ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderCreatedAt, " ASC LIMIT 10;"))];
            });
        });
    };
    OrderRepo.avgOrders = function (spanOf, currentDate, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT AVG(orderTotalPrice) as avgOrders FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, " NOT IN ('Delivered', 'Cancelled') AND  ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00'"))];
            });
        });
    };
    OrderRepo.previousAvgOrders = function (previousSpanDays, spanOf, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT AVG(orderTotalPrice) as previousAvgOrders FROM ".concat(Order_1.ORDER_TABLE_NAME, " WHERE ").concat(Order_1.ORDER_COL.orderStatus, " NOT IN ('Delivered', 'Cancelled') AND  ").concat(Order_1.ORDER_COL.orderOrderType, "=").concat(orderType, " AND ").concat(Order_1.ORDER_COL.orderCreatedAt, " BETWEEN '").concat(previousSpanDays, " 00:00:00' AND '").concat(spanOf, " 00:00:00'"))];
            });
        });
    };
    OrderRepo.deleteOrdeer = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.updateRecord)("update ".concat(Order_1.ORDER_TABLE_NAME, " set ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderIsActive, "=? \n    where ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderId, "=").concat(orderId), [userConstants_1.default.ACTIVE_STATUS.ISACTIVEFALSE.toString()])];
            });
        });
    };
    OrderRepo.getAllOrders = function (orderType, searchText, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "Select *\n    from ".concat(Order_1.ORDER_TABLE_NAME, " \n    where (").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderUserName, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderId, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderProductsName, " LIKE '%").concat(searchText, "%' or\n    ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderDeliveryAddress, " LIKE '%").concat(searchText, "%')\n    and ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderIsActive, " = ").concat(userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE, "\n    ").concat(orderType ? "and (".concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderOrderType, " = ").concat(orderType, ")") : ' ', "\n    ORDER BY ").concat(Order_1.ORDER_TABLE_NAME, ".").concat(Order_1.ORDER_COL.orderCreatedAt, " DESC\n    LIMIT ").concat(limit, " OFFSET ").concat(offSet);
                return [2 /*return*/, (0, index_1.executeQuery)(query)];
            });
        });
    };
    return OrderRepo;
}());
exports.default = OrderRepo;
// inner join
//     ${ORDER_PRODUCT_TABLE_NAME} on
//     ${ORDER_TABLE_NAME}.${ORDER_COL.orderId} = ${ORDER_PRODUCT_TABLE_NAME}.${ORDER_PRODUCT_COL.orderId}
//# sourceMappingURL=OrderRepo.js.map