import express from 'express';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import UserRepo from '../../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import CONSTANTS from '../../../constants/constants';
import { customUserResponse } from '../../../custom/user-responses';
import bcrypt from 'bcrypt';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import clientType from '../../../constants/roles';
import userConstants from '../../../constants/userConstants';
import { base64FileHeaderMapper } from '../../../function/utils';
const fs = require('fs');

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/my',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user: any = await UserRepo.findById(req['userId']);
    if (!user || user.length === 0) throw new NotFoundResponse('User not found').send(res);
    return new SuccessResponse('success', await customUserResponse(user[0])).send(res);
  }),
);

//Upload profile without base64
router.post(
  '/upload_file',
  validator(schema.file, ValidationSource.FILE),
  asyncHandler(async (req: ProtectedRequest, res) => {
    let imageName: any = req['files'];
    if (imageName[0].mimetype !== 'image/jpeg' && imageName[0].mimetype !== 'image/png') {
      return new BadRequestResponse('Invalid file type').send(res);
    }
    const imageFile = imageName[0].filename;
    const userExist: any = await UserRepo.findById(req['userId']);
    try {
      if (userExist[0].avatar && imageFile) {
        await fs.unlinkSync(`${CONSTANTS.dirImage}${userExist[0].avatar}`);
      }
    } catch (e: any) {
      console.log(e);
    }
    const avatarData: any = await UserRepo.uploadAvatar(userExist[0].id, imageFile);
    if (!avatarData || avatarData.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const user: any = await UserRepo.findById(req['userId']);
    return new SuccessResponse(
      'File successfully uploaded',
      await customUserResponse(user[0]),
    ).send(res);
  }),
);
//

router.post(
  '/update',
  validator(schema.profile, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { title, firstName, lastName, phone, email, address, dob, userLat, userLng } = req.body;
    if (req['userId'] === userConstants.GUEST_INFO.guestId) {
      return new BadRequestResponse("Guest can't update profile").send(res);
    }
    const checkUser: any = await UserRepo.findById(req['userId']);
    if (!checkUser || checkUser.length === 0)
      throw new NotFoundResponse('User not found').send(res);

    if (email !== checkUser[0].email) {
      const checkEmailExist = await UserRepo.findByEmail(email);
      if (checkEmailExist && checkEmailExist.length > 0) {
        throw new BadRequestResponse('Email already registered').send(res);
      }
    }
    const add = address ? address : checkUser[0].address;
    const lat = userLat ? userLat : checkUser[0].userLat;
    const lng = userLng ? userLng : checkUser[0].userLng;
    const dateOfBirth = dob ? dob : checkUser[0].dob;
    const profileData = [title, firstName, lastName, email, phone, add, dateOfBirth, lat, lng];
    const data: any = await UserRepo.updateProfile(req['userId'], profileData);
    if (data.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const userData: any = await UserRepo.findById(req['userId']);
    return new SuccessResponse(
      'Profile successfully updated',
      await customUserResponse(userData[0]),
    ).send(res);
  }),
);

router.post(
  '/update_password',
  validator(schema.updatePassword, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    if (req['userId'] === userConstants.GUEST_INFO.guestId) {
      return new BadRequestResponse("Guest can't update password").send(res);
    }
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let checkUser: any = await UserRepo.findById(req['userId']);
    const checkOldPassword = await bcrypt.compare(oldPassword, checkUser[0].password);
    if (!checkOldPassword) throw new NotFoundResponse('Invalid old password').send(res);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    const userData = await UserRepo.updatePassword(checkUser[0].id, hashed);

    if (userData.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    return new SuccessResponse(
      'Password changed successfully',
      await customUserResponse(checkUser[0]),
    ).send(res);
  }),
);

router.delete(
  '/delete',
  validator(schema.deleteProfile, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    if (req['userId'] === userConstants.GUEST_INFO.guestId) {
      return new BadRequestResponse("Guest can't delete profile").send(res);
    }
    const { userId, roleId } = req.body;
    if (userId !== req['userId'] || roleId !== req['roleId']) {
      throw new NotFoundResponse('User not found').send(res);
    }
    let checkUser: any = await UserRepo.findByIdAndRoleId(userId, roleId);
    if (!checkUser || checkUser.length <= 0) throw new NotFoundResponse('User not found').send(res);

    const userData = await UserRepo.deleteProfile(
      userId,
      userConstants.ACTIVE_STATUS.ISACTIVEFALSE,
    );
    if (userData.affectedRows <= 0) throw new InternalErrorResponse().send(res);

    const keyStoreData = await KeystoreRepo.removeByClient(userId, clientType.USER);
    if (keyStoreData.affectedRows <= 0) throw new InternalErrorResponse().send(res);

    return new SuccessResponse('User deleted successfully', {}).send(res);
  }),
);

//upload profile with base64
router.post(
  '/upload_profile',
  validator(schema.profilePic, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { image, imageName } = req.body;
    if (req['userId'] === userConstants.GUEST_INFO.guestId) {
      return new BadRequestResponse("Guest can't upload profile").send(res);
    }
    const base64Data: any = image.replace(/^data:image\/(jpeg|png|jpg);base64,/, '');
    const fileType = await base64FileHeaderMapper(base64Data);
    if (fileType !== 'JPG' && fileType !== 'PNG' && fileType !== 'JPEG') {
      return new BadRequestResponse('Invalid file type').send(res);
    }
    let uploadedFilename = '';
    const userExist: any = await UserRepo.findById(req['userId']);
    const dateVal = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 10000000);
    uploadedFilename = dateVal + '-' + imageName;
    const imageWithExt: any = `${uploadedFilename}.${fileType}`;
    try {
      if (userExist[0].avatar && imageWithExt) {
        await fs.unlinkSync(`${CONSTANTS.dirImage}${userExist[0].avatar}`);
      }
    } catch (e: any) {
      console.log('error while unlink profile picture', e);
    }
    await fs.writeFile(
      `${CONSTANTS.dirImage}${imageWithExt}`,
      base64Data,
      'base64',
      function (err: any) {
        if (err) throw new BadRequestResponse('profile pictire not uploaded');
      },
    );
    const avatarData: any = await UserRepo.uploadAvatar(userExist[0].id, `${imageWithExt}`);
    if (!avatarData || avatarData.affectedRows <= 0) throw new InternalErrorResponse().send(res);
    const user: any = await UserRepo.findById(req['userId']);
    return new SuccessResponse(
      'Profile Picture successfully uploaded',
      await customUserResponse(user[0]),
    ).send(res);
  }),
);

export default router;
