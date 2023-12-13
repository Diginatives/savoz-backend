import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (roleCode: string) => (req: RoleRequest, res: Response, next: NextFunction) => {
  req.currentRoleCode = roleCode;
  next();
};
