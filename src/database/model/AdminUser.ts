export const EMPLOYEE_TABLE_NAME = 'employees';

export const EMPLOYEE_TABLE_COL = {
  id: 'id',
  title: 'title',
  firstName: 'firstNAme',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  phone: 'phone',
  isActive: 'isActive',
  roleId: 'roldId',
  profilePicUrl: 'profilePicUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface AdminUser {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  phone?: string;
  profilePicUrl?: string;
  roleId: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
