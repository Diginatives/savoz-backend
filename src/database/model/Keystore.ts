export const KEY_STORE_TABLE_NAME = 'keystores';

export const KEY_STORE_COL = {
  id: 'id',
  client: 'client',
  clientType: 'clientType',
  primaryKey: 'primaryKey',
  secondaryKey: 'secondaryKey',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface Keystore {
  id: string;
  client: string;
  clientType: string;
  primaryKey: string;
  secondaryKey: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
