import urls from '../constants/urls';
import { getHomeUrl, getHomeForImage } from '../function/utils';

export function productsResponse(data: any) {
  const userObj = {
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
    productItemImageName: data.productItemImage,
    productItemImage: data.productItemImage
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productItemImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    productItemThumbnail: data.productItemThumbnail
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productItemThumbnail
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    productIsActive: data.productIsActive,
    productUnitPrice: data.productUnitPrice,
    productPurchasedPrice: data.productPurchasedPrice,
    productRevenuePrice: data.productRevenuePrice,
    productComparativePrice: data.productComparativePrice,
    productQuantity: data.productQuantity,
    productIsTaxable: data.productIsTaxable,
    productTaxPercentage: data.productTaxPercentage,
    productCreatedAt: data.productCreatedAt,
    productUpdatedAt: data.productUpdatedAt,
    productCategoryName: data.name,
    productCategoryNameDescription: data.description,
    subCategoryId: data.subCategoryId,
    list_priority: data.list_priority,
    productCategoryImage: data.productCategoryImage
      ? getHomeUrl(urls.values.imageCategoryLiveUrl) + data.productCategoryImage
      : `${getHomeUrl(urls.values.imageCategoryLiveUrl)}default_sub_category.png`,
    productCategoryIsActive: data.isActive,
  };
  return userObj;
}

export async function productsCollectionResponse(data: any) {
  var products = [];
  var i;
  for (i = 0; i < data.length; i++) {
    products.push(productsResponse(data[i]));
  }
  return products;
}

export function customStoreResponse(data: any) {
  const userObj = {
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
    productItemImage: data.productItemImage
      ? getHomeUrl(urls.values.imageCategoryLiveUrl) + data.productItemImage
      : `${getHomeUrl(urls.values.imageCategoryLiveUrl)}default_sub_category.png`,
    productIsActive: data.productIsActive,
    productUnitPrice: data.productUnitPrice,
    productIsTaxable: data.productIsTaxable,
    productTaxPercentage: data.productTaxPercentage,
    productCreatedAt: data.productCreatedAt,
    productUpdatedAt: data.productUpdatedAt,
  };
  return userObj;
}

export async function customStoreCollectionResponse(data: any) {
  var products = [];
  var i;
  for (i = 0; i < data.length; i++) {
    products.push(await customStoreResponse(data[i]));
  }
  return products;
}
