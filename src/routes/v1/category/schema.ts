import Joi from '@hapi/joi';

export default {
  subCategory: Joi.object().keys({
    mainCategoryId: Joi.number().required(),
    name: Joi.string().optional().min(3),
    description: Joi.string().optional(),
    image: Joi.string().optional().uri(),
    isActive: Joi.boolean().optional(),
  }),
  file: Joi.object().keys({
    file: Joi.string().optional().uri(),
  }),
  subCategoryListing: Joi.object().keys({
    type: Joi.number().required(),
  }),
  productListing: Joi.object().keys({
    subCategoryId: Joi.number().required(),
  }),
};
