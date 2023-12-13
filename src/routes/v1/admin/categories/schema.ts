import Joi from '@hapi/joi';

export default {
  subCategory: Joi.object().keys({
    id: Joi.number().optional(),
    mainCategoryId: Joi.number().required(),
    name: Joi.string().optional().min(3),
    description: Joi.string().optional(),
    isActive: Joi.number().optional(),
    categoryImage: Joi.string().optional().allow(''),
  }),
  file: Joi.object().keys({
    file: Joi.string().optional().uri(),
  }),
  subCategoryListing: Joi.object().keys({
    type: Joi.string().required(),
  }),
  productListing: Joi.object().keys({
    subCategoryId: Joi.number().required(),
  }),
};
