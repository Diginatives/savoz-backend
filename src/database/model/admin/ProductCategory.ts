export const PRODUCT_CATEGORIES_TABLE_NAME = 'productCategories';

export const PRODUCT_CATEGORIES_COL = {
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
  id?: number;
  subCategoryId: number;
  name: string;
  description: string;
  image?: string;
  isDeleted?: number;
  isActive: number;
  createdAt?: Date;
  updatedAt?: Date;
}
