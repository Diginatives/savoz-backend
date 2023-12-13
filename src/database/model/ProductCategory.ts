export const PRODUCT_CATEGORY_TABLE_NAME = 'productCategories';

export const PRODUCT_CATEGORY_COL = {
  id: 'id',
  subCategoryId: 'subCategoryId',
  name: 'name',
  description: 'description',
  image: 'image',
  isDeleted: 'isDeleted',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface ProductCategory {
  id?: string;
  subCategoryId: string;
  name: string;
  description?: string;
  image?: string;
  isDeleted: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
