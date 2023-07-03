import express from 'express';
import { AuthFailureResponse, TokenRefreshResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../../../database/repository/UserRepo';
import { AuthFailureError } from '../../../core/ApiError';
import JWT from '../../../core/JWT';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import crypto from 'crypto';
import { validateTokenData, createTokens, getAccessToken } from '../../../auth/authUtils';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import clientType from '../../../constants/roles';
import EmployeeRepo from '../../../database/repository/admin/EmployeeRepo';

const router = express.Router();

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  asyncHandler(async (req: ProtectedRequest, res) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);
    let user: any;
    let type: string;
    if (accessTokenPayload.ct === clientType.USER) {
      user = await UserRepo.findById(accessTokenPayload.sub);
      type = clientType.USER;
    } else {
      user = await EmployeeRepo.findById(accessTokenPayload.sub);
      type = clientType.EMPLOYEE;
    }
    if (!user || user.length === 0) throw new AuthFailureResponse('User not registered').send(res);
    user = user[0];
    req.userId = user.id;
    req.roleId = user.roleId;
    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      throw new AuthFailureResponse('Invalid access token').send(res);
    }

    const keystore = await KeystoreRepo.find(
      req.userId,
      type,
      accessTokenPayload.prm,
      refreshTokenPayload.prm,
    );

    if (!keystore) throw new AuthFailureResponse('Invalid access token').send(res);
    await KeystoreRepo.remove(keystore.id, type);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(req.userId, type, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user.id, type, accessTokenKey, refreshTokenKey);

    new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
  }),
);

export default router;
