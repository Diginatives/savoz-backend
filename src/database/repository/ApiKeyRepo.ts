import { executeQuery } from '../index';
import ApiKey, { API_KEY_COL, API_KEY_TABLE_NAME } from '../model/ApiKey';

export default class ApiRepo {
  public static async findByKey(key: string): Promise<ApiKey | null> {
    return executeQuery(`Select * from ${API_KEY_TABLE_NAME} where ${API_KEY_COL.key}='${key}'`);
  }
}
