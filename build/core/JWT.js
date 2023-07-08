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
exports.JwtPayload = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var util_1 = require("util");
var jsonwebtoken_1 = require("jsonwebtoken");
var ApiError_1 = require("./ApiError");
var Logger_1 = __importDefault(require("./Logger"));
/*
 * issuer 		— Software organization who issues the token.
 * subject 		— Intended user of the token.
 * audience 	— Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm 	— Encryption algorithm to be used to protect the token.
 */
var JWT = /** @class */ (function () {
    function JWT() {
    }
    JWT.readPublicKey = function () {
        return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/public.pem'), 'utf8');
    };
    JWT.readPrivateKey = function () {
        return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/private.pem'), 'utf8');
    };
    JWT.encode = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var cert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readPrivateKey()];
                    case 1:
                        cert = _a.sent();
                        if (!cert)
                            throw new ApiError_1.InternalError('Token generation failure');
                        // @ts-ignore
                        return [2 /*return*/, (0, util_1.promisify)(jsonwebtoken_1.sign)(__assign({}, payload), cert, { algorithm: 'RS256' })];
                }
            });
        });
    };
    /**
     * This method checks the token and returns the decoded data when token is valid in all respect
     */
    JWT.validate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var cert, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readPublicKey()];
                    case 1:
                        cert = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, util_1.promisify)(jsonwebtoken_1.verify)(token, cert, { algorithms: ['RS256'] })];
                    case 3: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                    case 4:
                        e_1 = _a.sent();
                        Logger_1.default.debug(e_1);
                        if (e_1 && e_1.name === 'TokenExpiredError')
                            throw new ApiError_1.TokenExpiredError();
                        // throws error if the token has not been encrypted by the private key
                        throw new ApiError_1.BadTokenError();
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the decoded payload if the signature is valid even if it is expired
     */
    JWT.decode = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var cert, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readPublicKey()];
                    case 1:
                        cert = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, util_1.promisify)(jsonwebtoken_1.verify)(token, cert, { ignoreExpiration: true })];
                    case 3: 
                    // @ts-ignore
                    return [2 /*return*/, (_a.sent())];
                    case 4:
                        e_2 = _a.sent();
                        Logger_1.default.debug(e_2);
                        throw new ApiError_1.BadTokenError();
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return JWT;
}());
exports.default = JWT;
var JwtPayload = /** @class */ (function () {
    function JwtPayload(issuer, audience, subject, clientType, param, validity) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.ct = clientType;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
        this.prm = param;
    }
    return JwtPayload;
}());
exports.JwtPayload = JwtPayload;
//# sourceMappingURL=JWT.js.map