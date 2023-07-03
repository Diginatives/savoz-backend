export const FORGOT_PASSWORD_TABLE_NAME = 'forgotPassword';

export const FORGOT_PASSWORD_COL = {
  id: 'id',
  userId: 'userId',
  clientType: 'clientType',
  token: 'token',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface ForgotPassword {
  id: number;
  userId: number;
  clientType: string;
  token: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
