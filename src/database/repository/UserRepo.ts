import User, { USER_TABLE_COL, USER_TABLE_NAME } from '../model/User';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';
import { executeQuery, insertRecord, updateRecord } from '../index';
import clientType from '../../constants/roles';
import { updateData } from '../../interfaces/default_types';

export default class UserRepo {
  // contains critical information of the user
  public static findById(id: number): Promise<User[] | null> {
    return executeQuery(`Select * from ${USER_TABLE_NAME} where id=${id}`);
  }
  public static findByIdAndRoleId(id: number, roleId: number): Promise<User[] | null> {
    return executeQuery(`Select * from ${USER_TABLE_NAME} where id=${id} and roleId=${roleId}`);
  }

  public static findByEmail(email: string): Promise<User[] | null> {
    console.log(
      `Select * from ${USER_TABLE_NAME} where email='${email}' ORDER BY ${USER_TABLE_COL.isActive} DESC`,
    );
    return executeQuery(
      `Select * from ${USER_TABLE_NAME} where email='${email}' ORDER BY ${USER_TABLE_COL.isActive} DESC`,
    );
  }

  public static updatePassword(id: number, password: string): Promise<updateData | updateData> {
    return updateRecord(`update ${USER_TABLE_NAME} set password=? where id=${id}`, [password]);
  }

  public static uploadAvatar(id: number, fileName: string): Promise<User | null> {
    return updateRecord(`update ${USER_TABLE_NAME} set avatar=? where id=${id}`, [fileName]);
  }

  public static updateProfile(id: number, profileData: any): Promise<User | null> {
    return updateRecord(
      `update ${USER_TABLE_NAME} set title=?,firstName=?,lastName=?,email=?,phone=?,address=?,dob=?,userLat=?,userLng=? where id=${id}`,
      profileData,
    );
  }

  public static updateStripeIdAndCardId(id: number, cardData: any): Promise<any | null> {
    return updateRecord(
      `update ${USER_TABLE_NAME} set stripeId=?,cardId=? where id=${id}`,
      cardData,
    );
  }

  public static updateDefaultCard(
    userId: number,
    cardId: string,
  ): Promise<updateData | updateData> {
    return updateRecord(`update ${USER_TABLE_NAME} set cardId=? where id=${userId}`, [cardId]);
  }

  public static deleteProfile(userId: number, isDelete: any): Promise<any | null> {
    return updateRecord(`update ${USER_TABLE_NAME} set isActive=? where id=${userId}`, isDelete);
  }

  public static async newUsers(spanOf: string, currentDate: string): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS newEmployees FROM ${USER_TABLE_NAME} WHERE ${USER_TABLE_COL.createdAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'`,
    );
  }

  public static async graphData(
    spanOf: string,
    currentDate: string,
    getDataBy: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT ${getDataBy}(${USER_TABLE_COL.createdAt}) AS period, COUNT(*) AS total FROM ${USER_TABLE_NAME} WHERE date(${USER_TABLE_COL.createdAt}) BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00' GROUP BY period`,
    );
  }

  public static async previousSpanUsers(previousSpanDays: string, spanOf: string): Promise<any> {
    return executeQuery(
      `SELECT COUNT(*) AS previouseEmployees FROM ${USER_TABLE_NAME} WHERE ${USER_TABLE_COL.createdAt} BETWEEN '${previousSpanDays} 00:00:00' AND '${spanOf} 00:00:00'`,
    );
  }

  public static async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: number,
  ): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();
    const res: any = await insertRecord('users', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      title: user.title,
      phone: user.phone,
      roleId: roleCode,
      isActive: user.isActive,
      createdAt: now,
      updatedAt: now,
    });
    const keystore = await KeystoreRepo.create(
      res.id,
      clientType.USER,
      accessTokenKey,
      refreshTokenKey,
    );
    return { user: res, keystore: keystore };
  }
}
