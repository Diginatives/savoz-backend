export const MAIN_CATEGORY_TABLE_NAME = 'mainCategories';

export const MAIN_CATEGORY_COL = {
  id: 'id',
  name: 'name',
  description: 'description',
  image: 'image',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface SubCategory {
  id?: number;
  name: string;
  subCategoryDescription: string;
  image?: string;
  isActive?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
