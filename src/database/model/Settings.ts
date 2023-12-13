export const SETTINGS_TABLE_NAME = 'settings';

export const SETTINGS_COL = {
  id: 'id',
  minOrderLimit: 'minOrderLimit',
};

export default interface Settings {
  id: number;
  minOrderLimit: number;
}
