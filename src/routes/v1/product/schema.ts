import Joi from '@hapi/joi';

export default {
  productListing: Joi.object().keys({
    subCategoryId: Joi.number().optional(),
    storeId: Joi.number().optional(),
    searchText: Joi.optional(),
    userId: Joi.optional(),
  }),
  search: Joi.object().keys({
    searchText: Joi.optional(),
  }),
  favourite: Joi.object().keys({
    userId: Joi.number().required(),
    productId: Joi.number().required(),
  }),
  favouriteId: Joi.object().keys({
    favouriteId: Joi.number().required(),
  }),
};
