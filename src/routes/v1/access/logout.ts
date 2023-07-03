import express from 'express';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import clientType from '../../../constants/roles';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.delete(
  '',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const roleId = req['roleId'];
    let type: string;
    if (roleId === clientType.USERID) type = clientType.USER;
    else type = clientType.EMPLOYEE;
    await KeystoreRepo.remove(req.keystore.id, type);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;
