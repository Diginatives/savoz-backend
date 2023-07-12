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
var UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
var JWT_1 = __importDefault(require("../../../core/JWT"));
var KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
var crypto_1 = __importDefault(require("crypto"));
var authUtils_1 = require("../../../auth/authUtils");
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var roles_1 = __importDefault(require("../../../constants/roles"));
var EmployeeRepo_1 = __importDefault(require("../../../database/repository/admin/EmployeeRepo"));
var router = express_1.default.Router();
router.post('/refresh', (0, validator_1.default)(schema_1.default.auth, validator_1.ValidationSource.HEADER), (0, validator_1.default)(schema_1.default.refreshToken), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessTokenPayload, user, type, refreshTokenPayload, keystore, accessTokenKey, refreshTokenKey, tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.accessToken = (0, authUtils_1.getAccessToken)(req.headers.authorization); // Express headers are auto converted to lowercase
                return [4 /*yield*/, JWT_1.default.decode(req.accessToken)];
            case 1:
                accessTokenPayload = _a.sent();
                (0, authUtils_1.validateTokenData)(accessTokenPayload);
                if (!(accessTokenPayload.ct === roles_1.default.USER)) return [3 /*break*/, 3];
                return [4 /*yield*/, UserRepo_1.default.findById(accessTokenPayload.sub)];
            case 2:
                user = _a.sent();
                type = roles_1.default.USER;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, EmployeeRepo_1.default.findById(accessTokenPayload.sub)];
            case 4:
                user = _a.sent();
                type = roles_1.default.EMPLOYEE;
                _a.label = 5;
            case 5:
                if (!user || user.length === 0)
                    throw new ApiResponse_1.AuthFailureResponse('User not registered').send(res);
                user = user[0];
                req.userId = user.id;
                req.roleId = user.roleId;
                return [4 /*yield*/, JWT_1.default.validate(req.body.refreshToken)];
            case 6:
                refreshTokenPayload = _a.sent();
                (0, authUtils_1.validateTokenData)(refreshTokenPayload);
                if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
                    throw new ApiResponse_1.AuthFailureResponse('Invalid access token').send(res);
                }
                return [4 /*yield*/, KeystoreRepo_1.default.find(req.userId, type, accessTokenPayload.prm, refreshTokenPayload.prm)];
            case 7:
                keystore = _a.sent();
                if (!keystore)
                    throw new ApiResponse_1.AuthFailureResponse('Invalid access token').send(res);
                return [4 /*yield*/, KeystoreRepo_1.default.remove(keystore.id, type)];
            case 8:
                _a.sent();
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, KeystoreRepo_1.default.create(req.userId, type, accessTokenKey, refreshTokenKey)];
            case 9:
                _a.sent();
                return [4 /*yield*/, (0, authUtils_1.createTokens)(user.id, type, accessTokenKey, refreshTokenKey)];
            case 10:
                tokens = _a.sent();
                new ApiResponse_1.TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=token.js.map