import urls from '../constants/urls';
import { getHomeForImage, getHomeUrl } from '../function/utils';

export async function customAdminSubCategoryResponse(data: any) {
  // console.log(data, 'data');
  const subCategoryObj = {
    subCategoryId: data.subCategoryId,
    subCategoryMainCategoryId: data.subCategoryMainCategoryId,
    subCategoryName: data.subCategoryName,
    subCategoryDescription: data.subCategoryDescription,
    categoryImage: data.subCategoryImage,
    subCategoryImage: data.subCategoryImage
      ? getHomeForImage(urls.values.imageCategoryLiveUrl) + data.subCategoryImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    subCategoryIsDeleted: data.subCategoryIsDeleted,
    subCategoryIsActive: data.subCategoryIsActive,
    subCategoryCreatedAt: data.subCategoryCreatedAt,
    subCategoryUpdatedAt: data.subCategoryUpdatedAt,
    total_proucts: data.total_proucts,
    storeSubCategoryId: data.id,
    storeId: data.storeId,
    storeSubCategoryCreatedAt: data.createdAt,
    storeSubCategoryUpdatedAt: data.updatedAt,
  };
  // console.log(subCategoryObj, 'subCategoryObj');
  return subCategoryObj;
}

export async function customSubCategoryCollectionResponse(data: any) {
  var subCategories = [];
  var i;
  for (i = 0; i < data.length; i++) {
    subCategories.push(await customAdminSubCategoryResponse(data[i]));
  }
  // console.log(subCategories, 'tayayb chohan');
  return subCategories;
}
