import Settings, { SETTINGS_TABLE_NAME } from '../model/Settings';
import { executeQuery } from '../index';

export default class SettingsRepo {
  public static getSettings(): Promise<Settings | null> {
    return executeQuery(`select * from ${SETTINGS_TABLE_NAME}`);
  }
}
