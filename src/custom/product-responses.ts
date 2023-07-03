import urls from '../constants/urls';
import { getHomeForImage, getHomeUrl } from '../function/utils';

export async function customSubCategoriesResponse(data: any) {
  const productObj = {
    productId: data.productId,
    productCategoryId: data.productCategoryId,
    productStoreId: data.productStoreId,
    productItemSKU: data.productItemSKU,
    productItemBarCode: data.productItemBarCode,
    productItemName: data.productItemName,
    productItemBrand: data.productItemBrand,
    productItemSize: data.productItemSize,
    productItemColor: data.productItemColor,
    productItemDescription: data.productItemDescription,
    productItemImage: await getProductImage(data.productItemImage, data.productItemThumbnail),
    productItemThumbnail: data.productItemThumbnail
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productItemThumbnail
      : `${getHomeUrl(urls.values.imageLiveUrl)}imgPlaceholder.png`,
    productIsActive: data.productIsActive,
    productUnitPrice: data.productUnitPrice,
    productIsTaxable: data.productIsTaxable,
    productTaxPercentage: data.productTaxPercentage,
    productQuantity: data.productQuantity,
    productPurchasedPrice: data.productPurchasedPrice,
    productComparativePrice: data.productComparativePrice,
    productRevenuePrice: data.productRevenuePrice,
    productGrossMargin: data.productGrossMargin,
    productItemExpiry: data.productItemExpiry,
    productDiscountAvailable: data.productDiscountAvailable,
    productDiscountActive: data.productDiscountActive,
    productFranchiseId: data.productFranchiseId,
    productCompanyId: data.productCompanyId,
    productCreatedAt: data.productCreatedAt,
    productUpdatedAt: data.productUpdatedAt,
    productCategoryName: data.name,
    productCategoryNameDescription: data.description,
    subCategoryId: data.subCategoryId,
    list_priority: data.list_priority,
    productCategoryImage: data.productCategoryImage
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productCategoryImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    productCategoryIsActive: data.isActive,
    productFavouriteId: data.favouriteId,
  };
  return productObj;
}

export async function customSubCategoriesCollectionResponse(data: any) {
  var products = [];
  var i;
  for (i = 0; i < data.length; i++) {
    products.push(await customSubCategoriesResponse(data[i]));
  }
  return products;
}

export async function customStoreResponse(data: any) {
  const productObj = {
    productId: data.productId,
    productCategoryId: data.productCategoryId,
    productStoreId: data.productStoreId,
    productItemSKU: data.productItemSKU,
    productItemBarCode: data.productItemBarCode,
    productItemName: data.productItemName,
    productItemBrand: data.productItemBrand,
    productItemSize: data.productItemSize,
    productItemColor: data.productItemColor,
    productItemDescription: data.productItemDescription,
    productItemImage: await getProductImage(data.productItemImage, data.productItemThumbnail),
    productIsActive: data.productIsActive,
    productUnitPrice: data.productUnitPrice,
    productIsTaxable: data.productIsTaxable,
    productTaxPercentage: data.productTaxPercentage,
    productCreatedAt: data.productCreatedAt,
    productUpdatedAt: data.productUpdatedAt,
    productFavouriteId: data.favouriteId,
  };
  return productObj;
}

export async function customStoreCollectionResponse(data: any) {
  var products = [];
  var i;
  for (i = 0; i < data.length; i++) {
    products.push(await customSubCategoriesResponse(data[i]));
  }
  return products;
}

export async function customProductResponse(data: any) {
  const productObj = {
    productId: data.productId,
    productCategoryId: data.productCategoryId,
    productStoreId: data.productStoreId,
    productItemSKU: data.productItemSKU,
    productItemBarCode: data.productItemBarCode,
    productItemName: data.productItemName,
    productItemBrand: data.productItemBrand,
    productItemSize: data.productItemSize,
    productItemColor: data.productItemColor,
    productItemDescription: data.productItemDescription,
    productItemImage: await getProductImage(data.productItemImage, data.productItemThumbnail),
    productIsActive: data.productIsActive,
    productUnitPrice: data.productUnitPrice,
    productIsTaxable: data.productIsTaxable,
    productTaxPercentage: data.productTaxPercentage,
    productCreatedAt: data.productCreatedAt,
    productUpdatedAt: data.productUpdatedAt,
  };
  return productObj;
}

export async function getProductImage(image: any, thumbnail: any) {
  if (image) return getHomeForImage(urls.values.imageProductLiveUrl) + image;
  if (thumbnail) return getHomeForImage(urls.values.imageProductLiveUrl) + thumbnail;
  else return `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`;
}
