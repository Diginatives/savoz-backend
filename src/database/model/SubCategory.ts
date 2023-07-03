export const SUB_CATEGORY_TABLE_NAME = 'subCategories';

export const SUB_CATEGORY_COL = {
  id: 'subCategoryId',
  mainCategoryId: 'subCategoryMainCategoryId',
  name: 'subCategoryName',
  description: 'subCategoryDescription',
  image: 'subCategoryImage',
  isDeleted: 'subCategoryIsDeleted',
  isActive: 'subCategoryIsActive',
  subCategoryIsDeleted: 'subCategoryIsDeleted',
  createdAt: 'subCategoryCreatedAt',
  updatedAt: 'subCategoryUpdatedAt',
};

export default interface SubCategory {
  subCategoryId?: number;
  subCategoryMainCategoryId: number;
  subCategoryName: string;
  subCategoryDescription: string;
  subCategoryImage?: string;
  subCategoryIsDeleted?: number;
  subCategoryIsActive?: number;
  subCategoryCreatedAt?: Date;
  subCategoryUpdatedAt?: Date;
}
