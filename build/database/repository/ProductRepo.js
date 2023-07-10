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
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("../model/Product");
var index_1 = require("../index");
var ProductCategory_1 = require("../model/ProductCategory");
var Favourite_1 = require("../model/Favourite");
var utils_1 = require("../../function/utils");
var product_responses_1 = require("../../custom/product-responses");
var ProductRepo = /** @class */ (function () {
    function ProductRepo() {
    }
    ProductRepo.validateProductQuantities = function (products, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, productsList, isError, _i, products_1, product, isExist, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        storeId = (0, utils_1.getStoreId)(orderType);
                        productsList = [];
                        isError = false;
                        _i = 0, products_1 = products;
                        _g.label = 1;
                    case 1:
                        if (!(_i < products_1.length)) return [3 /*break*/, 8];
                        product = products_1[_i];
                        return [4 /*yield*/, this.ProductQuantityExists(product.productItemSKU, storeId, product.quantity, product.productId)];
                    case 2:
                        isExist = _g.sent();
                        if (isExist && isExist.hasOwnProperty('isAvailable')) {
                            if (!isExist.isAvailable)
                                isError = true;
                        }
                        if (!isExist)
                            isError = true;
                        _b = (_a = productsList).push;
                        _e = {};
                        if (!(isExist && isExist.hasOwnProperty('isAvailable'))) return [3 /*break*/, 5];
                        _d = [__assign({}, isExist)];
                        _f = {};
                        return [4 /*yield*/, (0, product_responses_1.getProductImage)(isExist.productItemImage, isExist.productItemThumbnail)];
                    case 3:
                        _f.productItemImage = _g.sent();
                        return [4 /*yield*/, (0, product_responses_1.getProductImage)(isExist.productItemImage, isExist.productItemThumbnail)];
                    case 4:
                        _c = __assign.apply(void 0, _d.concat([(_f.productItemThumbnail = _g.sent(), _f)]));
                        return [3 /*break*/, 6];
                    case 5:
                        _c = null;
                        _g.label = 6;
                    case 6:
                        _b.apply(_a, [__assign.apply(void 0, [__assign.apply(void 0, [(_e.product = _c, _e), product]), { isAvailable: isExist && isExist.hasOwnProperty('isAvailable') ? isExist.isAvailable : false }])]);
                        _g.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, { productsList: productsList, isError: isError }];
                }
            });
        });
    };
    ProductRepo.ProductQuantityExists = function (productSKU, storeId, quantity, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(productId)];
                    case 1:
                        data = _a.sent();
                        if (data.length > 0) {
                            return [2 /*return*/, __assign(__assign({}, data[0]), { isAvailable: data[0].productQuantity >= quantity && quantity > 0 ? true : false })];
                        }
                        return [4 /*yield*/, this.findBySKU(productSKU.toString())];
                    case 2:
                        query = _a.sent();
                        if (query.length > 0) {
                            return [2 /*return*/, __assign(__assign({}, query[0]), { isAvailable: query[0].productQuantity >= quantity && quantity > 0 ? true : false })];
                        }
                        // if (storeId === ORDER_TYPE_ID.TYPE20) {
                        //   const data = await this.findById(productId);
                        //   if (data.length > 0) {
                        //     return {
                        //       ...data[0],
                        //       isAvailable: data[0].productQuantity >= quantity && quantity > 0 ? true : false,
                        //     };
                        //   }
                        //   const query: any = await this.findBySKU(productSKU.toString());
                        //   if (query.length > 0) {
                        //     return {
                        //       ...query[0],
                        //       isAvailable: query[0].productQuantity >= quantity && quantity > 0 ? true : false,
                        //     };
                        //   }
                        // }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    ProductRepo.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select * from ".concat(Product_1.PRODUCT_TABLE_NAME, " \n   where ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " = ").concat(id);
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.findBySKU = function (sku) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select * from ".concat(Product_1.PRODUCT_TABLE_NAME, " \n   where ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemSKU, " = '").concat(sku, "'");
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.updateQuantity = function (productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.updateRecord)("update ".concat(Product_1.PRODUCT_TABLE_NAME, " set ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productQuantity, "=?\n     where  ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, "=").concat(productId, " "), [quantity.toString()])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.countBySubCategory = function (id, storeId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select count(*) as rowCount from ".concat(Product_1.PRODUCT_TABLE_NAME, " inner join ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, " on ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORY_COL.id, "\n   where ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORY_COL.subCategoryId, " = ").concat(id, " && ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId);
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.findBySubCategory = function (id, storeId, userId, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select *,".concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.id, " as ").concat("favouriteId", ", \n    ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " as ").concat("productId", "\n    from ").concat(Product_1.PRODUCT_TABLE_NAME, " inner join ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, " on ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORY_COL.id, "\n    left join ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, " on ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.productId, " = ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " and ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.userId, " = ").concat(userId, "\n    where ").concat(ProductCategory_1.PRODUCT_CATEGORY_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORY_COL.subCategoryId, "  = ").concat(id, " && ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId, " LIMIT ").concat(limit, " OFFSET ").concat(offSet);
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.countData = function (storeId, searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select COUNT(*) AS rowCount from ".concat(Product_1.PRODUCT_TABLE_NAME, " where \n    ").concat(Product_1.PRODUCT_COL.productItemName, " Like '%").concat(searchText, "%' and (").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId, ")");
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductRepo.getPaginationData = function (storeId, userId, searchText, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "Select *,".concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.id, " as ").concat("favouriteId", ",\n      ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " as ").concat("productId", "\n      from ").concat(Product_1.PRODUCT_TABLE_NAME, "\n     left join ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, " on ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.productId, " = ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " and ").concat(Favourite_1.FAVOURITE_PRODUCT_TABLE_NAME, ".").concat(Favourite_1.FAVOURITE_PRODUCT_COL.userId, " = ").concat(userId, "\n      where (").concat(Product_1.PRODUCT_COL.productItemDescription, " Like '%").concat(searchText, "%' or ").concat(Product_1.PRODUCT_COL.productItemBrand, " Like '%").concat(searchText, "%' or  ").concat(Product_1.PRODUCT_COL.productItemName, " Like '%").concat(searchText, "%') \n    and (").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId, ")\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet);
                        return [4 /*yield*/, (0, index_1.executeQuery)(query)];
                    case 1: 
                    //     const query: string = `Select *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
                    //       FAVOURITE_PRODUCT_COL.id
                    //     } as ${`favouriteId`},
                    //   ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} as ${`productId`}
                    //   from ${PRODUCT_TABLE_NAME}
                    //  left join ${FAVOURITE_PRODUCT_TABLE_NAME} on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
                    //       FAVOURITE_PRODUCT_COL.productId
                    //     } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} and ${FAVOURITE_PRODUCT_TABLE_NAME}.${
                    //       FAVOURITE_PRODUCT_COL.userId
                    //     } = ${userId}
                    //   where ${PRODUCT_COL.productItemName} Like '%${searchText}%'
                    //   LIMIT ${limit} OFFSET ${offSet}`;
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ProductRepo;
}());
exports.default = ProductRepo;
// and ${PRODUCT_COL.productStoreId} = ${storeId}
//and in getPaginationData before LIMIT
// also Add in countData
//# sourceMappingURL=ProductRepo.js.map