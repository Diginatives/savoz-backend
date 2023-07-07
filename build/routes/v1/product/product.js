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
var authentication_1 = __importDefault(require("../../../auth/authentication"));
var ApiError_1 = require("../../../core/ApiError");
var ApiResponse_1 = require("../../../core/ApiResponse");
var product_responses_1 = require("../../../custom/product-responses");
var FavouriteProductRepo_1 = __importDefault(require("../../../database/repository/FavouriteProductRepo"));
var ProductRepo_1 = __importDefault(require("../../../database/repository/ProductRepo"));
var utils_1 = require("../../../function/utils");
var asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
var validator_1 = __importStar(require("../../../helpers/validator"));
var schema_1 = __importDefault(require("./schema"));
var router = express_1.default.Router();
router.post('/product_listing', (0, validator_1.default)(schema_1.default.productListing, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, subCategoryId, storeId, searchText, userId, _b, page, limit, offSet, listing, countTotal, countData, _c, _d, _e, _f;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = req.body, subCategoryId = _a.subCategoryId, storeId = _a.storeId, searchText = _a.searchText, userId = _a.userId;
                _b = (0, utils_1.getPaginationParams)(req), page = _b.page, limit = _b.limit, offSet = _b.offSet;
                if (!(subCategoryId && storeId)) return [3 /*break*/, 4];
                return [4 /*yield*/, ProductRepo_1.default.countBySubCategory(subCategoryId, storeId)];
            case 1:
                countData = _j.sent();
                return [4 /*yield*/, ProductRepo_1.default.findBySubCategory(subCategoryId, storeId, userId || null, limit, offSet)];
            case 2:
                listing = _j.sent();
                _c = ApiResponse_1.SuccessResponse.bind;
                _d = [void 0, 'success'];
                _g = {};
                return [4 /*yield*/, (0, product_responses_1.customSubCategoriesCollectionResponse)(listing)];
            case 3: return [2 /*return*/, new (_c.apply(ApiResponse_1.SuccessResponse, _d.concat([(_g.data = _j.sent(),
                        _g.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _g)])))().send(res)];
            case 4:
                if (!storeId) return [3 /*break*/, 7];
                return [4 /*yield*/, ProductRepo_1.default.countData(storeId, searchText ? searchText : '')];
            case 5:
                countTotal = _j.sent();
                return [4 /*yield*/, ProductRepo_1.default.getPaginationData(storeId, userId || null, searchText ? searchText : '', limit, offSet)];
            case 6:
                listing = _j.sent();
                return [3 /*break*/, 8];
            case 7: throw new ApiError_1.BadRequestError('SubcategoryId is required');
            case 8:
                _e = ApiResponse_1.SuccessResponse.bind;
                _f = [void 0, 'success'];
                _h = {};
                return [4 /*yield*/, (0, product_responses_1.customStoreCollectionResponse)(listing)];
            case 9: return [2 /*return*/, new (_e.apply(ApiResponse_1.SuccessResponse, _f.concat([(_h.data = _j.sent(),
                        _h.pagination = (0, utils_1.getPaginationObject)(page, countTotal[0].rowCount, limit),
                        _h)])))().send(res)];
        }
    });
}); }));
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
//Product Favorities API
router.get('/favourite', (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, limit, offSet, countData, listing, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = (0, utils_1.getPaginationParams)(req), page = _a.page, limit = _a.limit, offSet = _a.offSet;
                return [4 /*yield*/, FavouriteProductRepo_1.default.countByUserId(req['userId'])];
            case 1:
                countData = _e.sent();
                return [4 /*yield*/, FavouriteProductRepo_1.default.findByUserId(req['userId'], limit, offSet)];
            case 2:
                listing = _e.sent();
                _b = ApiResponse_1.SuccessResponse.bind;
                _c = [void 0, 'success'];
                _d = {};
                return [4 /*yield*/, (0, product_responses_1.customStoreCollectionResponse)(listing)];
            case 3: return [2 /*return*/, new (_b.apply(ApiResponse_1.SuccessResponse, _c.concat([(_d.data = _e.sent(),
                        _d.pagination = (0, utils_1.getPaginationObject)(page, countData[0].rowCount, limit),
                        _d)])))().send(res)];
        }
    });
}); }));
router.post('/favourite', (0, validator_1.default)(schema_1.default.favourite, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, productId, isFavExists, favouriteData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, productId = _a.productId;
                if (userId !== req['userId'])
                    throw new ApiResponse_1.BadRequestResponse('invalid userId').send(res);
                return [4 /*yield*/, FavouriteProductRepo_1.default.findByUserIdAndProductId(userId, productId)];
            case 1:
                isFavExists = _b.sent();
                if (isFavExists && isFavExists.length > 0) {
                    return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product added in favourites', isFavExists[0]).send(res)];
                }
                return [4 /*yield*/, FavouriteProductRepo_1.default.create(userId, productId)];
            case 2:
                favouriteData = _b.sent();
                if (favouriteData) {
                    return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product added in favourites', favouriteData.favouriteProduct).send(res)];
                }
                else
                    return [2 /*return*/, new ApiResponse_1.InternalErrorResponse().send(res)];
                return [2 /*return*/];
        }
    });
}); }));
router.delete('/favourite', (0, validator_1.default)(schema_1.default.favouriteId, validator_1.ValidationSource.BODY), (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favouriteId, favData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                favouriteId = req.body.favouriteId;
                return [4 /*yield*/, FavouriteProductRepo_1.default.findById(favouriteId)];
            case 1:
                favData = _a.sent();
                if (!favData || !favData[0]) {
                    return [2 /*return*/, new ApiResponse_1.NotFoundResponse('favourite Product not find').send(res)];
                }
                return [4 /*yield*/, FavouriteProductRepo_1.default.deleteById(favouriteId)];
            case 2:
                data = _a.sent();
                if (data.affectedRows) {
                    return [2 /*return*/, new ApiResponse_1.SuccessResponse('Product removed from favourites', {}).send(res)];
                }
                else
                    return [2 /*return*/, new ApiResponse_1.InternalErrorResponse().send(res)];
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
//# sourceMappingURL=product.js.map