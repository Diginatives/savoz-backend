import Product from '../../model/Product';
import { executeQuery, insertRecord, updateRecord } from '../../index';
import { PRODUCT_TABLE_NAME, PRODUCT_COL } from '../../model/Product';
import { PRODUCT_IMAGES_TABLE_NAME, PRODUCT_IMAGE_COL } from '../../model/admin/ProductImage';
import { SUB_CATEGORY_TABLE_NAME, SUB_CATEGORY_COL } from '../../model/SubCategory';
import {
  PRODUCT_CATEGORIES_TABLE_NAME,
  PRODUCT_CATEGORIES_COL,
} from '../../model/admin/ProductCategory';

export default class ProductRepo {
  private static searchCondition(productCategoryId: any, searchTerm: string) {
    let condition = '';
    if (productCategoryId != '' && searchTerm != '') {
      condition = `${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId}='${productCategoryId}' 
      AND (${PRODUCT_COL.productItemSKU} LIKE '%${searchTerm}%' OR ${PRODUCT_COL.productItemName} LIKE '%${searchTerm}%' OR ${PRODUCT_CATEGORIES_COL.name} LIKE '%${searchTerm}%')`;
    } else if (productCategoryId != '' && searchTerm === '') {
      condition = `${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId}='${productCategoryId}'`;
    } else if (productCategoryId == '' && searchTerm !== '') {
      condition = `(${PRODUCT_COL.productItemSKU} LIKE '%${searchTerm}%' OR ${PRODUCT_COL.productItemName} LIKE '%${searchTerm}%' OR ${PRODUCT_CATEGORIES_COL.name} LIKE '%${searchTerm}%')`;
    }
    return condition;
  }

  public static findById(productStoreId: number, id: number): Promise<Product | null> {
    return executeQuery(
      `SELECT
      ${PRODUCT_TABLE_NAME}.*,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image},
      ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.name} as productCategoryName,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image},
      ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId},
      ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name}
      FROM ${PRODUCT_TABLE_NAME}
      LEFT JOIN ${PRODUCT_IMAGES_TABLE_NAME}
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} = ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.productId}
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME}
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      LEFT JOIN ${SUB_CATEGORY_TABLE_NAME}
      ON ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
      WHERE ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId}='${id}'
      AND ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productStoreId}='${productStoreId}'
      AND ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productIsDeleted}=0 `,
    );
  }

  public static findByName(name: string): Promise<Product | null> {
    return executeQuery(
      `SELECT
      ${PRODUCT_TABLE_NAME}.* 
      FROM ${PRODUCT_TABLE_NAME}
      WHERE ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName}='${name}'
      AND ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productIsDeleted}=0 `,
    );
  }

  public static getAllProducts(offSet: number): Promise<any> {
    return executeQuery(
      `SELECT 
      ${PRODUCT_TABLE_NAME}.*,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image},
      ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.name} as productCategoryName,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image},
      ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId},
      ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name}
      FROM ${PRODUCT_TABLE_NAME}
      LEFT JOIN ${PRODUCT_IMAGES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} = ${PRODUCT_TABLE_NAME}.${PRODUCT_IMAGE_COL.productId}
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      LEFT JOIN ${SUB_CATEGORY_TABLE_NAME} 
      ON ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
      WHERE ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productIsDeleted}=0
      ORDER BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name} ASC
      LIMIT ${offSet}, 50`,
    );
  }

  public static findByCategoryId(categoryId: number): Promise<any> {
    return executeQuery(
      `SELECT
      ${PRODUCT_TABLE_NAME}.*,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image},
      ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.name} as productCategoryName,
      ${PRODUCT_IMAGES_TABLE_NAME}.${PRODUCT_IMAGE_COL.image}
      FROM ${PRODUCT_TABLE_NAME} 
      WHERE ${PRODUCT_COL.productCategoryId}='${categoryId}' 
      AND ${PRODUCT_COL.productIsDeleted}=0`,
    );
  }

