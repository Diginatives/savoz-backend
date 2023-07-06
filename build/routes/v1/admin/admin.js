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
var ApiResponse_1 = require("../../../core/ApiResponse");
var crypto_1 = __importDefault(require("crypto"));
var authUtils_1 = require("../../../auth/authUtils");
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var ForgotPasswordRepo_1 = __importDefault(require("../../../database/repository/ForgotPasswordRepo"));
var sg_emails_1 = require("../../../function/sg-emails");
var utils_1 = require("../../../function/utils");
var KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
var EmployeeRepo_1 = __importDefault(require("../../../database/repository/admin/EmployeeRepo"));
var employee_responses_1 = require("../../../custom/employee-responses");
var roles_1 = __importDefault(require("../../../constants/roles"));
var OrderRepo_1 = __importDefault(require("../../../database/repository/OrderRepo"));
var order_responses_1 = require("../../../custom/order-responses");
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var router = express_1.default.Router();
router.post('/login', (0, validator_1.default)(schema_1.default.userCredential, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employee, match, accessTokenKey, refreshTokenKey, tokens, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, EmployeeRepo_1.default.findByEmail(req.body.email)];
            case 1:
                employee = _d.sent();
                if (employee.length === 0 || !employee)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                if (!employee[0].password)
                    throw new ApiResponse_1.AuthFailureResponse('Credential not set').send(res);
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, employee[0].password)];
            case 2:
                match = _d.sent();
                if (!match)
                    throw new ApiResponse_1.AuthFailureResponse('Authentication failure').send(res);
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, KeystoreRepo_1.default.create(employee[0].id, roles_1.default.EMPLOYEE, accessTokenKey, refreshTokenKey)];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, authUtils_1.createTokens)(employee[0].id, roles_1.default.EMPLOYEE, accessTokenKey, refreshTokenKey)];
            case 4:
                tokens = _d.sent();
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'Login Successfully'];
                _c = {};
                return [4 /*yield*/, (0, employee_responses_1.customEmployeeResponse)(employee[0])];
            case 5:
                new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([(_c.employee = _d.sent(),
                        _c.tokens = tokens,
                        _c)])))().send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/reset_password', (0, validator_1.default)(schema_1.default.reset_password, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employee, token, resetToken, hash, forgotPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, EmployeeRepo_1.default.findByEmail(req.body.email)];
            case 1:
                employee = _a.sent();
                if (employee.length === 0 || !employee)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByUserId(employee[0].id, roles_1.default.EMPLOYEE)];
            case 2:
                token = _a.sent();
                if (!(token && token.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ForgotPasswordRepo_1.default.deleteToken(token[0].id, roles_1.default.EMPLOYEE)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                resetToken = crypto_1.default.randomBytes(32).toString('hex');
                return [4 /*yield*/, crypto_1.default.createHash('sha256').update(resetToken).digest('hex')];
            case 5:
                hash = _a.sent();
                return [4 /*yield*/, ForgotPasswordRepo_1.default.create(employee[0].id, roles_1.default.EMPLOYEE, hash)];
            case 6:
                forgotPassword = (_a.sent()).forgotPassword;
                return [4 /*yield*/, (0, sg_emails_1.sendEmail)(employee[0].email, '', 'Reset Password', sg_emails_1.RESET_PASSWORD_TEMPLATE, (0, utils_1.addBaseURLWeb)("resetlink/".concat(forgotPassword.token, "/").concat(forgotPassword.id)))];
            case 7:
                _a.sent();
                new ApiResponse_1.SuccessResponse('An email has been sent to your email address to reset the password. Please check your email address.', { email: 'ok' }).send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/validate_reset_token', (0, validator_1.default)(schema_1.default.validate_reset_token, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, tokenData, match;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, token = _a.token;
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByToken(token, roles_1.default.EMPLOYEE)];
            case 1:
                tokenData = _b.sent();
                if (!tokenData || tokenData.length === 0) {
                    throw new ApiResponse_1.BadRequestResponse('Invalid Token and Id').send(res);
                }
                match = ForgotPasswordRepo_1.default.findById(id, roles_1.default.EMPLOYEE);
                if (!match)
                    throw new ApiResponse_1.BadRequestResponse('Invalid Token and Id').send(res);
                new ApiResponse_1.SuccessResponse('Successfully Validate', {
                    userId: tokenData[0].userId,
                    token: tokenData[0].token,
                }).send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/new_password', (0, validator_1.default)(schema_1.default.new_password, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, token, userId, employee, tokenData, salt, hashed, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, token = _a.token, userId = _a.userId;
                return [4 /*yield*/, EmployeeRepo_1.default.findById(userId)];
            case 1:
                employee = _b.sent();
                if (employee.length === 0 || !employee)
                    throw new ApiResponse_1.NotFoundResponse('User Not Found').send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByUserId(userId, roles_1.default.EMPLOYEE)];
            case 2:
                tokenData = _b.sent();
                if (!tokenData || tokenData.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Invalid Token').send(res);
                if (token !== tokenData[0].token)
                    throw new ApiResponse_1.BadRequestResponse('Invalid Token').send(res);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                hashed = _b.sent();
                return [4 /*yield*/, EmployeeRepo_1.default.updatePassword(employee[0].id, hashed)];
            case 5:
                data = _b.sent();
                if (!data || data.affectedRows === 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.deleteToken(tokenData[0].id, roles_1.default.EMPLOYEE)];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, sg_emails_1.sendEmail)(employee[0].email, '', 'Password Changed', sg_emails_1.RESET_PASSWORD_CONFIRM_TEMPLATE, (0, utils_1.addBaseURLWeb)('admin/login'))];
            case 7:
                _b.sent();
                new ApiResponse_1.SuccessResponse('Password Reset Successfully', { email: employee[0].email }).send(res);
                return [2 /*return*/];
        }
    });
}); }));
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
//Order's API's
router.post('/all_orders', (0, validator_1.default)(schema_1.default.orderList, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, offSet, _a, orderType, searchText, countData, orders, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                page = parseInt(req.body.page) || 1;
                limit = parseInt(req.body.limit) || 10;
                offSet = page > 1 ? (page - 1) * limit : 0;
                _a = req.body, orderType = _a.orderType, searchText = _a.searchText;
                return [4 /*yield*/, OrderRepo_1.default.countAllOrder(orderType, searchText ? searchText : '')];
            case 1:
                countData = _e.sent();
                return [4 /*yield*/, OrderRepo_1.default.getAllOrders(orderType, searchText ? searchText : '', limit, offSet)];
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
router.post('/assign_rider', (0, validator_1.default)(schema_1.default.assingRider, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderId, riderName, date, time, orderStatus, order, riderAssignData, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, orderId = _a.orderId, riderName = _a.riderName, date = _a.date, time = _a.time, orderStatus = _a.orderStatus;
                return [4 /*yield*/, OrderRepo_1.default.findByOrderId(orderId)];
            case 1:
                order = _b.sent();
                if (!order || order.length <= 0)
                    throw new ApiResponse_1.BadRequestResponse('Invalid Order Id').send(res);
                riderAssignData = [riderName, date.toString(), time, orderStatus];
                return [4 /*yield*/, OrderRepo_1.default.assignRider(orderId, riderAssignData)];
            case 2:
                data = _b.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, OrderRepo_1.default.findByOrderId(orderId)];
            case 3:
                order = _b.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Rider assigned successfully', order).send(res)];
        }
    });
}); }));
router.delete('/order', (0, validator_1.default)(schema_1.default.deleteOrder, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.body.orderId;
                return [4 /*yield*/, OrderRepo_1.default.findByOrderId(orderId)];
            case 1:
                order = _a.sent();
                if (!order || order.length <= 0)
                    throw new ApiResponse_1.BadRequestResponse('Invalid Order Id').send(res);
                return [4 /*yield*/, OrderRepo_1.default.deleteOrdeer(orderId)];
            case 2:
                data = _a.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Order successfully Deleted', 'deleted').send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=admin.js.map