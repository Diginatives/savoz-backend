export const USER_TABLE_NAME = 'users';

export const USER_TABLE_COL = {
  id: 'id',
  title: 'title',
  firstName: 'firstNAme',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  phone: 'phone',
  isActive: 'isActive',
  roleId: 'roldId',
  stripeId: 'stripeId',
  cardId: 'cardId',
  address: 'address',
  dob: 'dob',
  userLat: 'userLat',
  userLng: 'userLng',
  earnedPoints: 'earnedPoints',
  fcmToken: 'fcmToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface User {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
  stripeId?: string;
  cardId?: string;
  address?: string;
  dob?: string;
  userLat?: number;
  userLng?: number;
  earnedPoints?: string;
  fcmToken?: string;
  isActive?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
