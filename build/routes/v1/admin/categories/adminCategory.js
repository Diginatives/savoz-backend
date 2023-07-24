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
// import CategoryRepo from '../../../../database/repository/CategoryRepo';
var SubCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/SubCategoryRepo"));
var asyncHandler_1 = __importDefault(require("../../../../helpers/asyncHandler"));
var authentication_1 = __importDefault(require("../../../../auth/authentication"));
var validator_1 = __importStar(require("../../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var admin_subCategory_responses_1 = require("../../../../custom/admin-subCategory-responses");
var ProductCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductCategoryRepo"));
var ProductRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductRepo"));
var MainCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/MainCategoryRepo"));
var fs = require('fs');
var router = express_1.default.Router();
var csvToJson = require('csvtojson');
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/add-sub-category', (0, validator_1.default)(schema_1.default.subCategory, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, mainCategoryId, isActive, categoryImage, imageFile, imageName, now, obj, isCategoryExist, SubCategory, objStore, storeSubCategory, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, mainCategoryId = _a.mainCategoryId, isActive = _a.isActive, categoryImage = _a.categoryImage;
                imageName = req['files'];
                if (imageName && imageName.length > 0) {
                    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                        return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                    }
                    imageFile = imageName[0].filename;
                }
                else if (categoryImage && categoryImage !== '') {
                    imageFile = categoryImage;
                }
                now = new Date();
                obj = {
                    subCategoryName: name,
                    subCategoryDescription: description,
                    subCategoryMainCategoryId: mainCategoryId,
                    subCategoryImage: imageFile,
                    subCategoryIsActive: isActive,
                    subCategoryCreatedAt: now,
                    subCategoryUpdatedAt: now,
                };
                return [4 /*yield*/, SubCategoryRepo_1.default.fidnByName(name)];
            case 1:
                isCategoryExist = _d.sent();
                if (isCategoryExist && isCategoryExist.length > 0)
                    throw new ApiResponse_1.BadRequestResponse('Category already Exist, Please use a different name.').send(res);
                return [4 /*yield*/, SubCategoryRepo_1.default.createSubCategory(obj)];
            case 2:
                SubCategory = _d.sent();
                if (!SubCategory)
                    throw new ApiResponse_1.BadRequestResponse('Category not created').send(res);
                objStore = {
                    subCategoryId: SubCategory.id,
                    storeId: '1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                return [4 /*yield*/, SubCategoryRepo_1.default.createStoreSubCategory(objStore)];
            case 3:
                storeSubCategory = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Category successfully created'];
                return [4 /*yield*/, (0, admin_subCategory_responses_1.customAdminSubCategoryResponse)(SubCategory)];
            case 4: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
router.post('/bulk-upload', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, csvFilePath, dateToDB, ExistingCategories, categories, countOfAlreadyExisitingCats, msgForAlreadyExisitingCats, countWithBadDataCats, msgWithBadDataCats, addComma, _loop_1, i, bulkInsertResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req['files'];
                if (fileName[0].mimetype !== 'text/csv' && fileName[0].mimetype !== 'text/csv') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                csvFilePath = fileName[0].path;
                dateToDB = '';
                return [4 /*yield*/, SubCategoryRepo_1.default.findByMainCategoryId(1)];
            case 1:
                ExistingCategories = _a.sent();
                return [4 /*yield*/, csvToJson().fromFile(csvFilePath)];
            case 2:
                categories = _a.sent();
                countOfAlreadyExisitingCats = 0;
                msgForAlreadyExisitingCats = '';
                countWithBadDataCats = 0;
                msgWithBadDataCats = '';
                addComma = '';
                if (!(categories && categories.length > 0)) return [3 /*break*/, 6];
                _loop_1 = function (i) {
                    var category, alreadyExist, mainCategory, mainCat, name, description, isActive;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                category = categories[i];
                                alreadyExist = ExistingCategories === null || ExistingCategories === void 0 ? void 0 : ExistingCategories.filter(function (existingCategory) {
                                    return category.name === existingCategory.subCategoryName;
                                });
                                if (!((alreadyExist === null || alreadyExist === void 0 ? void 0 : alreadyExist.length) === 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, MainCategoryRepo_1.default.findByName(category.mainCategory)];
                            case 1:
                                mainCategory = _b.sent();
                                if (category.name !== '' && mainCategory.length > 0) {
                                    mainCat = mainCategory[0].id;
                                    name = category.name.trim();
                                    description = category.description.trim();
                                    isActive = category.isActive.toLowerCase().trim() == 'yes' ? 1 : 0;
                                    dateToDB =
                                        dateToDB + "".concat(addComma, "('").concat(mainCat, "','").concat(name, "', '").concat(description, "', ").concat(isActive, ")");
                                    addComma = categories[i + 1] !== undefined ? ',' : '';
                                }
                                else {
                                    countWithBadDataCats = countWithBadDataCats + 1;
                                    msgWithBadDataCats =
                                        'Category Name is requried field, Number of categories with bad data:' +
                                            countWithBadDataCats;
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                countOfAlreadyExisitingCats = countOfAlreadyExisitingCats + 1;
                                msgForAlreadyExisitingCats =
                                    'Number of already existing products categories in system:' +
                                        countOfAlreadyExisitingCats;
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < categories.length)) return [3 /*break*/, 6];
                return [5 /*yield**/, _loop_1(i)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, fs.unlinkSync("".concat(csvFilePath))];
            case 7:
                _a.sent();
                if (!(dateToDB && dateToDB !== '')) return [3 /*break*/, 9];
                return [4 /*yield*/, SubCategoryRepo_1.default.bulkInsert(dateToDB)];
            case 8:
                bulkInsertResponse = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse("".concat(bulkInsertResponse.affectedRows, " Category(s) imported successfully"), {
                        data: bulkInsertResponse,
                        msgWithBadDataCats: msgWithBadDataCats,
                        msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
                    }).send(res)];
            case 9: return [2 /*return*/, new ApiResponse_1.SuccessResponse('CSV file is empty or data is not correct in file', {
                    data: categories,
                    msgWithBadDataCats: msgWithBadDataCats,
                    msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
                }).send(res)];
        }
    });
}); }));
router.get('/get-category/:categoryId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                categoryId = req.params.categoryId;
                return [4 /*yield*/, SubCategoryRepo_1.default.findById(categoryId)];
            case 1:
                category = _c.sent();
                if (!category || category.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Categories not found').send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'success'];
                return [4 /*yield*/, (0, admin_subCategory_responses_1.customAdminSubCategoryResponse)(category[0])];
            case 2: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
router.post('/update-category', (0, validator_1.default)(schema_1.default.subCategory, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, mainCategoryId, name, description, isActive, checkSubCategory, imageName, subCategoryImage, isCategoryExist, now, subCategoryObj, data, subCategoryData, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, id = _a.id, mainCategoryId = _a.mainCategoryId, name = _a.name, description = _a.description, isActive = _a.isActive;
                return [4 /*yield*/, SubCategoryRepo_1.default.findById(id)];
            case 1:
                checkSubCategory = _d.sent();
                if (!checkSubCategory || checkSubCategory.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('Category not found').send(res);
                imageName = req['files'];
                subCategoryImage = checkSubCategory[0].subCategoryImage;
                if (imageName && imageName.length > 0) {
                    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                        return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                    }
                    subCategoryImage = imageName[0].filename;
                }
                return [4 /*yield*/, SubCategoryRepo_1.default.fidnByName(name)];
            case 2:
                isCategoryExist = _d.sent();
                if (isCategoryExist && isCategoryExist.length > 0 && id != isCategoryExist[0].subCategoryId)
                    throw new ApiResponse_1.BadRequestResponse('Category already Exist, Please use a different name.').send(res);
                now = new Date();
                subCategoryObj = [mainCategoryId, name, description, subCategoryImage, isActive, now];
                return [4 /*yield*/, SubCategoryRepo_1.default.updateSubCategory(id, subCategoryObj)];
            case 3:
                data = _d.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, SubCategoryRepo_1.default.findById(id)];
            case 4:
                subCategoryData = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Category successfully updated'];
                return [4 /*yield*/, (0, admin_subCategory_responses_1.customAdminSubCategoryResponse)(subCategoryData[0])];
            case 5: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
router.delete('/delete-category/:categoryId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category, storeSubCategory, proCatsIds, productCats_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryId = req.params.categoryId;
                return [4 /*yield*/, SubCategoryRepo_1.default.deleteById(categoryId)];
            case 1:
                category = _a.sent();
                if (!category)
                    throw new ApiResponse_1.BadRequestResponse('Category not found').send(res);
                return [4 /*yield*/, ProductCategoryRepo_1.default.deleteStoreSubcategory(categoryId)];
            case 2:
                storeSubCategory = _a.sent();
                return [4 /*yield*/, ProductCategoryRepo_1.default.productCategoriesIds(categoryId)];
            case 3:
                proCatsIds = _a.sent();
                if (!(proCatsIds && proCatsIds.length > 0)) return [3 /*break*/, 6];
                productCats_1 = [];
                proCatsIds.forEach(function (element) {
                    productCats_1.push(element.id);
                });
                return [4 /*yield*/, ProductCategoryRepo_1.default.productCategoriesDeactivate(productCats_1)];
            case 4:
                _a.sent();
                // Deactivate the products when product category is deactivated
                return [4 /*yield*/, ProductRepo_1.default.productCategoriesDeactivate(productCats_1)];
            case 5:
                // Deactivate the products when product category is deactivated
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', category).send(res)];
        }
    });
}); }));
router.get('/get-categories', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, SubCategoryRepo_1.default.findByMainCategoryId(1)];
            case 1:
                categories = _c.sent();
                if (!categories)
                    throw new ApiResponse_1.BadRequestResponse('Categories not found').send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'success'];
                return [4 /*yield*/, (0, admin_subCategory_responses_1.customSubCategoryCollectionResponse)(categories)];
            case 2: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=adminCategory.js.map