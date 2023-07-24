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
var ProductCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductCategoryRepo"));
var utils_1 = require("../../../../function/utils");
var asyncHandler_1 = __importDefault(require("../../../../helpers/asyncHandler"));
var authentication_1 = __importDefault(require("../../../../auth/authentication"));
var validator_1 = __importStar(require("../../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var product_category_responses_1 = require("../../../../custom/product-category-responses");
var ProductRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductRepo"));
var SubCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/SubCategoryRepo"));
var fs = require('fs');
var router = express_1.default.Router();
var csvToJson = require('csvtojson');
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/add-product-category', (0, validator_1.default)(schema_1.default.productCategory, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, subCategoryId, isActive, categoryImage, imageFile, imageName, obj, isCategoryExist, SubCategory;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, subCategoryId = _a.subCategoryId, isActive = _a.isActive, categoryImage = _a.categoryImage;
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
                obj = {
                    subCategoryId: subCategoryId,
                    name: name,
                    description: description,
                    image: imageFile,
                    isActive: isActive,
                };
                return [4 /*yield*/, ProductCategoryRepo_1.default.fidnByName(name)];
            case 1:
                isCategoryExist = _b.sent();
                if (isCategoryExist && isCategoryExist.length > 0)
                    throw new ApiResponse_1.BadRequestResponse('Product Category already Exist, Please add a different name').send(res);
                return [4 /*yield*/, ProductCategoryRepo_1.default.createProductCategory(obj)];
            case 2:
                SubCategory = _b.sent();
                if (!SubCategory)
                    throw new ApiResponse_1.BadRequestResponse('Product Category not created').send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product Category successfully created', SubCategory).send(res)];
        }
    });
}); }));
router.post('/bulk-upload', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, csvFilePath, dateToDB, ExistingProductCategories, productCategories, countOfAlreadyExisitingCats, msgForAlreadyExisitingCats, countWithBadDataCats, msgWithBadDataCats, addComma, _loop_1, i, bulkInsertResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req['files'];
                if (fileName[0].mimetype !== 'text/csv' && fileName[0].mimetype !== 'text/csv') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                csvFilePath = fileName[0].path;
                dateToDB = '';
                return [4 /*yield*/, ProductCategoryRepo_1.default.getAllProductCategories()];
            case 1:
                ExistingProductCategories = _a.sent();
                return [4 /*yield*/, csvToJson().fromFile(csvFilePath)];
            case 2:
                productCategories = _a.sent();
                countOfAlreadyExisitingCats = 0;
                msgForAlreadyExisitingCats = '';
                countWithBadDataCats = 0;
                msgWithBadDataCats = '';
                addComma = '';
                if (!(productCategories && productCategories.length > 0)) return [3 /*break*/, 6];
                _loop_1 = function (i) {
                    var productCat, alreadyExist, category, isCatActive, subCategoryId, name, description, isActive;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                productCat = productCategories[i];
                                alreadyExist = ExistingProductCategories.filter(function (category) {
                                    return category.name === productCat.name;
                                });
                                if (!(alreadyExist.length === 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, SubCategoryRepo_1.default.fidnByName(productCat.categoryName)];
                            case 1:
                                category = _b.sent();
                                if (productCat.name !== '' && productCat.categoryName !== '' && category.length > 0) {
                                    isCatActive = productCat.isActive.toLowerCase().trim() === 'yes' ? 1 : 0;
                                    subCategoryId = category[0].subCategoryId;
                                    name = productCat.name.trim();
                                    description = productCat.description.trim();
                                    isActive = isCatActive;
                                    dateToDB =
                                        dateToDB + "".concat(addComma, "(").concat(subCategoryId, ", '").concat(name, "', ").concat(isActive, ", '").concat(description, "')");
                                    addComma = productCategories[i + 1] !== undefined ? ',' : '';
                                }
                                else {
                                    countWithBadDataCats = countWithBadDataCats + 1;
                                    msgWithBadDataCats =
                                        'Product Category Name and Category Name are requried fields, Number of product categories with bad data:' +
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
                if (!(i < productCategories.length)) return [3 /*break*/, 6];
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
                return [4 /*yield*/, ProductCategoryRepo_1.default.bulkInsert(dateToDB)];
            case 8:
                bulkInsertResponse = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse("".concat(bulkInsertResponse.affectedRows, " Product Category(s) imported successfully"), {
                        data: bulkInsertResponse,
                        msgWithBadDataCats: msgWithBadDataCats,
                        msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
                    }).send(res)];
            case 9: return [2 /*return*/, new ApiResponse_1.SuccessResponse('CSV file is empty or data is not correct in file', {
                    data: productCategories,
                    msgWithBadDataCats: msgWithBadDataCats,
                    msgForAlreadyExisitingCats: msgForAlreadyExisitingCats,
                }).send(res)];
        }
    });
}); }));
router.get('/get-product-category/:categoryId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, productCatData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                categoryId = req.params.categoryId;
                return [4 /*yield*/, ProductCategoryRepo_1.default.findById(categoryId)];
            case 1:
                productCatData = _c.sent();
                if (!productCatData || productCatData === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product Categories not found').send(res);
                _a = ApiResponse_1.SuccessResponse.bind;
                _b = [void 0, 'success'];
                return [4 /*yield*/, (0, product_category_responses_1.customProductCategoryResponse)(productCatData[0])];
            case 2: return [2 /*return*/, new (_a.apply(ApiResponse_1.SuccessResponse, _b.concat([_c.sent()])))().send(res)];
        }
    });
}); }));
router.post('/update', (0, validator_1.default)(schema_1.default.productCategory, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, subCategoryId, name, description, isActive, checkProductCategory, imageName, imageFile, isCategoryExist, productCategoryData, data, productCatData, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, id = _a.id, subCategoryId = _a.subCategoryId, name = _a.name, description = _a.description, isActive = _a.isActive;
                return [4 /*yield*/, ProductCategoryRepo_1.default.findById(id)];
            case 1:
                checkProductCategory = _d.sent();
                if (!checkProductCategory || checkProductCategory.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('Category not found').send(res);
                imageName = req['files'];
                imageFile = checkProductCategory[0].image;
                if (imageName && imageName.length > 0) {
                    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                        return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                    }
                    imageFile = imageName[0].filename;
                }
                return [4 /*yield*/, ProductCategoryRepo_1.default.fidnByName(name)];
            case 2:
                isCategoryExist = _d.sent();
                if (isCategoryExist && isCategoryExist.length > 0 && id != isCategoryExist[0].id)
                    throw new ApiResponse_1.BadRequestResponse('Product Category already Exist').send(res);
                productCategoryData = [subCategoryId, name, description, imageFile, isActive];
                return [4 /*yield*/, ProductCategoryRepo_1.default.updateProductCategory(id, productCategoryData)];
            case 3:
                data = _d.sent();
                if (data.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [4 /*yield*/, ProductCategoryRepo_1.default.findById(id)];
            case 4:
                productCatData = _d.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'Product Category successfully updated'];
                return [4 /*yield*/, (0, product_category_responses_1.customProductCategoryResponse)(productCatData[0])];
            case 5: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([_d.sent()])))().send(res)];
        }
    });
}); }));
router.delete('/delete-category/:categoryId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryId = req.params.categoryId;
                console.log(categoryId, 'categoryId');
                return [4 /*yield*/, ProductCategoryRepo_1.default.deleteById(categoryId)];
            case 1:
                category = _a.sent();
                if (!category)
                    throw new ApiResponse_1.BadRequestResponse('Product Category not found').send(res);
                // Deactivate the products when product category is deactivated
                return [4 /*yield*/, ProductRepo_1.default.productCategoriesDeactivate([categoryId])];
            case 2:
                // Deactivate the products when product category is deactivated
                _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', category).send(res)];
        }
    });
}); }));
router.post('/get-product-categories', (0, validator_1.default)(schema_1.default.productCategorySearch, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, _a, page, limit, offSet, countData, list, _b, _c, list, _d, _e;
    var _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                search = req.body.search;
                _a = (0, utils_1.getAdminPaginationParams)(req), page = _a.page, limit = _a.limit, offSet = _a.offSet;
                if (!search) return [3 /*break*/, 4];
                return [4 /*yield*/, ProductCategoryRepo_1.default.productCategoriesCountBySearch(search.subCategoryId, search.searchTerm)];
            case 1:
                countData = _h.sent();
                return [4 /*yield*/, ProductCategoryRepo_1.default.findBySearch(search.subCategoryId, search.searchTerm, limit, offSet)];
            case 2:
                list = _h.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'success'];
                _f = {};
                return [4 /*yield*/, (0, product_category_responses_1.customProductCategoryCollectionResponse)(list)];
            case 3: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([(_f.data = _h.sent(),
                        _f.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _f)])))().send(res)];
            case 4: return [4 /*yield*/, ProductCategoryRepo_1.default.productCategoriesCount()];
            case 5:
                countData = _h.sent();
                return [4 /*yield*/, ProductCategoryRepo_1.default.findByProductCategories(limit, offSet)];
            case 6:
                list = _h.sent();
                _d = ApiResponse_1.SuccessResponse.bind;
                _e = [void 0, 'success'];
                _g = {};
                return [4 /*yield*/, (0, product_category_responses_1.customProductCategoryCollectionResponse)(list)];
            case 7: return [2 /*return*/, new (_d.apply(ApiResponse_1.SuccessResponse, _e.concat([(_g.data = _h.sent(),
                        _g.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _g)])))().send(res)];
        }
    });
}); }));
router.get('/get-product-categories-list', (0, validator_1.default)(schema_1.default.productCategorySearch, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductCategoryRepo_1.default.getAllProductCategories()];
            case 1:
                productCategories = _a.sent();
                if (!productCategories)
                    throw new ApiResponse_1.BadRequestResponse('Product Category not found').send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', productCategories).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=adminProductCategory.js.map