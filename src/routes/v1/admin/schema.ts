import Joi from '@hapi/joi';
import { ORDER_STATUS, ORDER_TYPE } from '../../../constants/order';
import { JoiAuthBearer } from '../../../helpers/validator';

export default {
  new_password: Joi.object().keys({
    password: Joi.string().required().min(6),
    token: Joi.string().required(),
    userId: Joi.number().required().min(1),
  }),
  validate_reset_token: Joi.object().keys({
    token: Joi.string().required(),
    id: Joi.string().required().min(1),
  }),
  reset_password: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  file: Joi.object().keys({
    file: Joi.string().required(),
  }),
  profile: Joi.object().keys({
    title: Joi.string().required().min(2),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(0),
    phone: Joi.string().required().min(0),
    email: Joi.string().email().required(),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  orderList: Joi.object().keys({
    searchText: Joi.optional(),
    orderType: Joi.number().optional().valid(ORDER_TYPE.TYPE24, ORDER_TYPE.TYPE20),
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
  assingRider: Joi.object().keys({
    orderId: Joi.number().required(),
    riderName: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
      .required()
      .messages({
        'object.regex': 'invalid time format',
        'string.pattern.base': 'invalid time format',
      }),
    orderStatus: Joi.string()
      .valid(
        ORDER_STATUS.PENDING,
        ORDER_STATUS.INPROGRESS,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.CANCELLED,
      )
      .required(),
  }),
  deleteOrder: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
  option: Joi.object().keys({
    option: Joi.number().required(),
  }),
};
