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
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var EmployeeRepo_1 = __importDefault(require("../../../database/repository/admin/EmployeeRepo"));
var constants_1 = __importDefault(require("../../../constants/constants"));
var employee_responses_1 = require("../../../custom/employee-responses");
var fs = require('fs');
var router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/upload_profile', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.FILE), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, imageFile, dashboardUserExists, e_1, avatarData, dashboardUser, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                imageName = req['files'];
                if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                imageFile = imageName[0].filename;
                return [4 /*yield*/, EmployeeRepo_1.default.findById(req['userId'])];
            case 1:
                dashboardUserExists = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 5, , 6]);
                if (!(dashboardUserExists[0].profileImage && imageFile)) return [3 /*break*/, 4];
                return [4 /*yield*/, fs.unlinkSync("".concat(constants_1.default.dirAdminUsers).concat(dashboardUserExists[0].profileImage))];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                console.log(e_1);
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, EmployeeRepo_1.default.uploadAvatar(dashboardUserExists[0].id, imageFile)];
            case 7:
                avatarData = _c.sent();
                if (!avatarData || avatarData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, EmployeeRepo_1.default.findById(req['userId'])];
            case 8:
                dashboardUser = _c.sent();
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'File successfully uploaded'];
                return [4 /*yield*/, (0, employee_responses_1.customEmployeeResponse)(dashboardUser[0])];
            case 9: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
router.post('/update_profile', (0, validator_1.default)(schema_1.default.profile, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, firstName, lastName, phone, email, checkUser, checkEmailExist, profileData, data, dashboardUser, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, title = _a.title, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, email = _a.email;
                return [4 /*yield*/, EmployeeRepo_1.default.findById(req['userId'])];
            case 1:
                checkUser = _d.sent();
                if (!checkUser || checkUser.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                if (!(email !== checkUser[0].email)) return [3 /*break*/, 3];
                return [4 /*yield*/, EmployeeRepo_1.default.findByEmail(email)];
            case 2:
                checkEmailExist = _d.sent();
                if (checkEmailExist && checkEmailExist.length > 0) {
                    throw new ApiResponse_1.BadRequestResponse('Email already registered').send(res);
                }
                _d.label = 3;
            case 3:
                profileData = [title, firstName, lastName, email, phone];
                return [4 /*yield*/, EmployeeRepo_1.default.updateProfile(req['userId'], profileData)];
            case 4:
                data = _d.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, EmployeeRepo_1.default.findById(req['userId'])];
            case 5:
                dashboardUser = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Profile successfully updated'];
                return [4 /*yield*/, (0, employee_responses_1.customEmployeeResponse)(dashboardUser[0])];
            case 6: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=adminProfile.js.map