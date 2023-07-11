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
var UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
var authUtils_1 = require("../../../auth/authUtils");
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var ForgotPasswordRepo_1 = __importDefault(require("../../../database/repository/ForgotPasswordRepo"));
var sg_emails_1 = require("../../../function/sg-emails");
var utils_1 = require("../../../function/utils");
var KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
var roles_1 = __importDefault(require("../../../constants/roles"));
var user_responses_1 = require("../../../custom/user-responses");
var userConstants_1 = __importDefault(require("../../../constants/userConstants"));
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var payment_1 = __importDefault(require("../../../function/payment"));
var payment_card_respones_1 = require("../../../custom/payment-card-respones");
var SettingsRepo_1 = __importDefault(require("../../../database/repository/SettingsRepo"));
var router = express_1.default.Router();
router.post('/signup', (0, validator_1.default)(schema_1.default.signup, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessTokenKey, refreshTokenKey, salt, passwordHash, _a, createdUser, keystore, tokens, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findByEmail(req.body.email)];
            case 1:
                user = _e.sent();
                if (user.length > 0 &&
                    user[0].email &&
                    user[0].isActive == userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE) {
                    throw new ApiResponse_1.NotFoundResponse('Email already registered').send(res);
                }
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _e.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 3:
                passwordHash = _e.sent();
                return [4 /*yield*/, UserRepo_1.default.create({
                        email: req.body.email,
                        title: req.body.title,
                        password: passwordHash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phone: req.body.phone,
                        isActive: userConstants_1.default.ACTIVE_STATUS.ISACTIVETRUE,
                    }, accessTokenKey, refreshTokenKey, roles_1.default.USERID)];
            case 4:
                _a = _e.sent(), createdUser = _a.user, keystore = _a.keystore;
                return [4 /*yield*/, (0, authUtils_1.createTokens)(createdUser.id, roles_1.default.USER, keystore.primaryKey, keystore.secondaryKey)];
            case 5:
                tokens = _e.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'User Register Successfully'];
                _d = {};
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(createdUser)];
            case 6:
                new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([(_d.user = _e.sent(),
                        _d.tokens = tokens,
                        _d)])))().send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/login', (0, validator_1.default)(schema_1.default.userCredential, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, match, accessTokenKey, refreshTokenKey, tokens, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findByEmail(req.body.email)];
            case 1:
                user = _d.sent();
                if (user.length === 0 || !user || !user[0].isActive) {
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                }
                if (!user[0].password)
                    throw new ApiResponse_1.NotFoundResponse('Credential not set').send(res);
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user[0].password)];
            case 2:
                match = _d.sent();
                if (!match)
                    throw new ApiResponse_1.AuthFailureResponse('Password is incorrect').send(res);
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, KeystoreRepo_1.default.create(user[0].id, roles_1.default.USER, accessTokenKey, refreshTokenKey)];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, authUtils_1.createTokens)(user[0].id, roles_1.default.USER, accessTokenKey, refreshTokenKey)];
            case 4:
                tokens = _d.sent();
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'Login Successfully'];
                _c = {};
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
            case 5:
                new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([(_c.user = _d.sent(),
                        _c.tokens = tokens,
                        _c)])))().send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/reset_password', (0, validator_1.default)(schema_1.default.reset_password, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, resetToken, hash, forgotPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findByEmail(req.body.email)];
            case 1:
                user = _a.sent();
                if (user.length === 0 || !user)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByUserId(user[0].id, roles_1.default.USER)];
            case 2:
                token = _a.sent();
                if (!(token && token.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ForgotPasswordRepo_1.default.deleteToken(token[0].id, roles_1.default.USER)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                resetToken = crypto_1.default.randomBytes(32).toString('hex');
                return [4 /*yield*/, crypto_1.default.createHash('sha256').update(resetToken).digest('hex')];
            case 5:
                hash = _a.sent();
                return [4 /*yield*/, ForgotPasswordRepo_1.default.create(user[0].id, roles_1.default.USER, hash)];
            case 6:
                forgotPassword = (_a.sent()).forgotPassword;
                if (!forgotPassword.id || !forgotPassword.token) {
                    throw new ApiResponse_1.BadRequestResponse('Something went wrong. Please again reset password').send(res);
                }
                return [4 /*yield*/, (0, sg_emails_1.sendEmail)(user[0].email, '', 'Reset Password', sg_emails_1.RESET_PASSWORD_TEMPLATE, (0, utils_1.getHomeUrl)("verify/".concat(forgotPassword.token, "/").concat(forgotPassword.id)))];
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
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByToken(token, roles_1.default.USER)];
            case 1:
                tokenData = _b.sent();
                if (!tokenData || tokenData.length === 0) {
                    throw new ApiResponse_1.BadRequestResponse('Link has been expired').send(res);
                }
                match = ForgotPasswordRepo_1.default.findById(id, roles_1.default.USER);
                if (!match || match.length <= 0)
                    throw new ApiResponse_1.BadRequestResponse('Link has been expired').send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Successfully Validate', {
                        userId: tokenData[0].userId,
                        token: tokenData[0].token,
                    }).send(res)];
        }
    });
}); }));
router.post('/new_password', (0, validator_1.default)(schema_1.default.new_password, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, token, userId, user, tokenData, salt, hashed, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, token = _a.token, userId = _a.userId;
                return [4 /*yield*/, UserRepo_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (user.length === 0 || !user)
                    throw new ApiResponse_1.NotFoundResponse('User Not Found').send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.findByUserId(userId, roles_1.default.USER)];
            case 2:
                tokenData = _b.sent();
                if (!tokenData || tokenData.length === 0) {
                    throw new ApiResponse_1.BadRequestResponse('Link has been expired').send(res);
                }
                if (token !== tokenData[0].token)
                    throw new ApiResponse_1.BadRequestResponse('Link has been expired').send(res);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                hashed = _b.sent();
                return [4 /*yield*/, UserRepo_1.default.updatePassword(user[0].id, hashed)];
            case 5:
                data = _b.sent();
                if (!data || data.affectedRows === 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, ForgotPasswordRepo_1.default.deleteToken(tokenData[0].id, roles_1.default.USER)];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, sg_emails_1.sendEmail)(user[0].email, '', 'Password Changed', sg_emails_1.RESET_PASSWORD_CONFIRM_TEMPLATE, (0, utils_1.addBaseURLApp)('auth/login'))];
            case 7:
                _b.sent();
                new ApiResponse_1.SuccessResponse('Password Reset Successfully', { email: user[0].email }).send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/guest_login', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, match, accessTokenKey, refreshTokenKey, tokens, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findByEmail('guest@yopmail.com')];
            case 1:
                user = _d.sent();
                if (user.length === 0 || !user)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                return [4 /*yield*/, bcrypt_1.default.compare('123456', user[0].password)];
            case 2:
                match = _d.sent();
                if (!match)
                    throw new ApiResponse_1.AuthFailureResponse('Authentication failure').send(res);
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, KeystoreRepo_1.default.create(user[0].id, roles_1.default.USER, accessTokenKey, refreshTokenKey)];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, authUtils_1.createTokens)(user[0].id, roles_1.default.USER, accessTokenKey, refreshTokenKey)];
            case 4:
                tokens = _d.sent();
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'Guest Login Successfully'];
                _c = {};
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
            case 5:
                new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([(_c.user = _d.sent(),
                        _c.tokens = tokens,
                        _c)])))().send(res);
                return [2 /*return*/];
        }
    });
}); }));
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
//Setting API
router.get('/settings', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, SettingsRepo_1.default.getSettings()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', data[0]).send(res)];
        }
    });
}); }));
//Stripe API's
//create payment method
router.get('/create_payment_method', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, payment_1.default.createPaymentMethod()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', data).send(res)];
        }
    });
}); }));
//
router.post('/save_card', (0, validator_1.default)(schema_1.default.saveCard, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, stripeId, cardData, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                user = _a.sent();
                stripeId = user[0].stripeId;
                if (!!stripeId) return [3 /*break*/, 3];
                return [4 /*yield*/, payment_1.default.createCustomer(user[0])];
            case 2:
                stripeId = _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, payment_1.default.attachCard(id, stripeId)];
            case 4:
                _a.sent();
                cardData = [stripeId, id];
                return [4 /*yield*/, UserRepo_1.default.updateStripeIdAndCardId(user[0].id, cardData)];
            case 5:
                userData = _a.sent();
                if (userData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Card data successfully saved', true).send(res)];
        }
    });
}); }));
router.delete('/delete_card', (0, validator_1.default)(schema_1.default.deleteCard, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cardId, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardId = req.body.cardId;
                return [4 /*yield*/, payment_1.default.detachCard(cardId)];
            case 1:
                response = _a.sent();
                if (!response)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Card delete successfully', true).send(res)];
        }
    });
}); }));
router.get('/cards_data', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, cardData, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                user = _d.sent();
                if (!user[0].stripeId) return [3 /*break*/, 3];
                return [4 /*yield*/, payment_1.default.getAllCardData(user[0].stripeId)];
            case 2:
                _a = _d.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = null;
                _d.label = 4;
            case 4:
                cardData = _a;
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'success'];
                return [4 /*yield*/, (0, payment_card_respones_1.customCardCollectionResponse)(cardData ? cardData.data : [])];
            case 5: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
router.post('/default_card', (0, validator_1.default)(schema_1.default.defaultCard, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cardId, userId, checkUser, data, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardId = req.body.cardId;
                userId = req['userId'];
                return [4 /*yield*/, UserRepo_1.default.findById(userId)];
            case 1:
                checkUser = _a.sent();
                if (!checkUser || checkUser.length <= 0)
                    throw new ApiResponse_1.NotFoundResponse('User not found');
                return [4 /*yield*/, UserRepo_1.default.updateDefaultCard(userId, cardId)];
            case 2:
                data = _a.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, UserRepo_1.default.findById(userId)];
            case 3:
                user = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Default card set successfully', user[0]).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=auth.js.map