export const EMPLOYEE_TABLE_NAME = 'employees';

export const EMPLOYEE_TABLE_COL = {
  id: 'id',
  title: 'title',
  firstName: 'firstNAme',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  password: 'password',
  desgination: 'desgination',
  roleId: 'roleId',
  storeId: 'storeId',
  isAdmin: 'isAdmin',
  isActive: 'isActive',
  profileImage: 'profileImage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface Employee {
  id: number;
  title: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  desgination?: string;
  roleId?: number;
  storeId?: number;
  avatar?: string;
  isAdmin: number;
  isActive: number;
  profileImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}
