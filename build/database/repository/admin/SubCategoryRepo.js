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
var SubCategory_1 = require("../../model/SubCategory");
var index_1 = require("../../index");
var SubCategory_2 = require("../../model/SubCategory");
var ProductCategory_1 = require("../../model/admin/ProductCategory");
var Product_1 = require("../../model/Product");
var SubCategoryRepo = /** @class */ (function () {
    function SubCategoryRepo() {
    }
    SubCategoryRepo.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, " \n      WHERE ").concat(SubCategory_1.SUB_CATEGORY_COL.id, "='").concat(id, "'\n      AND ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.isDeleted, "=0"))];
            });
        });
    };
    SubCategoryRepo.fidnByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT * FROM ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, " \n      WHERE ").concat(SubCategory_1.SUB_CATEGORY_COL.name, "='").concat(name, "'\n      AND ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.isDeleted, "=0"))];
            });
        });
    };
    SubCategoryRepo.findByMainCategoryId = function (mainCategoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`SELECT ${SUB_CATEGORY_TABLE_NAME}.*,${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId} as mysubCategoryId ,${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.storeId} as mystoreId,
                // ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId} as mystoreSubCategoryId,
                //   sum(case when ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} is not null THEN  1 else 0 END)  as total_proucts
                //   FROM ${SUB_CATEGORY_TABLE_NAME}
                //   LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} on ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
                //   LEFT JOIN ${PRODUCT_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
                //   LEFT JOIN ${STORE_SUB_CATEGORY_TABLE_NAME} on ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id} = ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId}
                //   AND ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.storeId} =1
                //   WHERE ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.mainCategoryId}='${mainCategoryId}'
                //   AND ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.isDeleted}=0
                //   GROUP BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
                //   ORDER BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name} ASC`);
                return [2 /*return*/, (0, index_1.executeQuery)("SELECT ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".*, \n    sum(case when ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " is not null THEN  1 else 0 END)  as total_proucts\n    FROM ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, "\n    LEFT JOIN ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, " on ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.subCategoryId, " = ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.id, "\n    LEFT JOIN ").concat(Product_1.PRODUCT_TABLE_NAME, " on ").concat(Product_1.PRODUCT_TABLE_NAME, ".").concat(Product_1.PRODUCT_COL.productCategoryId, " = ").concat(ProductCategory_1.PRODUCT_CATEGORIES_TABLE_NAME, ".").concat(ProductCategory_1.PRODUCT_CATEGORIES_COL.id, "\n    WHERE ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.mainCategoryId, "='").concat(mainCategoryId, "'\n    AND ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.isDeleted, "=0\n    GROUP BY ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.id, "\n    ORDER BY ").concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, ".").concat(SubCategory_1.SUB_CATEGORY_COL.name, " ASC;"))];
            });
        });
    };
    SubCategoryRepo.createSubCategory = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.insertRecord)(SubCategory_2.SUB_CATEGORY_TABLE_NAME, obj)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    SubCategoryRepo.updateSubCategory = function (id, obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.updateRecord)("UPDATE ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, " \n      SET ").concat(SubCategory_1.SUB_CATEGORY_COL.mainCategoryId, "=?,").concat(SubCategory_1.SUB_CATEGORY_COL.name, "=?,").concat(SubCategory_1.SUB_CATEGORY_COL.description, "=?,").concat(SubCategory_1.SUB_CATEGORY_COL.image, "=?,").concat(SubCategory_1.SUB_CATEGORY_COL.isActive, "=?,").concat(SubCategory_1.SUB_CATEGORY_COL.updatedAt, "=? WHERE ").concat(SubCategory_1.SUB_CATEGORY_COL.id, "='").concat(id, "'"), obj)];
            });
        });
    };
    SubCategoryRepo.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("UPDATE ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, " SET ").concat(SubCategory_1.SUB_CATEGORY_COL.isDeleted, "=1 WHERE ").concat(SubCategory_1.SUB_CATEGORY_COL.id, "='").concat(id, "'"))];
            });
        });
    };
    SubCategoryRepo.bulkInsert = function (dateToDB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, index_1.executeQuery)("INSERT INTO ".concat(SubCategory_2.SUB_CATEGORY_TABLE_NAME, " (").concat(SubCategory_1.SUB_CATEGORY_COL.mainCategoryId, ",").concat(SubCategory_1.SUB_CATEGORY_COL.name, ",").concat(SubCategory_1.SUB_CATEGORY_COL.description, ",").concat(SubCategory_1.SUB_CATEGORY_COL.isActive, ") VALUES ").concat(dateToDB))];
            });
        });
    };
    return SubCategoryRepo;
}());
exports.default = SubCategoryRepo;
//# sourceMappingURL=SubCategoryRepo.js.map