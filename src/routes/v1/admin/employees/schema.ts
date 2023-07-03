import Joi from '@hapi/joi';

export default {
  employeeFormData: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    roleId: Joi.number().required(),
    // storeId: Joi.number().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    isActive: Joi.number().required(),
    email: Joi.string().email().required(),
    profileImage: Joi.string().optional(),
  }),
  employeeUpdateFormData: Joi.object().keys({
    id: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    roleId: Joi.number().required(),
    // storeId: Joi.number().required(),
    phone: Joi.string().required(),
    isActive: Joi.number().required(),
    email: Joi.string().email().required(),
    profileImage: Joi.string().optional(),
  }),
  file: Joi.object().keys({
    file: Joi.required(),
  }),
};
