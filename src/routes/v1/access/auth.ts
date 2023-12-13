import express from 'express';
import {
  AuthFailureResponse,
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import { createTokens } from '../../../auth/authUtils';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import User from '../../../database/model/User';
import { ProtectedRequest, RoleRequest } from '../../../types/app-request';
import ForgotPasswordRepo from '../../../database/repository/ForgotPasswordRepo';
import {
  RESET_PASSWORD_CONFIRM_TEMPLATE,
  RESET_PASSWORD_TEMPLATE,
  sendEmail,
} from '../../../function/sg-emails';
import { addBaseURLApp, getHomeUrl } from '../../../function/utils';
import ForgotPassword from '../../../database/model/ForgotPassword';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import clientType from '../../../constants/roles';
import { customUserResponse } from '../../../custom/user-responses';
import { updateData } from '../../../interfaces/default_types';
import userConstants from '../../../constants/userConstants';
import authentication from '../../../auth/authentication';
import payment from '../../../function/payment';
import { customCardCollectionResponse } from '../../../custom/payment-card-respones';
import SettingsRepo from '../../../database/repository/SettingsRepo';

const router = express.Router();

router.post(
  '/signup',
  validator(schema.signup, ValidationSource.BODY),
  asyncHandler(async (req: RoleRequest, res) => {
    const user: any = await UserRepo.findByEmail(req.body.email);
    if (
      user.length > 0 &&
      user[0].email &&
      user[0].isActive == userConstants.ACTIVE_STATUS.ISACTIVETRUE
    ) {
      throw new NotFoundResponse('Email already registered').send(res);
    }

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const { user: createdUser, keystore } = await UserRepo.create(
      {
        email: req.body.email,
        title: req.body.title,
        password: passwordHash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        isActive: userConstants.ACTIVE_STATUS.ISACTIVETRUE,
      } as User,
      accessTokenKey,
      refreshTokenKey,
      clientType.USERID,
    );

    const tokens = await createTokens(
      createdUser.id,
      clientType.USER,
      keystore.primaryKey,
      keystore.secondaryKey,
    );
    new SuccessResponse('User Register Successfully', {
      user: await customUserResponse(createdUser),
      tokens: tokens,
    }).send(res);
  }),
);

router.post(
  '/login',
  validator(schema.userCredential, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const user: any = await UserRepo.findByEmail(req.body.email);
    if (user.length === 0 || !user || !user[0].isActive) {
      throw new NotFoundResponse('User not found').send(res);
    }
    if (!user[0].password) throw new NotFoundResponse('Credential not set').send(res);

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) throw new AuthFailureResponse('Password is incorrect').send(res);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(user[0].id, clientType.USER, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user[0].id, clientType.USER, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Successfully', {
      user: await customUserResponse(user[0]),
      tokens: tokens,
    }).send(res);
  }),
);

router.post(
  '/reset_password',
  validator(schema.reset_password, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const user: any = await UserRepo.findByEmail(req.body.email);
    // console.log(user, 'asfsa');
    if (user.length === 0 || !user) throw new NotFoundResponse('User not found').send(res);
    const token: any = await ForgotPasswordRepo.findByUserId(user[0].id, clientType.USER);

    if (token && token.length > 0) {
      await ForgotPasswordRepo.deleteToken(token[0].id, clientType.USER);
    }

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await crypto.createHash('sha256').update(resetToken).digest('hex');

    const { forgotPassword } = await ForgotPasswordRepo.create(user[0].id, clientType.USER, hash);

    if (!forgotPassword.id || !forgotPassword.token) {
      throw new BadRequestResponse('Something went wrong. Please again reset password').send(res);
    }
    const data1 = await sendEmail(
      user[0].email,
      '',
      'Reset Password',
      RESET_PASSWORD_TEMPLATE,
      getHomeUrl(`verify/${forgotPassword.token}/${forgotPassword.id}`),
    );
    new SuccessResponse(
      'An email has been sent to your email address to reset the password. Please check your email address.',
      { email: 'ok' },
    ).send(res);
  }),
);

