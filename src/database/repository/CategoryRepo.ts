import { executeQuery, insertRecord } from '..';
import { STORE_COL, STORE_TABLE_NAME } from '../model/Store';
import { STORE_SUB_CATEGORY_COL, STORE_SUB_CATEGORY_TABLE_NAME } from '../model/StoreSubCategory';
import SubCategory, { SUB_CATEGORY_COL, SUB_CATEGORY_TABLE_NAME } from '../model/SubCategory';

export default class CategoryRepo {
  // contains critical information of the user

  public static async createSubCategory(obj: SubCategory): Promise<{ subCategory: SubCategory }> {
    const res: SubCategory = await insertRecord(SUB_CATEGORY_TABLE_NAME, obj);
    return { subCategory: res };
  }
  public static async findByType(type: string): Promise<any> {
    const query: string = `Select * from ${SUB_CATEGORY_TABLE_NAME} inner join ${STORE_SUB_CATEGORY_TABLE_NAME} on ${SUB_CATEGORY_TABLE_NAME}.${SUB_CATEGORY_COL.id} = ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.subCategoryId}
    and ${STORE_SUB_CATEGORY_TABLE_NAME}.${STORE_SUB_CATEGORY_COL.storeId} in (select ${STORE_TABLE_NAME}.${STORE_COL.storeId} from ${STORE_TABLE_NAME} where ${STORE_COL.storeType} = ${type})`;
    return executeQuery(query);
  }
}
