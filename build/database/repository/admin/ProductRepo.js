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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var Product_1 = require("../../model/Product");
var ProductImage_1 = require("../../model/admin/ProductImage");
var SubCategory_1 = require("../../model/SubCategory");
var ProductCategory_1 = require("../../model/admin/ProductCategory");
var ProductRepo = /** @class */ (function () {
    function ProductRepo() {
    }
    ProductRepo.searchCondition = function (productCategoryId, searchTerm) {
        var condition = '';
        if (productCategoryId != '' && searchTerm != '') {
            condition = "".concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, "='").concat(productCategoryId, "' \n      AND (").concat(Product_1.PRODUCT_COL.productItemSKU, " LIKE '%").concat(searchTerm, "%' OR ").concat(Product_1.PRODUCT_COL.productItemName, " LIKE '%").concat(searchTerm, "%' OR ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " LIKE '%").concat(searchTerm, "%')");
        }
        else if (productCategoryId != '' && searchTerm === '') {
            condition = "".concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, "='").concat(productCategoryId, "'");
        }
        else if (productCategoryId == '' && searchTerm !== '') {
            condition = "(".concat(Product_1.PRODUCT_COL.productItemSKU, " LIKE '%").concat(searchTerm, "%' OR ").concat(Product_1.PRODUCT_COL.productItemName, " LIKE '%").concat(searchTerm, "%' OR ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " LIKE '%").concat(searchTerm, "%')");
        }
        return condition;
    };
    ProductRepo.findById = function (productStoreId, id) {
        return (0, index_1.executeQuery)("SELECT\n      ".concat(Product_1.PRODUCT_TABLE_NAME, ".*,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, ",\n      ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " as productCategoryName,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, ",\n      ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, ",\n      ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.name, "\n      FROM ").concat(Product_1.PRODUCT_TABLE_NAME, "\n      LEFT JOIN ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, "\n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " = ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.productId, "\n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, "\n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      LEFT JOIN ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, "\n      ON ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, " = ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.id, "\n      WHERE ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, "='").concat(id, "'\n      AND ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productStoreId, "='").concat(productStoreId, "'\n      AND ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0 "));
    };
    ProductRepo.findByName = function (name) {
        return (0, index_1.executeQuery)("SELECT\n      ".concat(Product_1.PRODUCT_TABLE_NAME, ".* \n      FROM ").concat(Product_1.PRODUCT_TABLE_NAME, "\n      WHERE ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, "='").concat(name, "'\n      AND ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0 "));
    };
    ProductRepo.getAllProducts = function (offSet) {
        return (0, index_1.executeQuery)("SELECT \n      ".concat(Product_1.PRODUCT_TABLE_NAME, ".*,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, ",\n      ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " as productCategoryName,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, ",\n      ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, ",\n      ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.name, "\n      FROM ").concat(Product_1.PRODUCT_TABLE_NAME, "\n      LEFT JOIN ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " = ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.productId, "\n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      LEFT JOIN ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, " \n      ON ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, " = ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.id, "\n      WHERE ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0\n      ORDER BY ").concat(SubCategory_1.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.name, " ASC\n      LIMIT ").concat(offSet, ", 50"));
    };
    ProductRepo.findByCategoryId = function (categoryId) {
        return (0, index_1.executeQuery)("SELECT\n      ".concat(Product_1.PRODUCT_TABLE_NAME, ".*,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, ",\n      ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " as productCategoryName,\n      ").concat(ProductImage_1.PRODUCT_IMAGES_TABLE_NAME, ".").concat(ProductImage_1.PRODUCT_IMAGE_COL.image, "\n      FROM ").concat(Product_1.PRODUCT_TABLE_NAME, " \n      WHERE ").concat(Product_1.PRODUCT_COL.productCategoryId, "='").concat(categoryId, "' \n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0"));
    };
    ProductRepo.productCountBySubCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      INNER JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, " = ").concat(id))];
            });
        });
    };
    ProductRepo.findBySubCategory = function (id, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      INNER JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, " = ").concat(id, " \n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductRepo.productCountBySearch = function (productStoreId, productCategoryId, searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var condition;
            return __generator(this, function (_a) {
                condition = this.searchCondition(productCategoryId, searchTerm);
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(Product_1.PRODUCT_TABLE_NAME, "\n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(condition, " \n      AND ").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(productStoreId, "\n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0"))];
            });
        });
    };
    ProductRepo.findBySearch = function (productStoreId, productCategoryId, searchTerm, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            var condition;
            return __generator(this, function (_a) {
                condition = this.searchCondition(productCategoryId, searchTerm);
                console.log("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(condition, " \n      AND ").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(productStoreId, "\n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0\n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemSKU, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet));
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(condition, " \n      AND ").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(productStoreId, "\n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0\n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemSKU, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductRepo.productCountBySearchTerm = function (searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(Product_1.PRODUCT_TABLE_NAME, "\n      WHERE (").concat(Product_1.PRODUCT_COL.productId, " Like '%").concat(searchTerm, "%' or ").concat(Product_1.PRODUCT_COL.productItemName, " Like '%").concat(searchTerm, "%') AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0"))];
            });
        });
    };
    ProductRepo.itemsOutOfStock = function (currentDate, spanOf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, "\n      WHERE ").concat(Product_1.PRODUCT_COL.productIsActive, "=1 \n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0 \n      AND ").concat(Product_1.PRODUCT_COL.productQuantity, "=0 \n      AND ").concat(Product_1.PRODUCT_COL.productCreatedAt, " BETWEEN '").concat(spanOf, " 00:00:00' AND '").concat(currentDate, " 00:00:00'\n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC\n      LIMIT 10"))];
            });
        });
    };
    ProductRepo.findBySearchTerm = function (searchTerm, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, "\n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE (").concat(Product_1.PRODUCT_COL.productItemSKU, " Like '%").concat(searchTerm, "%' OR ").concat(Product_1.PRODUCT_COL.productItemName, " Like '%").concat(searchTerm, "%' OR ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " Like '%").concat(searchTerm, "%')\n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0 \n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductRepo.countData = function (storeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) AS rowCount \n      FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " WHERE ").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId, " AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0"))];
            });
        });
    };
    ProductRepo.countProducts = function (productStoreId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) AS rowCount \n      FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " WHERE ").concat(Product_1.PRODUCT_COL.productStoreId, "=").concat(productStoreId, "\n      AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0"))];
            });
        });
    };
    ProductRepo.getPaginationData = function (storeId, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      WHERE ").concat(Product_1.PRODUCT_COL.productStoreId, " = ").concat(storeId, " AND ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0 \n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductRepo.getPaginationProducts = function (productStoreId, limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(Product_1.PRODUCT_TABLE_NAME, " \n      LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      ON ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n      WHERE ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productStoreId, "=").concat(productStoreId, "\n      AND ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productIsDeleted, "=0\n      ORDER BY ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productItemName, " ASC, ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productId, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductRepo.deleteProductById = function (id) {
        return (0, index_1.executeQuery)("UPDATE ".concat(Product_1.PRODUCT_TABLE_NAME, " SET ").concat(Product_1.PRODUCT_COL.productIsDeleted, "=1 WHERE ").concat(Product_1.PRODUCT_COL.productId, "='").concat(id, "'"));
    };
    ProductRepo.createProduct = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.insertRecord)(Product_1.PRODUCT_TABLE_NAME, obj)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, { product: res }];
                }
            });
        });
    };
    ProductRepo.updateProduct = function (id, obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.updateRecord)("UPDATE ".concat(Product_1.PRODUCT_TABLE_NAME, " SET productCategoryId=?,productIsTaxable=?,productTaxPercentage=?,productQuantity=?,productItemName=?,productItemBrand=?,productItemDescription=?,productPurchasedPrice=?,productUnitPrice=?,productComparativePrice=?,productIsActive=?,productItemExpiry=?,productStoreId=?,productItemBarCode=?,productItemSKU=?,productItemImage=?,productUpdatedAt=? WHERE productId='").concat(id, "'"), obj)];
            });
        });
    };
    ProductRepo.productCategoriesDeactivate = function (catIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("UPDATE ".concat(Product_1.PRODUCT_TABLE_NAME, " SET ").concat(Product_1.PRODUCT_COL.productIsActive, "=0 WHERE ").concat(Product_1.PRODUCT_COL.productCategoryId, " IN (").concat(catIds, ")"))];
            });
        });
    };
    ProductRepo.bulkInsert = function (dateToDB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("INSERT INTO ".concat(Product_1.PRODUCT_TABLE_NAME, " (productStoreId,productItemSKU,productItemBarCode,productItemName,productQuantity,productPurchasedPrice,productUnitPrice,productComparativePrice,productItemExpiry,productItemDescription,productDiscountAvailable,productDiscountActive,productIsTaxable,productTaxPercentage,productCategoryId) VALUES ").concat(dateToDB))];
            });
        });
    };
    return ProductRepo;
}());
exports.default = ProductRepo;
//# sourceMappingURL=ProductRepo.js.map