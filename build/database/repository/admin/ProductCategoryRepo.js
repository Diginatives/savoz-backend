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
var ProductCategory_1 = require("../../model/admin/ProductCategory");
var ProductCategoryRepo = /** @class */ (function () {
    function ProductCategoryRepo() {
    }
    ProductCategoryRepo.searchCondition = function (id, searchTerm) {
        var condition = '';
        if (id != '' && searchTerm != '') {
            condition = "".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, "='").concat(id, "' AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " LIKE '%").concat(searchTerm, "%'");
        }
        else if (id != '' && searchTerm === '') {
            condition = "".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, "='").concat(id, "'");
        }
        else if (id == '' && searchTerm !== '') {
            condition = "".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " LIKE '%").concat(searchTerm, "%'");
        }
        return condition;
    };
    ProductCategoryRepo.findBySearch = function (id, searchTerm, limit, offSet) {
        var condition = this.searchCondition(id, searchTerm);
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      WHERE ").concat(condition, "\n      AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0 \n      ORDER BY ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet));
    };
    ProductCategoryRepo.fidnByName = function (name) {
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, "='").concat(name, "'\n      AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0"));
    };
    ProductCategoryRepo.productCategoriesCountBySearch = function (id, searchTerm) {
        var condition = this.searchCondition(id, searchTerm);
        return (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      WHERE ").concat(condition, "\n      AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0"));
    };
    ProductCategoryRepo.getAllProductCategories = function () {
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, "\n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0"));
    };
    ProductCategoryRepo.findById = function (id) {
        return (0, index_1.executeQuery)("SELECT * FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "='").concat(id, "'\n      AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0\n      "));
    };
    ProductCategoryRepo.createProductCategory = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.insertRecord)(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, obj)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, { productCategory: res }];
                }
            });
        });
    };
    ProductCategoryRepo.updateProductCategory = function (id, obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.updateRecord)("UPDATE ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " SET subCategoryId=?,name=?,description=?,image=?,isActive=? WHERE id='").concat(id, "'"), obj)];
            });
        });
    };
    ProductCategoryRepo.deleteById = function (id) {
        return (0, index_1.executeQuery)("UPDATE ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " SET ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=1 WHERE id='").concat(id, "'"));
    };
    ProductCategoryRepo.deleteByCatId = function (catId) {
        return (0, index_1.executeQuery)("UPDATE ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " SET ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isActive, "=0 WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, "='").concat(catId, "'"));
    };
    ProductCategoryRepo.productCategoriesIds = function (catId) {
        return (0, index_1.executeQuery)("SELECT ".concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, " FROM ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isActive, "=1 AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0 AND ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, "='").concat(catId, "'"));
    };
    ProductCategoryRepo.productCategoriesDeactivate = function (catId) {
        return (0, index_1.executeQuery)("UPDATE ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " SET ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isActive, "=0 WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, " IN (").concat(catId, ")"));
    };
    ProductCategoryRepo.productCategoriesCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT COUNT(*) as rowCount FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0"))];
            });
        });
    };
    ProductCategoryRepo.findByProductCategories = function (limit, offSet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " \n      WHERE ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.isDeleted, "=0 \n      ORDER BY ").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.name, " ASC\n      LIMIT ").concat(limit, " OFFSET ").concat(offSet))];
            });
        });
    };
    ProductCategoryRepo.bulkInsert = function (dateToDB) {
        return (0, index_1.executeQuery)("INSERT INTO ".concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " (subCategoryId,name,isActive,description) VALUES ").concat(dateToDB));
    };
    return ProductCategoryRepo;
}());
exports.default = ProductCategoryRepo;
//# sourceMappingURL=ProductCategoryRepo.js.map