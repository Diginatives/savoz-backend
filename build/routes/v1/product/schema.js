"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    productListing: joi_1.default.object().keys({
        subCategoryId: joi_1.default.number().optional(),
        storeId: joi_1.default.number().optional(),
        searchText: joi_1.default.optional(),
        userId: joi_1.default.optional(),
    }),
    search: joi_1.default.object().keys({
        searchText: joi_1.default.optional(),
    }),
    favourite: joi_1.default.object().keys({
        userId: joi_1.default.number().required(),
        productId: joi_1.default.number().required(),
    }),
    favouriteId: joi_1.default.object().keys({
        favouriteId: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=schema.js.map