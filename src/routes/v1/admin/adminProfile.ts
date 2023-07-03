import express from 'express';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import { ProtectedRequest } from '../../../types/app-request';
import EmployeeRepo from '../../../database/repository/admin/EmployeeRepo';
import CONSTANTS from '../../../constants/constants';
import { customEmployeeResponse } from '../../../custom/employee-responses';
const fs = require('fs');

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
  '/upload_profile',
  validator(schema.file, ValidationSource.FILE),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const imageName: any = req['files'];
    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
      return new BadRequestResponse('Invalid file type').send(res);
    }
    const imageFile = imageName[0].filename;
    const dashboardUserExists: any = await EmployeeRepo.findById(req['userId']);
    try {
      if (dashboardUserExists[0].profileImage && imageFile) {
        await fs.unlinkSync(`${CONSTANTS.dirAdminUsers}${dashboardUserExists[0].profileImage}`);
      }
    } catch (e: any) {
      console.log(e);
    }
    const avatarData: any = await EmployeeRepo.uploadAvatar(dashboardUserExists[0].id, imageFile);
    if (!avatarData || avatarData.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const dashboardUser: any = await EmployeeRepo.findById(req['userId']);
    return new SuccessResponse(
      'File successfully uploaded',
      await customEmployeeResponse(dashboardUser[0]),
    ).send(res);
  }),
);

router.post(
  '/update_profile',
  validator(schema.profile, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { title, firstName, lastName, phone, email } = req.body;

    const checkUser: any = await EmployeeRepo.findById(req['userId']);
    if (!checkUser || checkUser.length === 0)
      throw new NotFoundResponse('User not found').send(res);

    if (email !== checkUser[0].email) {
      const checkEmailExist: any = await EmployeeRepo.findByEmail(email);
      if (checkEmailExist && checkEmailExist.length > 0) {
        throw new BadRequestResponse('Email already registered').send(res);
      }
    }
    const profileData = [title, firstName, lastName, email, phone];
    const data: any = await EmployeeRepo.updateProfile(req['userId'], profileData);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const dashboardUser: any = await EmployeeRepo.findById(req['userId']);
    return new SuccessResponse(
      'Profile successfully updated',
      await customEmployeeResponse(dashboardUser[0]),
    ).send(res);
  }),
);

export default router;
