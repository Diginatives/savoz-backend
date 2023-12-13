import ProductImage, { PRODUCT_IMAGES_TABLE_NAME } from '../../model/admin/ProductImage';
import { PRODUCT_COL } from '../../model/Product';
import { insertRecord, executeQuery, updateRecord } from '../../index';

export default class ProductImageRepo {
  public static async createProductImage(
    obj: ProductImage,
  ): Promise<{ productImage: ProductImage }> {
    const res: ProductImage = await insertRecord(PRODUCT_IMAGES_TABLE_NAME, obj);
    return { productImage: res };
  }
  public static async findByProductId(productId: number): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_IMAGES_TABLE_NAME} WHERE ${PRODUCT_COL.productId} = ${productId} LIMIT 1`,
    );
  }

  public static async updateProductImage(
    productId: number,
    obj: any,
  ): Promise<{ productImage: ProductImage }> {
    return updateRecord(
      `UPDATE ${PRODUCT_IMAGES_TABLE_NAME} SET 
      image= ?
      WHERE id=${productId}`,
      obj,
    );
  }
}
