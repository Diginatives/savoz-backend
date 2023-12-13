import express from 'express';
import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/ApiError';
import { BadRequestResponse } from '../core/ApiResponse';
import RoleRepo from '../database/repository/RoleRepo';
import EmployeeRepo from '../database/repository/admin/EmployeeRepo';
import asyncHandler from '../helpers/asyncHandler';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    // if (!req.userId || !req.user.roleId || !req.currentRoleCode)
    if (!req.userId || !req.roleId) throw new AuthFailureError('Permission denied');

    // const role = await RoleRepo.findById(req.user[].roleId);
    // const role = await RoleRepo.findById(req['roleId']);
    const role: any = await EmployeeRepo.findByRoleId(req['userId']);
    if (!role || role.length === 0) throw new BadRequestResponse('Permission denied').send(res);
    //if (!role || role.length === 0) throw new AuthFailureError('Permission denied');

    // const validRoles = req.user.roleId.filter((userRole) => userRole.id === role.id);

    return next();
  }),
);
