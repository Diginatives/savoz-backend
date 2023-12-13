import Joi from '@hapi/joi';
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
    password: Joi.string().required(),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    title: Joi.string().required().min(2),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    phone: Joi.string().required().min(0),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  saveCard: Joi.object().keys({
    id: Joi.string().required(),
  }),
  defaultCard: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
  deleteCard: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
};
