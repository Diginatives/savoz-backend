export const STORE_SUB_CATEGORY_TABLE_NAME = 'storeSubCategories';

export const STORE_SUB_CATEGORY_COL = {
  id: 'id',
  subCategoryId: 'subCategoryId',
  storeId: 'storeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface StoreSubCategory {
  id: number;
  subCategoryId: number;
  storeId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
