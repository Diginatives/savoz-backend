import MainCategory, {
  MAIN_CATEGORY_COL,
  MAIN_CATEGORY_TABLE_NAME,
} from '../../model/admin/MainCategory';
import { executeQuery } from '../../index';

export default class MainCategoryRepo {
  public static findByName(name: number): Promise<MainCategory | null> {
    return executeQuery(
      `SELECT * FROM ${MAIN_CATEGORY_TABLE_NAME} 
      WHERE ${MAIN_CATEGORY_COL.name}='${name}'`,
    );
  }
}