router.post(
  '/validate_reset_token',
  validator(schema.validate_reset_token, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const { id, token } = req.body;

    const tokenData: ForgotPassword[] = await ForgotPasswordRepo.findByToken(
      token,
      clientType.USER,
    );
    if (!tokenData || tokenData.length === 0) {
      throw new BadRequestResponse('Link has been expired').send(res);
    }

    // const match = await bcrypt.compare(tokenData[0].id.toString(), id);
    const match: any = ForgotPasswordRepo.findById(id, clientType.USER);
    if (!match || match.length <= 0)
      throw new BadRequestResponse('Link has been expired').send(res);

    return new SuccessResponse('Successfully Validate', {
      userId: tokenData[0].userId,
      token: tokenData[0].token,
    }).send(res);
  }),
);

router.post(
  '/new_password',
  validator(schema.new_password, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const { password, token, userId } = req.body;
    const user: any = await UserRepo.findById(userId);

    if (user.length === 0 || !user) throw new NotFoundResponse('User Not Found').send(res);

    const tokenData: any = await ForgotPasswordRepo.findByUserId(userId, clientType.USER);
    if (!tokenData || tokenData.length === 0) {
      throw new BadRequestResponse('Link has been expired').send(res);
    }
    if (token !== tokenData[0].token)
      throw new BadRequestResponse('Link has been expired').send(res);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const data: updateData = await UserRepo.updatePassword(user[0].id, hashed);
    if (!data || data.affectedRows === 0) throw new InternalErrorResponse().send(res);

    await ForgotPasswordRepo.deleteToken(tokenData[0].id, clientType.USER);

    await sendEmail(
      user[0].email,
      '',
      'Password Changed',
      RESET_PASSWORD_CONFIRM_TEMPLATE,
      addBaseURLApp('auth/login'),
    );

    new SuccessResponse('Password Reset Successfully', { email: user[0].email }).send(res);
  }),
);

router.post(
  '/guest_login',
  asyncHandler(async (req, res) => {
    const user: any = await UserRepo.findByEmail('guest@yopmail.com');
    if (user.length === 0 || !user) throw new NotFoundResponse('User not found').send(res);

    const match = await bcrypt.compare('123456', user[0].password);
    if (!match) throw new AuthFailureResponse('Authentication failure').send(res);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(user[0].id, clientType.USER, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user[0].id, clientType.USER, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Guest Login Successfully', {
      user: await customUserResponse(user[0]),
      tokens: tokens,
    }).send(res);
  }),
);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

//Setting API

router.get(
  '/settings',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const data: any = await SettingsRepo.getSettings();
    return new SuccessResponse('success', data[0]).send(res);
  }),
);

//Stripe API's

//create payment method
router.get(
  '/create_payment_method',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const data = await payment.createPaymentMethod();
    return new SuccessResponse('success', data).send(res);
  }),
);
//

router.post(
  '/save_card',
  validator(schema.saveCard, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { id } = req.body;
    const user: any = await UserRepo.findById(req['userId']);
    let stripeId = user[0].stripeId;
    if (!stripeId) {
      stripeId = await payment.createCustomer(user[0]);
    }
    await payment.attachCard(id, stripeId);
    const cardData = [stripeId, id];
    const userData = await UserRepo.updateStripeIdAndCardId(user[0].id, cardData);
    if (userData.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    return new SuccessResponse('Card data successfully saved', true).send(res);
  }),
);

router.delete(
  '/delete_card',
  validator(schema.deleteCard, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { cardId } = req.body;
    const response: boolean = await payment.detachCard(cardId);
    if (!response) throw new InternalErrorResponse().send(res);
    return new SuccessResponse('Card delete successfully', true).send(res);
  }),
);

router.get(
  '/cards_data',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user: any = await UserRepo.findById(req['userId']);
    const cardData: any = user[0].stripeId ? await payment.getAllCardData(user[0].stripeId) : null;
    return new SuccessResponse(
      'success',
      await customCardCollectionResponse(cardData ? cardData.data : []),
    ).send(res);
  }),
);

router.post(
  '/default_card',
  validator(schema.defaultCard, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { cardId } = req.body;
    const userId = req['userId'];
    const checkUser = await UserRepo.findById(userId);
    if (!checkUser || checkUser.length <= 0) throw new NotFoundResponse('User not found');
    const data = await UserRepo.updateDefaultCard(userId, cardId);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const user: any = await UserRepo.findById(userId);
    return new SuccessResponse('Default card set successfully', user[0]).send(res);
  }),
);

export default router;
