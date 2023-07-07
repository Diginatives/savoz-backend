"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    productFormData: joi_1.default.object().keys({
        productCategoryId: joi_1.default.number().required(),
        productItemName: joi_1.default.string().required().max(100),
        productItemSKU: joi_1.default.string().required().max(50),
        productItemDescription: joi_1.default.string().optional(),
        file: joi_1.default.string().optional().uri(),
        productIsActive: joi_1.default.number().optional(),
        productStoreId: joi_1.default.number().optional(),
        productItemExpiry: joi_1.default.date().optional(),
        productIsTaxable: joi_1.default.number().optional(),
        productTaxPercentage: joi_1.default.number().optional(),
        productItemBarCode: joi_1.default.string().required().max(20),
        productPurchasedPrice: joi_1.default.number().optional(),
        productQuantity: joi_1.default.number().required(),
        productItemBrand: joi_1.default.string().optional().max(100),
        productUnitPrice: joi_1.default.number().required(),
        productComparativePrice: joi_1.default.number().optional(),
        productImage: joi_1.default.string().optional().allow(''),
    }),
    updateProductData: joi_1.default.object().keys({
        productId: joi_1.default.number().required(),
        productCategoryId: joi_1.default.number().required(),
        productItemName: joi_1.default.string().required().max(100),
        productItemDescription: joi_1.default.string().optional(),
        productStoreId: joi_1.default.number().optional(),
        file: joi_1.default.string().optional().uri(),
        productIsActive: joi_1.default.number().optional(),
        productItemExpiry: joi_1.default.date().optional(),
        productIsTaxable: joi_1.default.number().optional(),
        productTaxPercentage: joi_1.default.number().optional(),
        productPurchasedPrice: joi_1.default.number().optional(),
        productQuantity: joi_1.default.number().required(),
        productItemBrand: joi_1.default.string().optional().max(100),
        productUnitPrice: joi_1.default.number().required(),
        productComparativePrice: joi_1.default.number().optional(),
        productItemSKU: joi_1.default.string().required().max(50),
        productItemBarCode: joi_1.default.string().required().max(20),
    }),
    file: joi_1.default.object().keys({
        file: joi_1.default.string().optional().uri(),
    }),
    productList: joi_1.default.object().keys({
        subCategoryId: joi_1.default.number().optional(),
        productCategoryId: joi_1.default.number().optional(),
        storeId: joi_1.default.number().optional(),
        allProducts: joi_1.default.number().optional(),
        search: joi_1.default.object().optional(),
    }),
};
//# sourceMappingURL=schema.js.map