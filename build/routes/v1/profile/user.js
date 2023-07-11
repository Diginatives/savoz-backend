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
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var constants_1 = __importDefault(require("../../../constants/constants"));
var user_responses_1 = require("../../../custom/user-responses");
var bcrypt_1 = __importDefault(require("bcrypt"));
var KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
var roles_1 = __importDefault(require("../../../constants/roles"));
var userConstants_1 = __importDefault(require("../../../constants/userConstants"));
var utils_1 = require("../../../function/utils");
var fs = require('fs');
var router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.get('/my', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                user = _c.sent();
                if (!user || user.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'success'];
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
            case 2: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
//Upload profile without base64
router.post('/upload_file', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.FILE), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, imageFile, userExist, e_1, avatarData, user, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                imageName = req['files'];
                if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                imageFile = imageName[0].filename;
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                userExist = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 5, , 6]);
                if (!(userExist[0].avatar && imageFile)) return [3 /*break*/, 4];
                return [4 /*yield*/, fs.unlinkSync("".concat(constants_1.default.dirImage).concat(userExist[0].avatar))];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                console.log(e_1);
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, UserRepo_1.default.uploadAvatar(userExist[0].id, imageFile)];
            case 7:
                avatarData = _c.sent();
                if (!avatarData || avatarData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 8:
                user = _c.sent();
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'File successfully uploaded'];
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
            case 9: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
//
router.post('/update', (0, validator_1.default)(schema_1.default.profile, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, firstName, lastName, phone, email, address, dob, userLat, userLng, checkUser, checkEmailExist, add, lat, lng, dateOfBirth, profileData, data, userData, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, title = _a.title, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, email = _a.email, address = _a.address, dob = _a.dob, userLat = _a.userLat, userLng = _a.userLng;
                if (req['userId'] === userConstants_1.default.GUEST_INFO.guestId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse("Guest can't update profile").send(res)];
                }
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                checkUser = _d.sent();
                if (!checkUser || checkUser.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                if (!(email !== checkUser[0].email)) return [3 /*break*/, 3];
                return [4 /*yield*/, UserRepo_1.default.findByEmail(email)];
            case 2:
                checkEmailExist = _d.sent();
                if (checkEmailExist && checkEmailExist.length > 0) {
                    throw new ApiResponse_1.BadRequestResponse('Email already registered').send(res);
                }
                _d.label = 3;
            case 3:
                add = address ? address : checkUser[0].address;
                lat = userLat ? userLat : checkUser[0].userLat;
                lng = userLng ? userLng : checkUser[0].userLng;
                dateOfBirth = dob ? dob : checkUser[0].dob;
                profileData = [title, firstName, lastName, email, phone, add, dateOfBirth, lat, lng];
                return [4 /*yield*/, UserRepo_1.default.updateProfile(req['userId'], profileData)];
            case 4:
                data = _d.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 5:
                userData = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Profile successfully updated'];
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(userData[0])];
            case 6: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
router.post('/update_password', (0, validator_1.default)(schema_1.default.updatePassword, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oldPassword, newPassword, checkUser, checkOldPassword, salt, hashed, userData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (req['userId'] === userConstants_1.default.GUEST_INFO.guestId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse("Guest can't update password").send(res)];
                }
                oldPassword = req.body.oldPassword;
                newPassword = req.body.newPassword;
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 1:
                checkUser = _c.sent();
                return [4 /*yield*/, bcrypt_1.default.compare(oldPassword, checkUser[0].password)];
            case 2:
                checkOldPassword = _c.sent();
                if (!checkOldPassword)
                    throw new ApiResponse_1.NotFoundResponse('Invalid old password').send(res);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _c.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(newPassword, salt)];
            case 4:
                hashed = _c.sent();
                return [4 /*yield*/, UserRepo_1.default.updatePassword(checkUser[0].id, hashed)];
            case 5:
                userData = _c.sent();
                if (userData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'Password changed successfully'];
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(checkUser[0])];
            case 6: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
router.delete('/delete', (0, validator_1.default)(schema_1.default.deleteProfile, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, roleId, checkUser, userData, keyStoreData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (req['userId'] === userConstants_1.default.GUEST_INFO.guestId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse("Guest can't delete profile").send(res)];
                }
                _a = req.body, userId = _a.userId, roleId = _a.roleId;
                if (userId !== req['userId'] || roleId !== req['roleId']) {
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                }
                return [4 /*yield*/, UserRepo_1.default.findByIdAndRoleId(userId, roleId)];
            case 1:
                checkUser = _b.sent();
                if (!checkUser || checkUser.length <= 0)
                    throw new ApiResponse_1.NotFoundResponse('User not found').send(res);
                return [4 /*yield*/, UserRepo_1.default.deleteProfile(userId, userConstants_1.default.ACTIVE_STATUS.ISACTIVEFALSE)];
            case 2:
                userData = _b.sent();
                if (userData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, KeystoreRepo_1.default.removeByClient(userId, roles_1.default.USER)];
            case 3:
                keyStoreData = _b.sent();
                if (keyStoreData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('User deleted successfully', {}).send(res)];
        }
    });
}); }));
//upload profile with base64
router.post('/upload_profile', (0, validator_1.default)(schema_1.default.profilePic, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, image, imageName, base64Data, fileType, uploadedFilename, userExist, dateVal, imageWithExt, e_2, avatarData, user, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, image = _a.image, imageName = _a.imageName;
                if (req['userId'] === userConstants_1.default.GUEST_INFO.guestId) {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse("Guest can't upload profile").send(res)];
                }
                base64Data = image.replace(/^data:image\/(jpeg|png|jpg);base64,/, '');
                return [4 /*yield*/, (0, utils_1.base64FileHeaderMapper)(base64Data)];
            case 1:
                fileType = _d.sent();
                if (fileType !== 'JPG' && fileType !== 'PNG' && fileType !== 'JPEG') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                uploadedFilename = '';
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 2:
                userExist = _d.sent();
                dateVal = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 10000000);
                uploadedFilename = dateVal + '-' + imageName;
                imageWithExt = "".concat(uploadedFilename, ".").concat(fileType);
                _d.label = 3;
            case 3:
                _d.trys.push([3, 6, , 7]);
                if (!(userExist[0].avatar && imageWithExt)) return [3 /*break*/, 5];
                return [4 /*yield*/, fs.unlinkSync("".concat(constants_1.default.dirImage).concat(userExist[0].avatar))];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_2 = _d.sent();
                console.log('error while unlink profile picture', e_2);
                return [3 /*break*/, 7];
            case 7: return [4 /*yield*/, fs.writeFile("".concat(constants_1.default.dirImage).concat(imageWithExt), base64Data, 'base64', function (err) {
                    if (err)
                        throw new ApiResponse_1.BadRequestResponse('profile pictire not uploaded');
                })];
            case 8:
                _d.sent();
                return [4 /*yield*/, UserRepo_1.default.uploadAvatar(userExist[0].id, "".concat(imageWithExt))];
            case 9:
                avatarData = _d.sent();
                if (!avatarData || avatarData.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, UserRepo_1.default.findById(req['userId'])];
            case 10:
                user = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Profile Picture successfully uploaded'];
                return [4 /*yield*/, (0, user_responses_1.customUserResponse)(user[0])];
            case 11: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=user.js.map