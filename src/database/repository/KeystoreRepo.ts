import Keystore, { KEY_STORE_COL, KEY_STORE_TABLE_NAME } from '../model/Keystore';
import { executeQuery, insertRecord } from '../index';

export default class KeystoreRepo {
  public static findforKey(client: number, key: string): Promise<Keystore | null> {
    return executeQuery(
      `select * from ${KEY_STORE_TABLE_NAME} where ${KEY_STORE_COL.client} = ${client} and ${KEY_STORE_COL.primaryKey} = "${key}"`,
    );
  }

  public static remove(id: string, type: string): Promise<any | null> {
    return executeQuery(
      `delete from ${KEY_STORE_TABLE_NAME} where ${KEY_STORE_COL.clientType} = "${type}" and ${KEY_STORE_COL.id} = ${id}`,
    );
  }

  public static removeByClient(userId: string, type: string): Promise<any | null> {
    return executeQuery(
      `delete from ${KEY_STORE_TABLE_NAME} where ${KEY_STORE_COL.clientType} = "${type}" and ${KEY_STORE_COL.client} = ${userId}`,
    );
  }

  public static find(
    client: number,
    clientType: string,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<Keystore | null> {
    return executeQuery(
      `select * from ${KEY_STORE_TABLE_NAME} where ${KEY_STORE_COL.clientType} = "${clientType}" and  ${KEY_STORE_COL.id} = ${client} and ${KEY_STORE_COL.primaryKey}=${primaryKey} and ${KEY_STORE_COL.secondaryKey}=${secondaryKey}`,
    );
  }

  public static async create(
    client: number,
    clientType: string,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<Keystore> {
    const now = new Date();
    return await insertRecord(KEY_STORE_TABLE_NAME, {
      client: client,
      clientType: clientType,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
      createdAt: now,
      updatedAt: now,
    });
  }
}
