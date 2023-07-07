"use strict";
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
var User_1 = require("../model/User");
var KeystoreRepo_1 = __importDefault(require("./KeystoreRepo"));
var index_1 = require("../index");
var roles_1 = __importDefault(require("../../constants/roles"));
var UserRepo = /** @class */ (function () {
    function UserRepo() {
    }
    // contains critical information of the user
    UserRepo.findById = function (id) {
        return (0, index_1.executeQuery)("Select * from ".concat(User_1.USER_TABLE_NAME, " where id=").concat(id));
    };
    UserRepo.findByIdAndRoleId = function (id, roleId) {
        return (0, index_1.executeQuery)("Select * from ".concat(User_1.USER_TABLE_NAME, " where id=").concat(id, " and roleId=").concat(roleId));
    };
    UserRepo.findByEmail = function (email) {
        return (0, index_1.executeQuery)("Select * from ".concat(User_1.USER_TABLE_NAME, " where email='").concat(email, "' ORDER BY ").concat(User_1.USER_TABLE_COL.isActive, " DESC"));
    };
    UserRepo.updatePassword = function (id, password) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set password=? where id=").concat(id), [password]);
    };
    UserRepo.uploadAvatar = function (id, fileName) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set avatar=? where id=").concat(id), [fileName]);
    };
    UserRepo.updateProfile = function (id, profileData) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set title=?,firstName=?,lastName=?,email=?,phone=?,address=?,dob=?,userLat=?,userLng=? where id=").concat(id), profileData);
    };
    UserRepo.updateStripeIdAndCardId = function (id, cardData) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set stripeId=?,cardId=? where id=").concat(id), cardData);
    };
    UserRepo.updateDefaultCard = function (userId, cardId) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set cardId=? where id=").concat(userId), [cardId]);
    };
    UserRepo.deleteProfile = function (userId, isDelete) {
        return (0, index_1.updateRecord)("update ".concat(User_1.USER_TABLE_NAME, " set isActive=? where id=").concat(userId), isDelete);
    };
    UserRepo.newUsers = function (spanOf, currentDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) AS newEmployees FROM ".concat(User_1.USER_TABLE_NAME, " WHERE ").concat(User_1.USER_TABLE_COL.createdAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00'"))];
            });
        });
    };
    UserRepo.graphData = function (spanOf, currentDate, getDataBy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT ".concat(getDataBy, "(").concat(User_1.USER_TABLE_COL.createdAt, ") AS period, COUNT(*) AS total FROM ").concat(User_1.USER_TABLE_NAME, " WHERE date(").concat(User_1.USER_TABLE_COL.createdAt, ") BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00' GROUP BY period"))];
            });
        });
    };
    UserRepo.previousSpanUsers = function (previousSpanDays, spanOf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) AS previouseEmployees FROM ".concat(User_1.USER_TABLE_NAME, " WHERE ").concat(User_1.USER_TABLE_COL.createdAt, " BETWEEN '").concat(previousSpanDays, " 00:00:00' AND '").concat(spanOf, " 00:00:00'"))];
            });
        });
    };
    UserRepo.create = function (user, accessTokenKey, refreshTokenKey, roleCode) {
        return __awaiter(this, void 0, void 0, function () {
            var now, res, keystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, (0, index_1.insertRecord)('users', {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                password: user.password,
                                title: user.title,
                                phone: user.phone,
                                roleId: roleCode,
                                isActive: user.isActive,
                                createdAt: now,
                                updatedAt: now,
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, KeystoreRepo_1.default.create(res.id, roles_1.default.USER, accessTokenKey, refreshTokenKey)];
                    case 2:
                        keystore = _a.sent();
                        return [2 /*return*/, { user: res, keystore: keystore }];
                }
            });
        });
    };
    return UserRepo;
}());
exports.default = UserRepo;
//# sourceMappingURL=UserRepo.js.map