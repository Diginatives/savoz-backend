import urls from '../constants/urls';
import { getHomeForImage, getHomeUrl } from '../function/utils';

export async function customFavouriteResponse(data: any) {
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
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productItemImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    productItemThumbnail: data.productItemThumbnail
      ? getHomeForImage(urls.values.imageProductLiveUrl) + data.productItemThumbnail
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
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
      ? getHomeForImage(urls.values.imageCategoryLiveUrl) + data.productCategoryImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    productCategoryIsActive: data.isActive,
    productFavouriteId: data.favouriteId,
  };

  return userObj;
}

export async function customFavouriteCollectionResponse(data: any) {
  var favs = [];
  var i;
  for (i = 0; i < data.length; i++) {
    favs.push(await customFavouriteResponse(data[i]));
  }
  return favs;
}
