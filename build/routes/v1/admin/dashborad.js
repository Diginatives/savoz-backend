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
var validator_1 = __importStar(require("../../../helpers/validator"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var schema_1 = __importDefault(require("./schema"));
var ApiResponse_1 = require("../../../core/ApiResponse");
var OrderRepo_1 = __importDefault(require("../../../database/repository/OrderRepo"));
var ProductRepo_1 = __importDefault(require("../../../database/repository/admin/ProductRepo"));
//let moment = require('moment');
var moment_1 = __importDefault(require("moment"));
var EmployeeRepo_1 = __importDefault(require("../../../database/repository/admin/EmployeeRepo"));
var utils_1 = require("../../../function/utils");
var UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
var router = express_1.default.Router();
router.post('/statistics', (0, validator_1.default)(schema_1.default.option, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var option, now, currentDate, userId, user, orderType, storeId, getBy, orderBy, spanDays, spanOf, previousSpanDays, recentOrders, deliveredOrders, itemsOutOfStock, sales, avgSales, ordersGraphData, previousSales, employees, employeesGraphData, previousSpanEmployees, avgOrders, previousAvgOrders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                option = req.body.option;
                now = (0, moment_1.default)();
                currentDate = now.format('YYYY-MM-DD');
                userId = req.userId;
                return [4 /*yield*/, EmployeeRepo_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                orderType = user && user[0].storeId === 1 ? 24 : 20;
                storeId = user[0].storeId;
                getBy = (0, utils_1.getDataBy)(option);
                orderBy = (0, utils_1.orderDataBy)(option);
                spanDays = (0, moment_1.default)();
                spanOf = spanDays.subtract(option, 'days').format('YYYY-MM-DD');
                previousSpanDays = spanDays.subtract(option, 'days').format('YYYY-MM-DD');
                return [4 /*yield*/, OrderRepo_1.default.recentOrders(currentDate, spanOf)];
            case 2:
                recentOrders = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.deliveredOrders(currentDate, spanOf)];
            case 3:
                deliveredOrders = _a.sent();
                return [4 /*yield*/, ProductRepo_1.default.itemsOutOfStock(currentDate, spanOf)];
            case 4:
                itemsOutOfStock = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.sales(currentDate, spanOf, orderType)];
            case 5:
                sales = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.avgSales(currentDate, spanOf, orderType)];
            case 6:
                avgSales = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.graphData(currentDate, spanOf, orderType, getBy, orderBy)];
            case 7:
                ordersGraphData = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.salesPreviousSpan(spanOf, previousSpanDays, orderType)];
            case 8:
                previousSales = _a.sent();
                return [4 /*yield*/, UserRepo_1.default.newUsers(spanOf, currentDate)];
            case 9:
                employees = _a.sent();
                return [4 /*yield*/, UserRepo_1.default.graphData(spanOf, currentDate, getBy)];
            case 10:
                employeesGraphData = _a.sent();
                return [4 /*yield*/, UserRepo_1.default.previousSpanUsers(previousSpanDays, spanOf)];
            case 11:
                previousSpanEmployees = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.avgOrders(spanOf, currentDate, orderType)];
            case 12:
                avgOrders = _a.sent();
                return [4 /*yield*/, OrderRepo_1.default.previousAvgOrders(previousSpanDays, spanOf, orderType)];
            case 13:
                previousAvgOrders = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('', {
                        sales: { sales: sales, avgSales: avgSales, previousSales: previousSales },
                        employees: { employees: employees, previousSpanEmployees: previousSpanEmployees, employeesGraphData: employeesGraphData },
                        orders: { avgOrders: avgOrders, previousAvgOrders: previousAvgOrders, ordersGraphData: ordersGraphData },
                        RecentOrder: recentOrders,
                        DeliveredOrders: deliveredOrders,
                        ItemsOutOfStock: itemsOutOfStock,
                    }).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=dashborad.js.map