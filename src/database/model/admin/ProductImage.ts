export const PRODUCT_IMAGES_TABLE_NAME = 'productImages';

export const PRODUCT_IMAGE_COL = {
  id: 'id',
  productId: 'productId',
  image: 'image',
};

export default interface ProductImage {
  id?: number;
  productId?: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
