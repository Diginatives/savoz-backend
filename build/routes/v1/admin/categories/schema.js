"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    subCategory: joi_1.default.object().keys({
        id: joi_1.default.number().optional(),
        mainCategoryId: joi_1.default.number().required(),
        name: joi_1.default.string().optional().min(3),
        description: joi_1.default.string().optional(),
        isActive: joi_1.default.number().optional(),
        categoryImage: joi_1.default.string().optional().allow(''),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.string().optional().uri(),
    }),
    subCategoryListing: joi_1.default.object().keys({
        type: joi_1.default.string().required(),
    }),
    productListing: joi_1.default.object().keys({
        subCategoryId: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=schema.js.map