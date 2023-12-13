import urls from '../constants/urls';
import { getHomeForImage, getHomeUrl } from '../function/utils';

export async function customProductCategoryResponse(data: any) {
  const subCategoryObj = {
    id: data.id,
    subCategoryId: data.subCategoryId,
    name: data.name,
    description: data.description,
    categoryImage: data.image,
    image: data.image
      ? getHomeForImage(urls.values.imageCategoryLiveUrl) + data.image
      : `${getHomeUrl(urls.values.imageDummyLiveUrl)}default_sub_category.png`,
    isDeleted: data.isDeleted,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  return subCategoryObj;
}

export async function customProductCategoryCollectionResponse(data: any) {
  const productCategories: any = [];
  let i;
  for (i = 0; i < data.length; i++) {
    productCategories.push(await customProductCategoryResponse(data[i]));
  }
  return productCategories;
}
