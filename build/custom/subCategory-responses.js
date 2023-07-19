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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSubCategoryCollectionResponse = exports.customSubCategoryResponse = void 0;
var urls_1 = __importDefault(require("../constants/urls"));
var utils_1 = require("../function/utils");
function customSubCategoryResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var subCategoryObj;
        return __generator(this, function (_a) {
            subCategoryObj = {
                subCategoryId: data.subCategoryId,
                subCategoryMainCategoryId: data.subCategoryMainCategoryId,
                subCategoryName: data.subCategoryName,
                subCategoryDescription: data.subCategoryDescription,
                subCategoryImage: data.subCategoryImage
                    ? (0, utils_1.getHomeForImage)(urls_1.default.values.imageCategoryLiveUrl) + data.subCategoryImage
                    : "".concat((0, utils_1.getHomeUrl)(urls_1.default.values.imageDummyLiveUrl), "default_sub_category.png"),
                subCategoryIsDeleted: data.subCategoryIsDeleted,
                subCategoryIsActive: data.subCategoryIsActive,
                subCategoryCreatedAt: data.subCategoryCreatedAt,
                subCategoryUpdatedAt: data.subCategoryUpdatedAt,
                storeId: data.mystoreId,
                storeSubCategoryId: data.mystoreSubCategoryId,
                total_proucts: data.total_proucts,
                storeSubCategoryCreatedAt: data.subCategoryCreatedAt,
                storeSubCategoryUpdatedAt: data.subCategoryUpdatedAt,
                // storeSubCategoryId: data.id,
                // storeId: data.storeId,
                // storeSubCategoryCreatedAt: data.createdAt,
                // storeSubCategoryUpdatedAt: data.updatedAt,
            };
            return [2 /*return*/, subCategoryObj];
        });
    });
}
exports.customSubCategoryResponse = customSubCategoryResponse;
function customSubCategoryCollectionResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var subCategories, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    subCategories = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < data.length)) return [3 /*break*/, 4];
                    _b = (_a = subCategories).push;
                    return [4 /*yield*/, customSubCategoryResponse(data[i])];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, subCategories];
            }
        });
    });
}
exports.customSubCategoryCollectionResponse = customSubCategoryCollectionResponse;
//# sourceMappingURL=subCategory-responses.js.map