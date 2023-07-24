import { executeQuery, insertRecord, updateRecord } from '../../index';
import ProductCategory, {
  PRODUCT_CATEGORIES_COL,
  PRODUCT_CATEGORIES_TABLE_NAME,
} from '../../model/admin/ProductCategory';

import StoreSubCategory, {
  STORE_SUB_CATEGORY_COL,
  STORE_SUB_CATEGORY_TABLE_NAME,
} from '../../../database/model/StoreSubCategory';

export default class ProductCategoryRepo {
  private static searchCondition(id: any, searchTerm: string) {
    let condition = '';
    if (id != '' && searchTerm != '') {
      condition = `${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId}='${id}' AND ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.name} LIKE '%${searchTerm}%'`;
    } else if (id != '' && searchTerm === '') {
      condition = `${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId}='${id}'`;
    } else if (id == '' && searchTerm !== '') {
      condition = `${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.name} LIKE '%${searchTerm}%'`;
    }
    return condition;
  }

  public static findBySearch(
    id: any,
    searchTerm: string,
    limit: number,
    offSet: number,
  ): Promise<ProductCategory | null> {
    const condition = this.searchCondition(id, searchTerm);
    return executeQuery(
      `SELECT * FROM ${PRODUCT_CATEGORIES_TABLE_NAME} 
      WHERE ${condition}
      AND ${PRODUCT_CATEGORIES_COL.isDeleted}=0 
      ORDER BY ${PRODUCT_CATEGORIES_COL.name} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }

  public static fidnByName(name: string): Promise<ProductCategory | null> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_CATEGORIES_TABLE_NAME} 
      WHERE ${PRODUCT_CATEGORIES_COL.name}='${name}'
      AND ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.isDeleted}=0`,
    );
  }

  public static productCategoriesCountBySearch(id: number, searchTerm: string): Promise<any> {
    const condition = this.searchCondition(id, searchTerm);
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${PRODUCT_CATEGORIES_TABLE_NAME} 
      WHERE ${condition}
      AND ${PRODUCT_CATEGORIES_COL.isDeleted}=0`,
    );
  }

  public static getAllProductCategories(): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_CATEGORIES_TABLE_NAME}
      WHERE ${PRODUCT_CATEGORIES_COL.isDeleted}=0`,
    );
  }

  public static findById(id: number): Promise<ProductCategory | null> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_CATEGORIES_TABLE_NAME} 
      WHERE ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}='${id}'
      AND ${PRODUCT_CATEGORIES_COL.isDeleted}=0
      `,
    );
  }
  public static deleteStoreSubcategory(subCategoryId: number): Promise<StoreSubCategory | null> {
    return executeQuery(
      `DELETE FROM ${STORE_SUB_CATEGORY_TABLE_NAME} 
      WHERE ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId}='${subCategoryId}'
      `,
    );
  }

  public static async createProductCategory(
    obj: ProductCategory,
  ): Promise<{ productCategory: ProductCategory }> {
    const res: ProductCategory = await insertRecord(PRODUCT_CATEGORIES_TABLE_NAME, obj);
    return { productCategory: res };
  }

  public static async updateProductCategory(
    id: number,
    obj: any,
  ): Promise<{ productCategory: ProductCategory }> {
    return updateRecord(
      `UPDATE ${PRODUCT_CATEGORIES_TABLE_NAME} SET subCategoryId=?,name=?,description=?,image=?,isActive=? WHERE id='${id}'`,
      obj,
    );
  }

  public static deleteById(id: number): Promise<ProductCategory | null> {
    return executeQuery(
      `UPDATE ${PRODUCT_CATEGORIES_TABLE_NAME} SET ${PRODUCT_CATEGORIES_COL.isDeleted}=1 WHERE id='${id}'`,
    );
  }

  public static deleteByCatId(catId: number): Promise<any> {
    return executeQuery(
      `UPDATE ${PRODUCT_CATEGORIES_TABLE_NAME} SET ${PRODUCT_CATEGORIES_COL.isActive}=0 WHERE ${PRODUCT_CATEGORIES_COL.subCategoryId}='${catId}'`,
    );
  }

  public static productCategoriesIds(catId: number): Promise<any> {
    return executeQuery(
      `SELECT ${PRODUCT_CATEGORIES_COL.id} FROM ${PRODUCT_CATEGORIES_TABLE_NAME} WHERE ${PRODUCT_CATEGORIES_COL.isActive}=1 AND ${PRODUCT_CATEGORIES_COL.isDeleted}=0 AND ${PRODUCT_CATEGORIES_COL.subCategoryId}='${catId}'`,
    );
  }

  public static productCategoriesDeactivate(catId: any): Promise<any> {
    return executeQuery(
      `UPDATE ${PRODUCT_CATEGORIES_TABLE_NAME} SET ${PRODUCT_CATEGORIES_COL.isActive}=0 WHERE ${PRODUCT_CATEGORIES_COL.id} IN (${catId})`,
    );
  }

  public static async productCategoriesCount(): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${PRODUCT_CATEGORIES_TABLE_NAME} WHERE ${PRODUCT_CATEGORIES_COL.isDeleted}=0`,
    );
  }

  public static async findByProductCategories(limit: number, offSet: number): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${PRODUCT_CATEGORIES_TABLE_NAME} 
      WHERE ${PRODUCT_CATEGORIES_COL.isDeleted}=0 
      ORDER BY ${PRODUCT_CATEGORIES_COL.name} ASC
      LIMIT ${limit} OFFSET ${offSet}`,
    );
  }
  public static bulkInsert(dateToDB: any): Promise<any> {
    return executeQuery(
      `INSERT INTO ${PRODUCT_CATEGORIES_TABLE_NAME} (subCategoryId,name,isActive,description) VALUES ${dateToDB}`,
    );
  }
}
