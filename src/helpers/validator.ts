import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import { unLinkFile } from '../function/utils';
import CONSTANTS from '../constants/constants';
import { BadRequestResponse } from '../core/ApiResponse';

export enum ValidationSource {
  FILE = 'files',
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export const JoiObjectId = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value) return helpers.error('any.invalid');
    return value;
  }, 'Object Id Validation');

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) return helpers.error('any.invalid');
    return value;
  }, 'Url Endpoint Validation');

export const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
    if (!value.split(' ')[1]) return helpers.error('any.invalid');
    return value;
  }, 'Authorization Header Validation');

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('In Validatiaon check');
      let err;
      if (source === ValidationSource.FILE) {
        const files: any = req[source];
        if (!files || files === undefined || files.length <= 0) {
          next(new BadRequestResponse('file is required').send(res));
          return;
        }
        if (files[0].fieldname !== 'file') {
          next(new BadRequestResponse(`${files[0].fieldname} field not allowed`).send(res));
          return;
        }
        const d = files[0].fieldname;
        const { error } = schema.validate({ file: d });
        err = error;
      } else {
        const { error } = schema.validate(req[source]);
        err = error;
      }

      if (!err) return next();

      const { details } = err;
      const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
      Logger.error(message);

      const url: any = req['files'];
      if (req.originalUrl === '/v1/admin/upload_profile' && err && url && url[0]) {
        unLinkFile(CONSTANTS.dirAdminImage, url[0].filename);
      }
      if (req.originalUrl === '/v1/profile/upload_file' && err && url && url[0]) {
        unLinkFile(CONSTANTS.dirImage, url[0].filename);
      }

      next(new BadRequestResponse(message).send(res));
    } catch (error) {
      console.log('Error ', error);

      next(error);
    }
  };
