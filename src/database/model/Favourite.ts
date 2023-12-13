export const FAVOURITE_PRODUCT_TABLE_NAME = 'userFavouriteProducts';

export const FAVOURITE_PRODUCT_COL = {
  id: 'id',
  userId: 'userId',
  productId: 'productId',
  createdAt: 'createdAt',
};

export default interface FavouriteProduct {
  id: number;
  userId: number;
  productId: number;
  createdAt?: Date;
}
