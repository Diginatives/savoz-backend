"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    productCategory: joi_1.default.object().keys({
        id: joi_1.default.number().optional(),
        subCategoryId: joi_1.default.number().required(),
        name: joi_1.default.string().optional().min(3),
        description: joi_1.default.string().optional(),
        categoryImage: joi_1.default.string().optional().allow(''),
        isActive: joi_1.default.number().optional(),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.string().optional().uri(),
    }),
    productCategoryListing: joi_1.default.object().keys({
        type: joi_1.default.string().required(),
    }),
    productCategorySearch: joi_1.default.object().keys({
        subCategoryId: joi_1.default.number().optional(),
        search: joi_1.default.object().optional(),
    }),
};
//# sourceMappingURL=schema.js.map