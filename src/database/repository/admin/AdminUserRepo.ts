import Employee, { EMPLOYEE_TABLE_COL, EMPLOYEE_TABLE_NAME } from '../../model//admin/Employee';
import KeystoreRepo from '../KeystoreRepo';
import Keystore from '../../model/Keystore';
import { executeQuery, insertRecord, updateRecord } from '../../index';
import clientType from '../../../constants/roles';

export default class AdminUserRepo {
  private static searchCondition(roleId: any, searchTerm: string) {
    let condition = '';
    if (roleId != '' && searchTerm != '') {
      condition = `${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId}='${roleId}' 
      AND CONCAT( ${EMPLOYEE_TABLE_COL.firstName},  ' ', ${EMPLOYEE_TABLE_COL.lastName} ) LIKE '%${searchTerm}%' OR (${EMPLOYEE_TABLE_COL.firstName} LIKE '%${searchTerm}%' OR ${EMPLOYEE_TABLE_COL.lastName} LIKE '%${searchTerm}%')`;
    } else if (roleId != '' && searchTerm === '') {
      condition = `${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId}='${roleId}'`;
    } else if (roleId == '' && searchTerm !== '') {
      condition = `CONCAT( ${EMPLOYEE_TABLE_COL.firstName},  ' ', ${EMPLOYEE_TABLE_COL.lastName} ) LIKE '%${searchTerm}%' OR (${EMPLOYEE_TABLE_COL.firstName} LIKE '%${searchTerm}%' OR ${EMPLOYEE_TABLE_COL.lastName} LIKE '%${searchTerm}%')`;
    }
    return condition;
  }

  public static findById(id: number): Promise<Employee | null> {
    return executeQuery(`Select * from ${EMPLOYEE_TABLE_NAME} where id='${id}'`);
  }

  public static findByEmail(email: string): Promise<Employee | null> {
    return executeQuery(`Select * from ${EMPLOYEE_TABLE_NAME} where email='${email}'`);
  }

  public static adminUserCount(storeId: number): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${EMPLOYEE_TABLE_NAME} 
      WHERE ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId}!=1
      AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.storeId} = ${storeId}`,
    );
  }

  public static getAllEmployees(
    storeId: number,
    limit: number,
    offSet: number,
  ): Promise<Employee[] | null> {
    return executeQuery(`SELECT * FROM ${EMPLOYEE_TABLE_NAME} 
    WHERE ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId} != 1 
    AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.storeId} = ${storeId}
    ORDER BY ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.firstName} ASC
    LIMIT ${limit} OFFSET ${offSet}`);
  }

  public static employeesCountBySearch(userRole: number, searchTerm: string, storeId: number) {
    const condition = this.searchCondition(userRole, searchTerm);
    return executeQuery(
      `SELECT COUNT(*) as rowCount FROM ${EMPLOYEE_TABLE_NAME} 
      WHERE ${condition}
      AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.storeId} = ${storeId}
      AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId}!=1`,
    );
  }

  public static employeesBySearch(
    userRole: number,
    storeId: number,
    searchTerm: string,
    limit: number,
    offSet: number,
  ): Promise<Employee[] | null> {
    const condition = this.searchCondition(userRole, searchTerm);
    return executeQuery(`SELECT * FROM ${EMPLOYEE_TABLE_NAME} 
    WHERE ${condition} 
    AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.roleId} != 1 
    AND ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.storeId} = ${storeId}
    ORDER BY ${EMPLOYEE_TABLE_NAME}.${EMPLOYEE_TABLE_COL.firstName} ASC
    LIMIT ${limit} OFFSET ${offSet}`);
  }

  public static deleteEmployee(id: number) {
    return executeQuery(`DELETE FROM ${EMPLOYEE_TABLE_NAME} WHERE id=${id}`);
  }

  public static updateEmployee(id: number, employeeData: any): Promise<Employee | null> {
    return updateRecord(
      `UPDATE ${EMPLOYEE_TABLE_NAME} 
      SET title=?,firstName=?,lastName=?,email=?,isActive=?,roleId=?,storeId=?,phone=?,profileImage=?,updatedAt=?
      WHERE id='${id}'`,
      employeeData,
    );
  }

  public static async create(
    adminUser: Employee,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ adminUser: Employee; keystore: Keystore }> {
    const now = new Date();
    const res: any = await insertRecord(EMPLOYEE_TABLE_NAME, {
      title: `${adminUser.firstName}  ${adminUser.lastName}`,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      password: adminUser.password,
      roleId: adminUser.roleId,
      storeId: adminUser.storeId,
      isActive: adminUser.isActive,
      profileImage: adminUser.profileImage,
      phone: adminUser.phone,
      createdAt: now,
      updatedAt: now,
    });
    const keystore = await KeystoreRepo.create(
      res.id,
      clientType.EMPLOYEE,
      accessTokenKey,
      refreshTokenKey,
    );
    return { adminUser: res, keystore: keystore };
  }
}
