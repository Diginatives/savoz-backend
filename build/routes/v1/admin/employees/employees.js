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
var ApiResponse_1 = require("../../../../core/ApiResponse");
var crypto_1 = __importDefault(require("crypto"));
var validator_1 = __importStar(require("../../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var asyncHandler_1 = __importDefault(require("../../../../helpers/asyncHandler"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var lodash_1 = __importDefault(require("lodash"));
var AdminUserRepo_1 = __importDefault(require("../../../../database/repository/admin/AdminUserRepo"));
var admin_user_responses_1 = require("../../../../custom/admin-user-responses");
var utils_1 = require("../../../../function/utils");
var utils_2 = require("../../../../function/utils");
var urls_1 = __importDefault(require("../../../../constants/urls"));
var sg_emails_1 = require("../../../../function/sg-emails");
var authorization_1 = __importDefault(require("../../../../auth/authorization"));
var router = express_1.default.Router();
router.get('/get-employee/:employeeId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeId, employee, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                employeeId = req.params.employeeId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(employeeId)];
            case 1:
                employee = _c.sent();
                if (!employee)
                    throw new ApiResponse_1.BadRequestResponse('Employees not found').send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'success'];
                return [4 /*yield*/, (0, admin_user_responses_1.customAdminUserResponse)(employee[0])];
            case 2: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
router.post('/upload-profile-image', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.FILE), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, imageFile;
    return __generator(this, function (_a) {
        imageName = req['files'];
        if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
            return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
        }
        imageFile = imageName[0].filename;
        return [2 /*return*/, new ApiResponse_1.SuccessResponse('File successfully uploaded', {
                url: (0, utils_2.getHomeForImage)(urls_1.default.values.imageProfileAdminLiveUrl) + imageFile,
                imageName: imageFile,
            }).send(res)];
    });
}); }));
router.post('/update', (0, validator_1.default)(schema_1.default.employeeUpdateFormData, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, roleId, isActive, phone, id, profileImage, loggedInUserId, loggedInUser, storeId, employeeExist, checkEmailExist, now, title, employeeFormData, data, employeeData, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, roleId = _a.roleId, isActive = _a.isActive, phone = _a.phone, id = _a.id, profileImage = _a.profileImage;
                loggedInUserId = req.userId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(loggedInUserId)];
            case 1:
                loggedInUser = _d.sent();
                storeId = loggedInUser[0].storeId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(id)];
            case 2:
                employeeExist = _d.sent();
                if (!employeeExist || employeeExist.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('Employee not found').send(res);
                if (!(email !== employeeExist[0].email)) return [3 /*break*/, 4];
                return [4 /*yield*/, AdminUserRepo_1.default.findByEmail(email)];
            case 3:
                checkEmailExist = _d.sent();
                if (checkEmailExist && checkEmailExist.length != 0) {
                    throw new ApiResponse_1.BadRequestResponse('Email already registered').send(res);
                }
                _d.label = 4;
            case 4:
                now = new Date();
                title = "".concat(firstName, " ").concat(lastName);
                employeeFormData = [
                    title,
                    firstName,
                    lastName,
                    email,
                    isActive,
                    roleId,
                    storeId,
                    phone,
                    profileImage,
                    now,
                ];
                return [4 /*yield*/, AdminUserRepo_1.default.updateEmployee(id, employeeFormData)];
            case 5:
                data = _d.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse();
                return [4 /*yield*/, AdminUserRepo_1.default.findById(id)];
            case 6:
                employeeData = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Employee successfully updated'];
                return [4 /*yield*/, (0, admin_user_responses_1.customAdminUserResponse)(employeeData[0])];
            case 7: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authorization_1.default);
/*-------------------------------------------------------------------------*/
router.post('/add', (0, validator_1.default)(schema_1.default.employeeFormData, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var adminUser, now, loggedInUserId, loggedInUser, storeId, accessTokenKey, refreshTokenKey, salt, passwordHash, createdUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AdminUserRepo_1.default.findByEmail(req.body.email)];
            case 1:
                adminUser = _a.sent();
                if (adminUser && adminUser.length > 0)
                    throw new ApiResponse_1.BadRequestResponse('Employee already exist with the same email address.').send(res);
                now = new Date();
                loggedInUserId = req.userId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(loggedInUserId)];
            case 2:
                loggedInUser = _a.sent();
                storeId = loggedInUser[0].storeId;
                accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 4:
                passwordHash = _a.sent();
                return [4 /*yield*/, AdminUserRepo_1.default.create({
                        title: "".concat(req.body.firstName, " ").concat(req.body.lastName),
                        password: passwordHash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        phone: '',
                        roleId: req.body.roleId,
                        storeId: storeId,
                        profileImage: req.body.profileImage,
                        isActive: req.body.isActive,
                        createdAt: now,
                        updatedAt: now,
                    }, accessTokenKey, refreshTokenKey)];
            case 5:
                createdUser = (_a.sent()).adminUser;
                // Send email notification to user
                return [4 /*yield*/, (0, sg_emails_1.sendEmail)(req.body.email, '', 'Created As User', sg_emails_1.ADMIN_USER_CREATION_TEMPLATE, (0, utils_1.addBaseURLWeb)(''), {
                        email: req.body.email,
                        password: req.body.password,
                    })];
            case 6:
                // Send email notification to user
                _a.sent();
                new ApiResponse_1.SuccessResponse('Employee Added Successful', {
                    adminUser: lodash_1.default.pick(createdUser, [
                        'id',
                        'title',
                        'firstName',
                        'lastName',
                        'email',
                        'phone',
                        'roleId',
                        'storeId',
                        'profileImage',
                        'isActive',
                    ]),
                }).send(res);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/get-employees', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, loggedInUserId, loggedInUser, storeId, _a, page, limit, offSet, countData, list, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                search = req.body.search;
                loggedInUserId = req.userId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(loggedInUserId)];
            case 1:
                loggedInUser = _e.sent();
                storeId = loggedInUser[0].storeId;
                _a = (0, utils_1.getAdminPaginationParams)(req), page = _a.page, limit = _a.limit, offSet = _a.offSet;
                if (!search) return [3 /*break*/, 4];
                return [4 /*yield*/, AdminUserRepo_1.default.employeesCountBySearch(search.roleId, search.searchTerm, storeId)];
            case 2:
                countData = _e.sent();
                return [4 /*yield*/, AdminUserRepo_1.default.employeesBySearch(search.roleId, storeId, search.searchTerm, limit, offSet)];
            case 3:
                list = _e.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, AdminUserRepo_1.default.adminUserCount(storeId)];
            case 5:
                countData = _e.sent();
                return [4 /*yield*/, AdminUserRepo_1.default.getAllEmployees(storeId, limit, offSet)];
            case 6:
                list = _e.sent();
                _e.label = 7;
            case 7:
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'success'];
                _d = {};
                return [4 /*yield*/, (0, admin_user_responses_1.customAdminUserCollectionResponse)(list)];
            case 8: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([(_d.data = _e.sent(),
                        _d.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _d)])))().send(res)];
        }
    });
}); }));
router.delete('/delete-employee', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeId, employeeExist, employee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                employeeId = req.body.employeeId;
                return [4 /*yield*/, AdminUserRepo_1.default.findById(employeeId)];
            case 1:
                employeeExist = _a.sent();
                if (!employeeExist || employeeExist.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Employee not found!').send(res);
                return [4 /*yield*/, AdminUserRepo_1.default.deleteEmployee(employeeId)];
            case 2:
                employee = _a.sent();
                if (employee.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', employee).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=employees.js.map