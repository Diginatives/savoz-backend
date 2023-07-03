export const API_KEY_TABLE_NAME = 'client_keys';

export const API_KEY_COL = {
  key: 'api_key',
  version: 'version',
  metadata: 'metadata',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface ApiKey {
  key: string;
  version: number;
  metadata: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
