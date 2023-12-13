import Joi from '@hapi/joi';

export default {
  productCategory: Joi.object().keys({
    id: Joi.number().optional(),
    subCategoryId: Joi.number().required(),
    name: Joi.string().optional().min(3),
    description: Joi.string().optional(),
    categoryImage: Joi.string().optional().allow(''),
    isActive: Joi.number().optional(),
  }),
  file: Joi.object().keys({
    file: Joi.string().optional().uri(),
  }),
  productCategoryListing: Joi.object().keys({
    type: Joi.string().required(),
  }),
  productCategorySearch: Joi.object().keys({
    subCategoryId: Joi.number().optional(),
    search: Joi.object().optional(),
  }),
};
