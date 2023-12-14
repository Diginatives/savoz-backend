import Employee, { EMPLOYEE_TABLE_NAME, EMPLOYEE_TABLE_COL } from '../../model/admin/Employee';
import { executeQuery, updateRecord } from '../../index';

export default class EmployeeRepo {
  // contains critical information of the user
  public static async findById(id: number): Promise<Employee | null> {
    return executeQuery(
      `Select * from ${EMPLOYEE_TABLE_NAME} where ${EMPLOYEE_TABLE_COL.id}='${id}' and ${EMPLOYEE_TABLE_COL.isActive}=1`,
    );
  }

  public static async findByRoleId(id: number): Promise<Employee | null> {
    return executeQuery(
      `Select * from ${EMPLOYEE_TABLE_NAME} where ${EMPLOYEE_TABLE_COL.id}='${id}' and ${EMPLOYEE_TABLE_COL.roleId} in (1,2) and ${EMPLOYEE_TABLE_COL.isActive}=1`,
    );
  }

  public static async findByEmail(email: string): Promise<Employee | null> {
    return executeQuery(`Select * from ${EMPLOYEE_TABLE_NAME} where email='${email}'`);
  }

  public static updatePassword(id: number, password: string): Promise<Employee | null> {
    return updateRecord(`update ${EMPLOYEE_TABLE_NAME} set password=? where id='${id}'`, [
      password,
    ]);
  }

  public static async uploadAvatar(id: number, fileName: string): Promise<Employee | null> {
    return updateRecord(`update ${EMPLOYEE_TABLE_NAME} set profileImage=? where id='${id}'`, [
      fileName,
    ]);
  }
  public static async updateProfile(id: number, profileData: any): Promise<Employee | null> {
    return updateRecord(
      `update ${EMPLOYEE_TABLE_NAME} set title=?,firstName=?,lastName=?,email=?,phone=? where id='${id}'`,
      profileData,
    );
  }

  public static async newEmployees(
    spanOf: string,
    currentDate: string,
    storeId: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS newEmployees FROM ${EMPLOYEE_TABLE_NAME} WHERE ${EMPLOYEE_TABLE_COL.storeId}='${storeId}' AND ${EMPLOYEE_TABLE_COL.createdAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'`,
    );
  }

  public static async graphData(
    spanOf: string,
    currentDate: string,
    storeId: number,
    getDataBy: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT ${getDataBy}(${EMPLOYEE_TABLE_COL.createdAt}) AS period, COUNT(*) AS total FROM ${EMPLOYEE_TABLE_NAME} WHERE ${EMPLOYEE_TABLE_COL.storeId}='${storeId}' AND date(${EMPLOYEE_TABLE_COL.createdAt}) BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00' GROUP BY period`,
    );
  }

  public static async previousSpanEmployees(
    previousSpanDays: string,
    spanOf: string,
    storeId: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS previouseEmployees FROM ${EMPLOYEE_TABLE_NAME} WHERE ${EMPLOYEE_TABLE_COL.storeId}='${storeId}' AND ${EMPLOYEE_TABLE_COL.createdAt} BETWEEN '${previousSpanDays} 00:00:00' AND '${spanOf} 00:00:00'`,
    );
  }
}
