import { Request } from 'express';
import Keystore from '../database/model/Keystore';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  roleId: number;
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  userId: number;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
