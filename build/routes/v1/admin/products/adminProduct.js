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
var ProductRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductRepo"));
var ApiError_1 = require("../../../../core/ApiError");
var asyncHandler_1 = __importDefault(require("../../../../helpers/asyncHandler"));
var authentication_1 = __importDefault(require("../../../../auth/authentication"));
var validator_1 = __importStar(require("../../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var utils_1 = require("../../../../function/utils");
var admin_product_responses_1 = require("../../../../custom/admin-product-responses");
var ProductImageRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductImageRepo"));
var ProductCategoryRepo_1 = __importDefault(require("../../../../database/repository/admin/ProductCategoryRepo"));
var moment_1 = __importDefault(require("moment"));
var fs = require('fs');
var csvToJson = require('csvtojson');
var router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/add-product', (0, validator_1.default)(schema_1.default.productFormData, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, _a, productItemName, productItemDescription, productCategoryId, 
    // productStoreId,
    productIsActive, productItemExpiry, productIsTaxable, productTaxPercentage, productItemBarCode, productPurchasedPrice, productQuantity, productItemBrand, productUnitPrice, productComparativePrice, productItemSKU, productImage, productStoreId, imageName, imageFile, productAlreadyExist, now, obj, product, productImageRes, productImageData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                roleId = req['roleId'];
                _a = req.body, productItemName = _a.productItemName, productItemDescription = _a.productItemDescription, productCategoryId = _a.productCategoryId, productIsActive = _a.productIsActive, productItemExpiry = _a.productItemExpiry, productIsTaxable = _a.productIsTaxable, productTaxPercentage = _a.productTaxPercentage, productItemBarCode = _a.productItemBarCode, productPurchasedPrice = _a.productPurchasedPrice, productQuantity = _a.productQuantity, productItemBrand = _a.productItemBrand, productUnitPrice = _a.productUnitPrice, productComparativePrice = _a.productComparativePrice, productItemSKU = _a.productItemSKU, productImage = _a.productImage;
                productStoreId = roleId === 1 ? 1 : 2;
                imageName = req['files'];
                if (imageName && imageName.length > 0) {
                    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                        return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                    }
                    imageFile = imageName[0].filename;
                }
                else {
                    imageFile = productImage;
                }
                return [4 /*yield*/, ProductRepo_1.default.findByName(productItemName)];
            case 1:
                productAlreadyExist = _b.sent();
                if (productAlreadyExist && productAlreadyExist.length > 0)
                    throw new ApiResponse_1.BadRequestResponse('Product already Exist, Please use a different name.').send(res);
                now = new Date();
                obj = {
                    productCategoryId: productCategoryId,
                    productStoreId: productStoreId,
                    productIsTaxable: productIsTaxable,
                    productTaxPercentage: productTaxPercentage,
                    productItemSKU: productItemSKU,
                    productItemBarCode: productItemBarCode,
                    productQuantity: productQuantity,
                    productItemName: productItemName,
                    productItemBrand: productItemBrand,
                    productItemDescription: productItemDescription,
                    productPurchasedPrice: productPurchasedPrice,
                    productUnitPrice: productUnitPrice,
                    productComparativePrice: productComparativePrice,
                    productIsActive: productIsActive,
                    productItemExpiry: productItemExpiry,
                    productItemImage: imageFile,
                    productCreatedAt: now,
                    productUpdatedAt: now,
                };
                return [4 /*yield*/, ProductRepo_1.default.createProduct(obj)];
            case 2:
                product = _b.sent();
                if (!product || product.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product not created').send(res);
                if (!(imageFile && imageFile !== '')) return [3 /*break*/, 4];
                productImageData = {
                    productId: product.product.id,
                    image: imageFile,
                };
                return [4 /*yield*/, ProductImageRepo_1.default.createProductImage(productImageData)];
            case 3:
                productImageRes = _b.sent();
                if (!productImageRes || productImageRes.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product image not saved').send(res);
                _b.label = 4;
            case 4: return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product successfully created', [product, productImageRes]).send(res)];
        }
    });
}); }));
router.post('/bulk-upload', (0, validator_1.default)(schema_1.default.file, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, now, csvFilePath, dateToDB, products, countOfAlreadyExisitingProducts, countOfProductsAdded, msgForAlreadyExisitingProducts, countWithBadDataProducts, msgWithBadDataProducts, addComma, i, product, alreadyExist, productCat, expiryDateDiff, productStoreId, productSKU, productBarCode, productName, productQuantity, productPurchasedPrice, productSalePrice, productComparativePrice, productExpiry, productDescription, productDiscountAvailable, productDiscountActive, productTaxPercentage, productIsTaxable, productCategoryId, productTaxable, discountActive, bulkInsertResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req['files'];
                if (fileName[0].mimetype !== 'text/csv' && fileName[0].mimetype !== 'text/csv') {
                    return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                }
                now = (0, moment_1.default)();
                csvFilePath = fileName[0].path;
                dateToDB = '';
                return [4 /*yield*/, csvToJson().fromFile(csvFilePath)];
            case 1:
                products = _a.sent();
                countOfAlreadyExisitingProducts = 0;
                countOfProductsAdded = 0;
                msgForAlreadyExisitingProducts = '';
                countWithBadDataProducts = 0;
                msgWithBadDataProducts = '';
                addComma = '';
                if (!(products && products.length > 0)) return [3 /*break*/, 7];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < products.length)) return [3 /*break*/, 7];
                product = products[i];
                return [4 /*yield*/, ProductRepo_1.default.findByName(product.productName)];
            case 3:
                alreadyExist = _a.sent();
                if (!(alreadyExist && alreadyExist.length === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, ProductCategoryRepo_1.default.fidnByName(product.productCategory)];
            case 4:
                productCat = _a.sent();
                expiryDateDiff = now.isBefore(product.productExpiry);
                if (product.productStoreId !== '' &&
                    product.productSKU !== '' &&
                    product.productBarCode !== '' &&
                    product.productName !== '' &&
                    product.productPurchasedPrice !== '' &&
                    product.productSalePrice !== '' &&
                    product.productCategory !== '' &&
                    productCat.length > 0 &&
                    expiryDateDiff) {
                    productStoreId = product.productStoreId, productSKU = product.productSKU, productBarCode = product.productBarCode, productName = product.productName, productQuantity = product.productQuantity, productPurchasedPrice = product.productPurchasedPrice, productSalePrice = product.productSalePrice, productComparativePrice = product.productComparativePrice, productExpiry = product.productExpiry, productDescription = product.productDescription, productDiscountAvailable = product.productDiscountAvailable, productDiscountActive = product.productDiscountActive, productTaxPercentage = product.productTaxPercentage, productIsTaxable = product.productIsTaxable;
                    productCategoryId = productCat ? productCat[0].id : '';
                    productTaxable = productIsTaxable.trim() === 'yes' ? 1 : 0;
                    discountActive = productDiscountActive.trim() === 'yes' ? 1 : 0;
                    dateToDB =
                        dateToDB +
                            "".concat(addComma, "(").concat(productStoreId.trim(), ", '").concat(productSKU.trim(), "', '").concat(productBarCode.trim(), "', '").concat(productName.trim(), "',\n              '").concat(productQuantity.trim(), "', '").concat(productPurchasedPrice.trim(), "', '").concat(productSalePrice.trim(), "', '").concat(productComparativePrice.trim(), "',\n              '").concat(productExpiry.trim(), "', '").concat(productDescription.trim(), "', '").concat(productDiscountAvailable.trim(), "',\n              '").concat(discountActive, "', '").concat(productTaxable, "', '").concat(productTaxPercentage.trim(), "', '").concat(productCategoryId, "')");
                    countOfProductsAdded = countOfProductsAdded + 1;
                    addComma = products[i + 1] !== undefined ? ',' : '';
                }
                else {
                    countWithBadDataProducts = countWithBadDataProducts + 1;
                    msgWithBadDataProducts = "Number of products with bad data: ".concat(countWithBadDataProducts, ". productStoreId, productSKU, productBarCode,\n             productName, productPurchasedPrice, productSalePrice, productCategory are required fields and data should be right. If any of mentioned fields will be empty that specific product will not be added into system.");
                }
                return [3 /*break*/, 6];
            case 5:
                countOfAlreadyExisitingProducts = countOfAlreadyExisitingProducts + 1;
                msgForAlreadyExisitingProducts =
                    'Number of already existing products in system:' + countOfAlreadyExisitingProducts;
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7: return [4 /*yield*/, fs.unlinkSync("".concat(csvFilePath))];
            case 8:
                _a.sent();
                if (!(dateToDB && dateToDB !== '')) return [3 /*break*/, 10];
                return [4 /*yield*/, ProductRepo_1.default.bulkInsert(dateToDB)];
            case 9:
                bulkInsertResponse = _a.sent();
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('Products imported successfully', {
                        data: bulkInsertResponse,
                        countOfProductsAdded: countOfProductsAdded,
                        msgWithBadDataProducts: msgWithBadDataProducts,
                        msgForAlreadyExisitingProducts: msgForAlreadyExisitingProducts,
                    }).send(res)];
            case 10: return [2 /*return*/, new ApiResponse_1.SuccessResponse('CSV file is empty or data is not correct in file', {
                    data: products,
                    msgWithBadDataProducts: msgWithBadDataProducts,
                    msgForAlreadyExisitingProducts: msgForAlreadyExisitingProducts,
                }).send(res)];
        }
    });
}); }));
router.post('/get-all-products', (0, validator_1.default)(schema_1.default.productList, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, productStoreId, _a, storeId, allProducts, search, _b, page, limit, offSet, list, countTotal, countData, _c, _d, _e, _f, _g, _h;
    var _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                roleId = req['roleId'];
                productStoreId = roleId === 1 ? 1 : 2;
                _a = req.body, storeId = _a.storeId, allProducts = _a.allProducts, search = _a.search;
                _b = (0, utils_1.getAdminPaginationParams)(req), page = _b.page, limit = _b.limit, offSet = _b.offSet;
                if (!search) return [3 /*break*/, 4];
                return [4 /*yield*/, ProductRepo_1.default.productCountBySearch(productStoreId, search.productCategoryId, search.searchTerm)];
            case 1:
                countData = _m.sent();
                return [4 /*yield*/, ProductRepo_1.default.findBySearch(productStoreId, search.productCategoryId, search.searchTerm, limit, offSet)];
            case 2:
                list = _m.sent();
                _c = ApiResponse_1.SuccessResponse.bind;
                _d = [void 0, 'success'];
                _j = {};
                return [4 /*yield*/, (0, admin_product_responses_1.productsCollectionResponse)(list)];
            case 3: return [2 /*return*/, new (_c.apply(ApiResponse_1.SuccessResponse, _d.concat([(_j.data = _m.sent(),
                        _j.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _j)])))().send(res)];
            case 4:
                if (!storeId) return [3 /*break*/, 7];
                return [4 /*yield*/, ProductRepo_1.default.countData(storeId)];
            case 5:
                countTotal = _m.sent();
                return [4 /*yield*/, ProductRepo_1.default.getPaginationData(storeId, limit, offSet)];
            case 6:
                list = _m.sent();
                return [3 /*break*/, 12];
            case 7:
                if (!allProducts) return [3 /*break*/, 11];
                return [4 /*yield*/, ProductRepo_1.default.countProducts(productStoreId)];
            case 8:
                countTotal = _m.sent();
                return [4 /*yield*/, ProductRepo_1.default.getPaginationProducts(productStoreId, limit, offSet)];
            case 9:
                list = _m.sent();
                _e = ApiResponse_1.SuccessResponse.bind;
                _f = [void 0, 'success'];
                _k = {};
                return [4 /*yield*/, (0, admin_product_responses_1.productsCollectionResponse)(list)];
            case 10: return [2 /*return*/, new (_e.apply(ApiResponse_1.SuccessResponse, _f.concat([(_k.data = _m.sent(),
                        _k.pagination = (0, utils_1.getPaginationObject)(page, countTotal[0].rowCount, limit),
                        _k)])))().send(res)];
            case 11: throw new ApiError_1.BadRequestError('SubcategoryId is required');
            case 12:
                _g = ApiResponse_1.SuccessResponse.bind;
                _h = [void 0, 'success'];
                _l = {};
                return [4 /*yield*/, (0, admin_product_responses_1.customStoreCollectionResponse)(list)];
            case 13: return [2 /*return*/, new (_g.apply(ApiResponse_1.SuccessResponse, _h.concat([(_l.data = _m.sent(),
                        _l.pagination = (0, utils_1.getPaginationObject)(page, countTotal[0].rowCount, limit),
                        _l)])))().send(res)];
        }
    });
}); }));
router.get('/get-product/:productId', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, productStoreId, productId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roleId = req['roleId'];
                productStoreId = roleId === 1 ? 1 : 2;
                productId = req.params.productId;
                return [4 /*yield*/, ProductRepo_1.default.findById(productStoreId, productId)];
            case 1:
                product = _a.sent();
                if (!product || product.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product not found!').send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', (0, admin_product_responses_1.productsResponse)(product[0])).send(res)];
        }
    });
}); }));
router.post('/update-product', (0, validator_1.default)(schema_1.default.updateProductData, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, productStoreId, _a, productId, productItemName, productItemDescription, productCategoryId, 
    // productStoreId,
    productIsActive, productItemExpiry, productIsTaxable, productTaxPercentage, productItemBarCode, productPurchasedPrice, productQuantity, productItemBrand, productUnitPrice, productComparativePrice, productItemSKU, checkProduct, productAlreadyExist, imageFile, imageName, productItemImage, now, obj, product, checkProductImage, productImageRes, productImage, productImage, productImageRes_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                roleId = req['roleId'];
                productStoreId = roleId === 1 ? 1 : 2;
                _a = req.body, productId = _a.productId, productItemName = _a.productItemName, productItemDescription = _a.productItemDescription, productCategoryId = _a.productCategoryId, productIsActive = _a.productIsActive, productItemExpiry = _a.productItemExpiry, productIsTaxable = _a.productIsTaxable, productTaxPercentage = _a.productTaxPercentage, productItemBarCode = _a.productItemBarCode, productPurchasedPrice = _a.productPurchasedPrice, productQuantity = _a.productQuantity, productItemBrand = _a.productItemBrand, productUnitPrice = _a.productUnitPrice, productComparativePrice = _a.productComparativePrice, productItemSKU = _a.productItemSKU;
                return [4 /*yield*/, ProductRepo_1.default.findById(productStoreId, productId)];
            case 1:
                checkProduct = _b.sent();
                if (!checkProduct || checkProduct.length === 0)
                    throw new ApiResponse_1.NotFoundResponse('Product not found!').send(res);
                return [4 /*yield*/, ProductRepo_1.default.findByName(productItemName)];
            case 2:
                productAlreadyExist = _b.sent();
                if (productAlreadyExist &&
                    productAlreadyExist.length > 0 &&
                    productId != productAlreadyExist[0].productId)
                    throw new ApiResponse_1.BadRequestResponse('Product already Exist, Please use a different name.').send(res);
                imageFile = '';
                imageName = req['files'];
                if (imageName && imageName.length > 0) {
                    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
                        return [2 /*return*/, new ApiResponse_1.BadRequestResponse('Invalid file type').send(res)];
                    }
                    imageFile = imageName[0].filename;
                }
                productItemImage = imageFile;
                now = new Date();
                obj = [
                    productCategoryId,
                    productIsTaxable,
                    productTaxPercentage,
                    productQuantity,
                    productItemName,
                    productItemBrand,
                    productItemDescription,
                    productPurchasedPrice,
                    productUnitPrice,
                    productComparativePrice,
                    productIsActive,
                    productItemExpiry,
                    productStoreId,
                    productItemBarCode,
                    productItemSKU,
                    productItemImage,
                    now,
                ];
                return [4 /*yield*/, ProductRepo_1.default.updateProduct(productId, obj)];
            case 3:
                product = _b.sent();
                if (!product || product.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product not updated').send(res);
                return [4 /*yield*/, ProductImageRepo_1.default.findByProductId(productId)];
            case 4:
                checkProductImage = _b.sent();
                productImageRes = [];
                if (!(checkProductImage && checkProductImage.length > 0)) return [3 /*break*/, 6];
                productImage = [imageFile];
                return [4 /*yield*/, ProductImageRepo_1.default.updateProductImage(checkProductImage[0].id, productImage)];
            case 5:
                productImageRes = _b.sent();
                if (!productImageRes || productImageRes.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product image not saved').send(res);
                return [3 /*break*/, 8];
            case 6:
                if (!(imageFile !== '')) return [3 /*break*/, 8];
                productImage = {
                    productId: checkProduct[0].productId,
                    image: imageFile,
                };
                return [4 /*yield*/, ProductImageRepo_1.default.createProductImage(productImage)];
            case 7:
                productImageRes_1 = _b.sent();
                if (!productImageRes_1 || productImageRes_1.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product image not saved').send(res);
                _b.label = 8;
            case 8: return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product successfully Updated', product).send(res)];
        }
    });
}); }));
router.get('/get-products-by-category', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductRepo_1.default.findByCategoryId(1)];
            case 1:
                productsList = _a.sent();
                if (!productsList)
                    throw new ApiResponse_1.BadRequestResponse('Products not found!').send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', productsList).send(res)];
        }
    });
}); }));
router.delete('/delete-product', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, productStoreId, productId, productExist, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roleId = req['roleId'];
                productStoreId = roleId === 1 ? 1 : 2;
                productId = req.body.productId;
                return [4 /*yield*/, ProductRepo_1.default.findById(productStoreId, productId)];
            case 1:
                productExist = _a.sent();
                if (!productExist || productExist.length === 0)
                    throw new ApiResponse_1.BadRequestResponse('Product not found!').send(res);
                return [4 /*yield*/, ProductRepo_1.default.deleteProductById(productId)];
            case 2:
                product = _a.sent();
                if (product.affectedRows <= 0)
                    throw new ApiResponse_1.InternalErrorResponse().send(res);
                return [2 /*return*/, new ApiResponse_1.SuccessResponse('success', product).send(res)];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=adminProduct.js.map