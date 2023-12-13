import { updateData } from '../../interfaces/default_types';
import { executeQuery, insertRecord } from '../index';
import FavouriteProduct, {
  FAVOURITE_PRODUCT_COL,
  FAVOURITE_PRODUCT_TABLE_NAME,
} from '../model/Favourite';
import { PRODUCT_COL, PRODUCT_TABLE_NAME } from '../model/Product';

export default class FavouriteProductRepo {
  public static findByUserIdAndProductId(userId: number, productId: number) {
    return executeQuery(
      `select * from ${FAVOURITE_PRODUCT_TABLE_NAME} where ${FAVOURITE_PRODUCT_COL.userId} = ${userId} and ${FAVOURITE_PRODUCT_COL.productId} = ${productId}  `,
    );
  }

  public static countByUserId(id: number) {
    return executeQuery(
      `select count(*) as rowCount from ${FAVOURITE_PRODUCT_TABLE_NAME} where ${FAVOURITE_PRODUCT_COL.userId} = ${id}`,
    );
  }

  public static findById(id: number): Promise<FavouriteProduct> {
    return executeQuery(
      `select * from ${FAVOURITE_PRODUCT_TABLE_NAME} where ${FAVOURITE_PRODUCT_COL.id} = ${id}`,
    );
  }

  public static deleteById(id: number): Promise<updateData> {
    return executeQuery(
      `delete from ${FAVOURITE_PRODUCT_TABLE_NAME} where ${FAVOURITE_PRODUCT_COL.id} = ${id}`,
    );
  }

  public static findByUserId(id: number, limit: number, offSet: number): Promise<FavouriteProduct> {
    return executeQuery(
      `SELECT *,${FAVOURITE_PRODUCT_TABLE_NAME}.${
        FAVOURITE_PRODUCT_COL.id
      } as ${`favouriteId`} FROM ${FAVOURITE_PRODUCT_TABLE_NAME} LEFT JOIN ${PRODUCT_TABLE_NAME} 
      on ${FAVOURITE_PRODUCT_TABLE_NAME}.${
        FAVOURITE_PRODUCT_COL.productId
      } = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} 
      WHERE ${FAVOURITE_PRODUCT_TABLE_NAME}.${FAVOURITE_PRODUCT_COL.userId}  = ${id}
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static async create(
    userId: number,
    productId: string,
  ): Promise<{ favouriteProduct: FavouriteProduct }> {
    const now = new Date();
    const res: FavouriteProduct = await insertRecord(FAVOURITE_PRODUCT_TABLE_NAME, {
      userId,
      productId,
      createdAt: now,
    });
    return { favouriteProduct: res };
  }
}
