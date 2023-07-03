import Role, { ROLE_TABLE_NAME, ROLE_COL } from '../model/Role';
import { executeQuery } from '../index';

export default class RoleRepo {
  public static findByCode(code: string): Promise<Role | null> {
    return executeQuery(`select * from ${ROLE_TABLE_NAME} where ${ROLE_COL.code} = ${code}`);
  }
  public static findById(id: number): Promise<Role | null> {
    return executeQuery(`select * from ${ROLE_TABLE_NAME} where ${ROLE_COL.id} = ${id}`);
  }
}
