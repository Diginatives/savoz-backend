export const ROLE_TABLE_NAME = 'roles';

export const ROLE_COL = {
  id: 'id',
  code: 'code',
  title: 'title',
  status: 'status',
};

export default interface Role {
  id: number;
  code: string;
  title: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
