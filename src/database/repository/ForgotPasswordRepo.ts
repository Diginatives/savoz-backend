import ForgotPassword, {
  FORGOT_PASSWORD_COL,
  FORGOT_PASSWORD_TABLE_NAME,
} from '../model/ForgotPassword';
import { executeQuery, insertRecord } from '../index';

export default class ForgotPasswordRepo {
  public static findById(id: number, type: string): Promise<ForgotPassword[]> {
    return executeQuery(
      `select * from ${FORGOT_PASSWORD_TABLE_NAME} where ${FORGOT_PASSWORD_COL.clientType} = "${type}" and ${FORGOT_PASSWORD_COL.id} = "${id}"`,
    );
  }
  public static findByToken(token: string, type: string): Promise<ForgotPassword[]> {
    return executeQuery(
      `select * from ${FORGOT_PASSWORD_TABLE_NAME} where ${FORGOT_PASSWORD_COL.clientType} = "${type}" and ${FORGOT_PASSWORD_COL.token} = "${token}"`,
    );
  }
  public static findByUserId(userId: number, type: string): Promise<ForgotPassword | null> {
    return executeQuery(
      `select * from ${FORGOT_PASSWORD_TABLE_NAME} where ${FORGOT_PASSWORD_COL.clientType} = "${type}" and ${FORGOT_PASSWORD_COL.userId} = ${userId}`,
    );
  }
  public static deleteToken(id: number, type: string): Promise<ForgotPassword | null> {
    return executeQuery(
      `delete from ${FORGOT_PASSWORD_TABLE_NAME} where  ${FORGOT_PASSWORD_COL.clientType} = "${type}" and ${FORGOT_PASSWORD_COL.id} = ${id}`,
    );
  }

  public static async create(
    userId: number,
    type: string,
    token: string,
  ): Promise<{ forgotPassword: ForgotPassword }> {
    const now = new Date();
    const res: ForgotPassword = await insertRecord(FORGOT_PASSWORD_TABLE_NAME, {
      userId,
      clientType: type,
      token,
      createdAt: now,
      updatedAt: now,
    });
    return { forgotPassword: res };
  }
}
