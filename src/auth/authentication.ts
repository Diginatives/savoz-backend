import express from 'express';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../database/repository/UserRepo';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import JWT from '../core/JWT';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../helpers/validator';
import schema from './schema';
import asyncHandler from '../helpers/asyncHandler';
import clientType from '../constants/roles';
import EmployeeRepo from '../database/repository/admin/EmployeeRepo';
import { AuthFailureResponse } from '../core/ApiResponse';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);
      let user: any;
      let type: string;
      if (payload.ct === clientType.USER) {
        user = await UserRepo.findById(payload.sub);
        type = clientType.USER;
      } else {
        user = await EmployeeRepo.findById(payload.sub);
        type = clientType.EMPLOYEE;
      }

      if (!user || user.length === 0)
        throw new AuthFailureResponse('User not registered').send(res);
      user = user[0];
      req.userId = user.id;
      req.roleId = user.roleId;
      const keystore: any = await KeystoreRepo.findforKey(req['userId'], payload.prm);

      if (!keystore || keystore.length === 0)
        throw new AuthFailureResponse('Invalid access token').send(res);
      req.keystore = keystore[0];

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
