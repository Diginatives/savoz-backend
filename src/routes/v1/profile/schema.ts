import Joi from '@hapi/joi';

export default {
  userId: Joi.object().keys({
    id: Joi.number().required(),
  }),
  file: Joi.object().keys({
    file: Joi.required(),
  }),
  profile: Joi.object().keys({
    title: Joi.string().required().min(2),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(0),
    phone: Joi.string().required().min(0),
    email: Joi.string().email().required(),
    address: Joi.string().optional(),
    dob: Joi.string().optional(),
    userLat: Joi.number().optional(),
    userLng: Joi.number().optional(),
  }),
  updatePassword: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(6),
  }),
  deleteProfile: Joi.object().keys({
    userId: Joi.number().required(),
    roleId: Joi.number().required(),
  }),
  profilePic: Joi.object().keys({
    imageName: Joi.string().required(),
    image: Joi.string().required(),
  }),
};
