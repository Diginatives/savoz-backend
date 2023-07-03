import express from 'express';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import validator, { ValidationSource } from '../../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import AdminUserRepo from '../../../../database/repository/admin/AdminUserRepo';
import {
  customAdminUserResponse,
  customAdminUserCollectionResponse,
} from '../../../../custom/admin-user-responses';
import {
  getAdminPaginationParams,
  getPaginationObject,
  addBaseURLWeb,
} from '../../../../function/utils';
import Employee from '../../../../database/model/admin/Employee';
import { getHomeForImage } from '../../../../function/utils';
import urls from '../../../../constants/urls';
import { ADMIN_USER_CREATION_TEMPLATE, sendEmail } from '../../../../function/sg-emails';
import authorization from '../../../../auth/authorization';

const router = express.Router();

router.get(
  '/get-employee/:employeeId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { employeeId } = req.params;
    const employee: any = await AdminUserRepo.findById(employeeId as unknown as number);
    if (!employee) throw new BadRequestResponse('Employees not found').send(res);
    return new SuccessResponse('success', await customAdminUserResponse(employee[0])).send(res);
  }),
);

router.post(
  '/upload-profile-image',
  validator(schema.file, ValidationSource.FILE),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const imageName: any = req['files'];
    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
      return new BadRequestResponse('Invalid file type').send(res);
    }
    const imageFile = imageName[0].filename;
    return new SuccessResponse('File successfully uploaded', {
      url: getHomeForImage(urls.values.imageProfileAdminLiveUrl) + imageFile,
      imageName: imageFile,
    }).send(res);
  }),
);

router.post(
  '/update',
  validator(schema.employeeUpdateFormData, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { firstName, lastName, email, roleId, isActive, phone, id, profileImage } = req.body;
    const loggedInUserId = req.userId;
    const loggedInUser: any = await AdminUserRepo.findById(loggedInUserId);
    const storeId = loggedInUser[0].storeId;
    const employeeExist: any = await AdminUserRepo.findById(id);
    if (!employeeExist || employeeExist.length === 0)
      throw new NotFoundResponse('Employee not found').send(res);

    if (email !== employeeExist[0].email) {
      const checkEmailExist: any = await AdminUserRepo.findByEmail(email);
      if (checkEmailExist && checkEmailExist.length != 0) {
        throw new BadRequestResponse('Email already registered').send(res);
      }
    }

    const now = new Date();
    // const profileImage = imageName[0].filename;
    const title = `${firstName} ${lastName}`;
    const employeeFormData = [
      title,
      firstName,
      lastName,
      email,
      isActive,
      roleId,
      storeId,
      phone,
      profileImage,
      now,
    ];
    const data: any = await AdminUserRepo.updateEmployee(id, employeeFormData);
    if (data.affectedRows <= 0) throw new InternalErrorResponse();
    const employeeData: any = await AdminUserRepo.findById(id);
    return new SuccessResponse(
      'Employee successfully updated',
      await customAdminUserResponse(employeeData[0]),
    ).send(res);
  }),
);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authorization);
/*-------------------------------------------------------------------------*/

router.post(
  '/add',
  validator(schema.employeeFormData, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const adminUser: any = await AdminUserRepo.findByEmail(req.body.email);
    if (adminUser && adminUser.length > 0)
      throw new BadRequestResponse('Employee already exist with the same email address.').send(res);

    const now = new Date();
    //const imageFile = imageName[0].filename;
    const loggedInUserId = req.userId;
    const loggedInUser: any = await AdminUserRepo.findById(loggedInUserId);
    const storeId = loggedInUser[0].storeId;
    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const { adminUser: createdUser } = await AdminUserRepo.create(
      {
        title: `${req.body.firstName} ${req.body.lastName}`,
        password: passwordHash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: '',
        roleId: req.body.roleId,
        storeId: storeId,
        profileImage: req.body.profileImage,
        isActive: req.body.isActive,
        createdAt: now,
        updatedAt: now,
      } as Employee,
      accessTokenKey,
      refreshTokenKey,
    );
    // Send email notification to user
    await sendEmail(
      req.body.email,
      '',
      'Created As User',
      ADMIN_USER_CREATION_TEMPLATE,
      addBaseURLWeb(''),
      {
        email: req.body.email,
        password: req.body.password,
      },
    );

    new SuccessResponse('Employee Added Successful', {
      adminUser: _.pick(createdUser, [
        'id',
        'title',
        'firstName',
        'lastName',
        'email',
        'phone',
        'roleId',
        'storeId',
        'profileImage',
        'isActive',
      ]),
    }).send(res);
  }),
);

router.post(
  '/get-employees',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { search } = req.body;
    const loggedInUserId = req.userId;
    const loggedInUser: any = await AdminUserRepo.findById(loggedInUserId);
    const storeId = loggedInUser[0].storeId;
    let { page, limit, offSet } = getAdminPaginationParams(req);
    let countData;
    let list;
    if (search) {
      countData = await AdminUserRepo.employeesCountBySearch(
        search.roleId,
        search.searchTerm,
        storeId,
      );
      list = await AdminUserRepo.employeesBySearch(
        search.roleId,
        storeId,
        search.searchTerm,
        limit,
        offSet,
      );
    } else {
      countData = await AdminUserRepo.adminUserCount(storeId);
      list = await AdminUserRepo.getAllEmployees(storeId, limit, offSet);
    }
    return new SuccessResponse('success', {
      data: await customAdminUserCollectionResponse(list),
      pagination: getPaginationObject(page, countData[0].rowCount, limit),
    }).send(res);
  }),
);

router.delete(
  '/delete-employee',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { employeeId } = req.body;
    const employeeExist: any = await AdminUserRepo.findById(employeeId);
    if (!employeeExist || employeeExist.length === 0)
      throw new BadRequestResponse('Employee not found!').send(res);
    const employee = await AdminUserRepo.deleteEmployee(employeeId);
    if (employee.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    return new SuccessResponse('success', employee).send(res);
  }),
);

export default router;
