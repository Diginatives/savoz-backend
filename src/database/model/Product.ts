export const PRODUCT_TABLE_NAME = 'products';

export const PRODUCT_COL = {
  productId: 'productId',
  productCategoryId: 'productCategoryId',
  productStoreId: 'productStoreId',
  productIsTaxable: 'productIsTaxable',
  productTaxPercentage: 'productTaxPercentage',
  productItemSKU: 'productItemSKU',
  productItemBarCode: 'productItemBarCode',
  productItemName: 'productItemName',
  productItemBrand: 'productItemBrand',
  productItemSize: 'productItemSize',
  productUnitPrice: 'productUnitPrice',
  productQuantity: 'productQuantity',
  productItemColor: 'productItemColor',
  productItemDescription: 'productItemDescription',
  productItemThumbnail: 'productItemThumbnail',
  productIsActive: 'productIsActive',
  productItemImage: 'productItemImage',
  productPurchasedPrice: 'productPurchasedPrice',
  productComparativePrice: 'productComparativePrice',
  productRevenuePrice: 'productRevenuePrice',
  productGrossMargin: 'productGrossMargin',
  productItemExpiry: 'productItemExpiry',
  productDiscountAvailable: 'productDiscountAvailable',
  productDiscountActive: 'productDiscountActive',
  productFranchiseId: 'productFranchiseId',
  productCompanyId: 'productCompanyId',
  productIsDeleted: 'productIsDeleted',
  productCreatedAt: 'productCreatedAt',
  productUpdatedAt: 'productUpdatedAt',
};

export default interface Product {
  productId?: number;
  productCategoryId: number;
  productStoreId: number;
  productIsActive?: boolean;
  productIsTaxable?: boolean;
  productItemSKU?: string;
  productItemBarCode?: string;
  productItemName?: string;
  productItemBrand?: string;
  productItemSize?: string;
  productItemColor?: string;
  productItemDescription?: string;
  productItemImage?: string;
  productUnitPrice?: string;
  productTaxPercentage?: string;
  productPurchasedPrice?: number;
  productComparativePrice?: number;
  productRevenuePrice?: number;
  productGrossMargin?: number;
  productItemExpiry?: Date;
  productDiscountAvailable?: number;
  productDiscountActive?: boolean;
  productFranchiseId?: number;
  productCompanyId?: number;
  productIsDeleted?: number;
  productCreatedAt?: Date;
  productUpdatedAt?: Date;
}
