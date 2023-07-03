import urls from '../constants/urls';
import OrderRepo from '../database/repository/OrderRepo';
import UserRepo from '../database/repository/UserRepo';
import { getHomeForImage, getHomeUrl } from '../function/utils';
import { customUserResponse } from './user-responses';

export async function customOrderResponse(data: any) {
  const userObj: any = {
    ...data,
    user: await customOrderUserResponse(data.orderUserId),
    products: await customProductOrderCollectionResponse(data.orderId),
  };

  return userObj;
}

export async function customOrderCollectionResponse(data: any) {
  var orders = [];
  var i;
  for (i = 0; i < data.length; i++) {
    orders.push(await customOrderResponse(data[i]));
  }
  return orders;
}

export async function customProductResponse(product: any) {
  const productObj = {
    ProductTotalPrice: product.totalPrice,
    ProductTotalTax: product.totalTax,
    productId: product.productId,
    productCategoryId: product.productCategoryId,
    productStoreId: product.productStoreId,
    productItemSKU: product.productItemSKU,
    productItemBarCode: product.productItemBarCode,
    productItemName: product.productItemName,
    productItemBrand: product.productItemBrand,
    productItemSize: product.productItemSize,
    productItemColor: product.productItemColor,
    productItemDescription: product.productItemDescription,
    productItemImage: await getProductImage(product.productItemImage, product.productItemThumbnail),
    productItemThumbnail: product.productItemThumbnail
      ? getHomeForImage(urls.values.imageProductLiveUrl) + product.productItemThumbnail
      : `${getHomeUrl(urls.values.imageLiveUrl)}imgPlaceholder.png`,
    productIsActive: product.productIsActive,
    productUnitPrice: product.productUnitPrice,
    productIsTaxable: product.productIsTaxable,
    productTaxPercentage: product.productTaxPercentage,
    productQuantity: product.quantity,
    productPurchasedPrice: product.productPurchasedPrice,
    productComparativePrice: product.productComparativePrice,
    productRevenuePrice: product.productRevenuePrice,
    productGrossMargin: product.productGrossMargin,
    productItemExpiry: product.productItemExpiry,
    productDiscountAvailable: product.productDiscountAvailable,
    productDiscountActive: product.productDiscountActive,
    productFranchiseId: product.productFranchiseId,
    productCompanyId: product.productCompanyId,
    productCreatedAt: product.productCreatedAt,
    productUpdatedAt: product.productUpdatedAt,
  };
  return productObj;
}

export async function customProductOrderCollectionResponse(data: any) {
  var orderProducts = [];
  const products = await OrderRepo.findProductsByOrderId(data);
  var i;
  for (i = 0; i < products.length; i++) {
    orderProducts.push(await customProductResponse(products[i]));
  }
  return orderProducts;
}

export async function customOrderUserResponse(userId: number) {
  const user: any = await UserRepo.findById(userId);
  return await customUserResponse(user[0]);
}

export async function getProductImage(image: any, thumbnail: any) {
  if (image) return getHomeForImage(urls.values.imageProductLiveUrl) + image;
  if (thumbnail) return getHomeForImage(urls.values.imageProductLiveUrl) + thumbnail;
  else return `${getHomeUrl(urls.values.imageLiveUrl)}imgPlaceholder.png`;
}
