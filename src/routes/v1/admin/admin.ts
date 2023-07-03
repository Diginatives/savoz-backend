import express from 'express';
import {
  AuthFailureResponse,
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import crypto from 'crypto';
import { createTokens } from '../../../auth/authUtils';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import ForgotPasswordRepo from '../../../database/repository/ForgotPasswordRepo';
import {
  RESET_PASSWORD_CONFIRM_TEMPLATE,
  RESET_PASSWORD_TEMPLATE,
  sendEmail,
} from '../../../function/sg-emails';
import { addBaseURLWeb, getPaginationObject } from '../../../function/utils';
import ForgotPassword from '../../../database/model/ForgotPassword';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import EmployeeRepo from '../../../database/repository/admin/EmployeeRepo';
import { customEmployeeResponse } from '../../../custom/employee-responses';
import clientType from '../../../constants/roles';
import { ProtectedRequest } from '../../../types/app-request';
import OrderRepo from '../../../database/repository/OrderRepo';
import { customOrderCollectionResponse } from '../../../custom/order-responses';
import { updateData } from '../../../interfaces/default_types';
import authentication from '../../../auth/authentication';

const router = express.Router();

router.post(
  '/login',
  validator(schema.userCredential, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const employee: any = await EmployeeRepo.findByEmail(req.body.email);
    if (employee.length === 0 || !employee) throw new NotFoundResponse('User not found').send(res);
    if (!employee[0].password) throw new AuthFailureResponse('Credential not set').send(res);

    const match = await bcrypt.compare(req.body.password, employee[0].password);
    if (!match) throw new AuthFailureResponse('Authentication failure').send(res);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(employee[0].id, clientType.EMPLOYEE, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      employee[0].id,
      clientType.EMPLOYEE,
      accessTokenKey,
      refreshTokenKey,
    );

    new SuccessResponse('Login Successfully', {
      employee: await customEmployeeResponse(employee[0]),
      tokens: tokens,
    }).send(res);
  }),
);

router.post(
  '/reset_password',
  validator(schema.reset_password, ValidationSource.BODY),
  asyncHandler(async (req, res) => {
    const employee: any = await EmployeeRepo.findByEmail(req.body.email);
    if (employee.length === 0 || !employee) throw new NotFoundResponse('User not found').send(res);
    const token: any = await ForgotPasswordRepo.findByUserId(employee[0].id, clientType.EMPLOYEE);

    if (token && token.length > 0) {
      await ForgotPasswordRepo.deleteToken(token[0].id, clientType.EMPLOYEE);
    }

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await crypto.createHash('sha256').update(resetToken).digest('hex');

    const { forgotPassword } = await ForgotPasswordRepo.create(
      employee[0].id,
      clientType.EMPLOYEE,
      hash,
    );

    await sendEmail(
      employee[0].email,
      '',
      'Reset Password',
      RESET_PASSWORD_TEMPLATE,
      addBaseURLWeb(`resetlink/${forgotPassword.token}/${forgotPassword.id}`),
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
      clientType.EMPLOYEE,
    );
    if (!tokenData || tokenData.length === 0) {
      throw new BadRequestResponse('Invalid Token and Id').send(res);
    }

    const match: any = ForgotPasswordRepo.findById(id, clientType.EMPLOYEE);
    if (!match) throw new BadRequestResponse('Invalid Token and Id').send(res);

    new SuccessResponse('Successfully Validate', {
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
    const employee: any = await EmployeeRepo.findById(userId);

    if (employee.length === 0 || !employee) throw new NotFoundResponse('User Not Found').send(res);

    const tokenData: any = await ForgotPasswordRepo.findByUserId(userId, clientType.EMPLOYEE);
    if (!tokenData || tokenData.length === 0)
      throw new BadRequestResponse('Invalid Token').send(res);
    if (token !== tokenData[0].token) throw new BadRequestResponse('Invalid Token').send(res);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const data: any = await EmployeeRepo.updatePassword(employee[0].id, hashed);
    if (!data || data.affectedRows === 0) throw new InternalErrorResponse().send(res);

    await ForgotPasswordRepo.deleteToken(tokenData[0].id, clientType.EMPLOYEE);

    await sendEmail(
      employee[0].email,
      '',
      'Password Changed',
      RESET_PASSWORD_CONFIRM_TEMPLATE,
      addBaseURLWeb('admin/login'),
    );

    new SuccessResponse('Password Reset Successfully', { email: employee[0].email }).send(res);
  }),
);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

//Order's API's

router.post(
  '/all_orders',
  validator(schema.orderList, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const page: number = parseInt(<string>req.body.page) || 1;
    const limit: number = parseInt(<string>req.body.limit) || 10;
    const offSet: number = page > 1 ? (page - 1) * limit : 0;
    const { orderType, searchText } = req.body;
    const countData = await OrderRepo.countAllOrder(orderType, searchText ? searchText : '');
    const orders = await OrderRepo.getAllOrders(
      orderType,
      searchText ? searchText : '',
      limit,
      offSet,
    );
    return new SuccessResponse('success', {
      orders: await customOrderCollectionResponse(orders),
      pagination: getPaginationObject(page, countData[0].rowCount, limit),
    }).send(res);
  }),
);

router.post(
  '/assign_rider',
  validator(schema.assingRider, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { orderId, riderName, date, time, orderStatus } = req.body;
    let order = await OrderRepo.findByOrderId(orderId);
    if (!order || order.length <= 0) throw new BadRequestResponse('Invalid Order Id').send(res);
    const riderAssignData: any = [riderName, date.toString(), time, orderStatus];
    const data: updateData = await OrderRepo.assignRider(orderId, riderAssignData);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    order = await OrderRepo.findByOrderId(orderId);
    return new SuccessResponse('Rider assigned successfully', order).send(res);
  }),
);

router.delete(
  '/order',
  validator(schema.deleteOrder, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { orderId } = req.body;
    const order = await OrderRepo.findByOrderId(orderId);
    if (!order || order.length <= 0) throw new BadRequestResponse('Invalid Order Id').send(res);
    const data: updateData = await OrderRepo.deleteOrdeer(orderId);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    return new SuccessResponse('Order successfully Deleted', 'deleted').send(res);
  }),
);

export default router;