  public static async productCountBySubCategory(id: number): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${PRODUCT_TABLE_NAME} 
      INNER JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${id}`,
    );
  }

  public static async findBySubCategory(id: number, limit: number, offSet: number): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_TABLE_NAME} 
      INNER JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${id} 
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static async productCountBySearch(
    productStoreId: number,
    productCategoryId: any,
    searchTerm: string,
  ): Promise<any> {
    const condition = this.searchCondition(productCategoryId, searchTerm);
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${PRODUCT_TABLE_NAME}
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${condition} 
      AND ${PRODUCT_COL.productStoreId} = ${productStoreId}
      AND ${PRODUCT_COL.productIsDeleted}=0`,
    );
  }

  public static async findBySearch(
    productStoreId: number,
    productCategoryId: any,
    searchTerm: string,
    limit: number,
    offSet: number,
  ): Promise<any> {
    const condition = this.searchCondition(productCategoryId, searchTerm);
    console.log(`SELECT * FROM ${PRODUCT_TABLE_NAME} 
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${condition} 
      AND ${PRODUCT_COL.productStoreId} = ${productStoreId}
      AND ${PRODUCT_COL.productIsDeleted}=0
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemSKU} ASC
      LIMIT ${limit} OFFSET ${offSet}`);
    return executeQuery(
      `SELECT * FROM ${PRODUCT_TABLE_NAME} 
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${condition} 
      AND ${PRODUCT_COL.productStoreId} = ${productStoreId}
      AND ${PRODUCT_COL.productIsDeleted}=0
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemSKU} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static async productCountBySearchTerm(searchTerm: string): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${PRODUCT_TABLE_NAME}
      WHERE (${PRODUCT_COL.productId} Like '%${searchTerm}%' or ${PRODUCT_COL.productItemName} Like '%${searchTerm}%') AND ${PRODUCT_COL.productIsDeleted}=0`,
    );
  }

  public static async itemsOutOfStock(currentDate: string, spanOf: string): Promise<any> {
    return executeQuery(`SELECT * FROM ${PRODUCT_TABLE_NAME}
      WHERE ${PRODUCT_COL.productIsActive}=1 
      AND ${PRODUCT_COL.productIsDeleted}=0 
      AND ${PRODUCT_COL.productQuantity}=0 
      AND ${PRODUCT_COL.productCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC
      LIMIT 10`);
  }

  public static async findBySearchTerm(
    searchTerm: number,
    limit: number,
    offSet: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_TABLE_NAME}
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE (${PRODUCT_COL.productItemSKU} Like '%${searchTerm}%' OR ${PRODUCT_COL.productItemName} Like '%${searchTerm}%' OR ${PRODUCT_CATEGORIES_COL.name} Like '%${searchTerm}%')
      AND ${PRODUCT_COL.productIsDeleted}=0 
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static async countData(storeId: number): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS rowCount 
      FROM ${PRODUCT_TABLE_NAME} WHERE ${PRODUCT_COL.productStoreId} = ${storeId} AND ${PRODUCT_COL.productIsDeleted}=0`,
    );
  }

  public static async countProducts(productStoreId: number): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS rowCount 
      FROM ${PRODUCT_TABLE_NAME} WHERE ${PRODUCT_COL.productStoreId}=${productStoreId}
      AND ${PRODUCT_COL.productIsDeleted}=0`,
    );
  }

  public static async getPaginationData(
    storeId: number,
    limit: number,
    offSet: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_TABLE_NAME} 
      WHERE ${PRODUCT_COL.productStoreId} = ${storeId} AND ${PRODUCT_COL.productIsDeleted}=0 
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static async getPaginationProducts(
    productStoreId: number,
    limit: number,
    offSet: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_TABLE_NAME} 
      LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} 
      ON ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
      WHERE ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productStoreId}=${productStoreId}
      AND ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productIsDeleted}=0
      ORDER BY ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productItemName} ASC, ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static deleteProductById(id: number): Promise<any> {
    return executeQuery(
      `UPDATE ${PRODUCT_TABLE_NAME} SET ${PRODUCT_COL.productIsDeleted}=1 WHERE ${PRODUCT_COL.productId}='${id}'`,
    );
  }

  public static async createProduct(obj: Product): Promise<{ product: Product }> {
    const res: Product = await insertRecord(PRODUCT_TABLE_NAME, obj);
    return { product: res };
  }

  public static async updateProduct(id: number, obj: any): Promise<{ product: Product }> {
    return updateRecord(
      `UPDATE ${PRODUCT_TABLE_NAME} SET productCategoryId=?,productIsTaxable=?,productTaxPercentage=?,productQuantity=?,productItemName=?,productItemBrand=?,productItemDescription=?,productPurchasedPrice=?,productUnitPrice=?,productComparativePrice=?,productIsActive=?,productItemExpiry=?,productStoreId=?,productItemBarCode=?,productItemSKU=?,productItemImage=?,productUpdatedAt=? WHERE productId='${id}'`,
      obj,
    );
  }

  public static async productCategoriesDeactivate(catIds: any): Promise<any> {
    return executeQuery(
      `UPDATE ${PRODUCT_TABLE_NAME} SET ${PRODUCT_COL.productIsActive}=0 WHERE ${PRODUCT_COL.productCategoryId} IN (${catIds})`,
    );
  }

  public static async bulkInsert(dateToDB: any): Promise<any> {
    return executeQuery(
      `INSERT INTO ${PRODUCT_TABLE_NAME} (productStoreId,productItemSKU,productItemBarCode,productItemName,productQuantity,productPurchasedPrice,productUnitPrice,productComparativePrice,productItemExpiry,productItemDescription,productDiscountAvailable,productDiscountActive,productIsTaxable,productTaxPercentage,productCategoryId) VALUES ${dateToDB}`,
    );
  }
}
