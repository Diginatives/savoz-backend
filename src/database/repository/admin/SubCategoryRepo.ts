import SubCategory, { SUB_CATEGORY_COL } from '../../model/SubCategory';
import { executeQuery, insertRecord, updateRecord } from '../../index';
import { SUB_CATEGORY_TABLE_NAME } from '../../model/SubCategory';
import {
  PRODUCT_CATEGORIES_COL,
  PRODUCT_CATEGORIES_TABLE_NAME,
} from '../../model/admin/ProductCategory';
import { STORE_COL, STORE_TABLE_NAME } from '../../model/Store';
import StoreSubCategory, {
  STORE_SUB_CATEGORY_COL,
  STORE_SUB_CATEGORY_TABLE_NAME,
} from '../../model/StoreSubCategory';
import { PRODUCT_COL, PRODUCT_TABLE_NAME } from '../../model/Product';
export default class SubCategoryRepo {
  public static async findById(id: number): Promise<SubCategory | null> {
    return executeQuery(
      `SELECT * FROM ${SUB_CATEGORY_TABLE_NAME} 
      WHERE ${SUB_CATEGORY_COL.id}='${id}'
      AND ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.isDeleted}=0`,
    );
  }
  public static async createStoreSubCategory(
    obj: StoreSubCategory,
  ): Promise<{ storeSubCategory: StoreSubCategory }> {
    const res: StoreSubCategory = await insertRecord(STORE_SUB_CATEGORY_TABLE_NAME, obj);
    return { storeSubCategory: res };
  }

  public static async fidnByName(name: string): Promise<SubCategory | null> {
    return executeQuery(
      `SELECT * FROM ${SUB_CATEGORY_TABLE_NAME} 
      WHERE ${SUB_CATEGORY_COL.name}='${name}'
      AND ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.isDeleted}=0`,
    );
  }

  public static async findByMainCategoryId(mainCategoryId: number): Promise<SubCategory[] | null> {
    // console.log(`SELECT ${SUB_CATEGORY_TABLE_NAME}.*,${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId} as mysubCategoryId ,${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.storeId} as mystoreId,
    // ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId} as mystoreSubCategoryId,
    //   sum(case when ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} is not null THEN  1 else 0 END)  as total_proucts
    //   FROM ${SUB_CATEGORY_TABLE_NAME}
    //   LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} on ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
    //   LEFT JOIN ${PRODUCT_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
    //   LEFT JOIN ${STORE_SUB_CATEGORY_TABLE_NAME} on ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id} = ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId}
    //   AND ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.storeId} =1
    //   WHERE ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.mainCategoryId}='${mainCategoryId}'
    //   AND ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.isDeleted}=0
    //   GROUP BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
    //   ORDER BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name} ASC`);
    return executeQuery(`SELECT ${SUB_CATEGORY_TABLE_NAME}.*, 
    sum(case when ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} is not null THEN  1 else 0 END)  as total_proucts
    FROM ${SUB_CATEGORY_TABLE_NAME}
    LEFT JOIN ${PRODUCT_CATEGORIES_TABLE_NAME} on ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.subCategoryId} = ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
    LEFT JOIN ${PRODUCT_TABLE_NAME} on ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productCategoryId} = ${PRODUCT_CATEGORIES_TABLE_NAME}.${PRODUCT_CATEGORIES_COL.id}
    WHERE ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.mainCategoryId}='${mainCategoryId}'
    AND ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.isDeleted}=0
    GROUP BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id}
    ORDER BY ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.name} ASC;`);
  }

  public static async createSubCategory(obj: SubCategory): Promise<SubCategory> {
    const res: SubCategory = await insertRecord(SUB_CATEGORY_TABLE_NAME, obj);
    return res;
  }

  public static async updateSubCategory(
    id: number,
    obj: any,
  ): Promise<{ subCategory: SubCategory }> {
    return updateRecord(
      `UPDATE ${SUB_CATEGORY_TABLE_NAME} 
      SET ${SUB_CATEGORY_COL.mainCategoryId}=?,${SUB_CATEGORY_COL.name}=?,${SUB_CATEGORY_COL.description}=?,${SUB_CATEGORY_COL.image}=?,${SUB_CATEGORY_COL.isActive}=?,${SUB_CATEGORY_COL.updatedAt}=? WHERE ${SUB_CATEGORY_COL.id}='${id}'`,
      obj,
    );
  }

  public static async deleteById(id: number): Promise<SubCategory | null> {
    return executeQuery(
      `UPDATE ${SUB_CATEGORY_TABLE_NAME} SET ${SUB_CATEGORY_COL.isDeleted}=1 WHERE ${SUB_CATEGORY_COL.id}='${id}'`,
    );
  }

  public static async bulkInsert(dateToDB: any): Promise<any> {
    return executeQuery(
      `INSERT INTO ${SUB_CATEGORY_TABLE_NAME} (${SUB_CATEGORY_COL.mainCategoryId},${SUB_CATEGORY_COL.name},${SUB_CATEGORY_COL.description},${SUB_CATEGORY_COL.isActive}) VALUES ${dateToDB}`,
    );
  }
}
