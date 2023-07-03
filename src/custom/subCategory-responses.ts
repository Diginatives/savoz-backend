import urls from '../constants/urls';
import { getHomeForImage, getHomeUrl } from '../function/utils';

export async function customSubCategoryResponse(data: any) {
  const subCategoryObj = {
    subCategoryId: data.subCategoryId,
    subCategoryMainCategoryId: data.subCategoryMainCategoryId,
    subCategoryName: data.subCategoryName,
    subCategoryDescription: data.subCategoryDescription,
    subCategoryImage: data.subCategoryImage
      ? getHomeForImage(urls.values.imageCategoryLiveUrl) + data.subCategoryImage
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    subCategoryIsDeleted: data.subCategoryIsDeleted,
    subCategoryIsActive: data.subCategoryIsActive,
    subCategoryCreatedAt: data.subCategoryCreatedAt,
    subCategoryUpdatedAt: data.subCategoryUpdatedAt,
    storeSubCategoryId: data.id,
    storeId: data.storeId,
    storeSubCategoryCreatedAt: data.createdAt,
    storeSubCategoryUpdatedAt: data.updatedAt,
  };

  return subCategoryObj;
}

export async function customSubCategoryCollectionResponse(data: any) {
  var subCategories = [];
  var i;
  for (i = 0; i < data.length; i++) {
    subCategories.push(await customSubCategoryResponse(data[i]));
  }
  return subCategories;
}
