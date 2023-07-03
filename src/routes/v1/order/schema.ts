import Joi from '@hapi/joi';
import DELIVERY_METHOD from '../../../constants/deliveryMethods';
import { ORDER_TYPE } from '../../../constants/order';
import PAYMENT_METHOD from '../../../constants/payment';

export default {
  order: Joi.object().keys({
    paymentMethodId: Joi.string().optional(),
    cardId: Joi.string().optional(),
    deliveryMethod: Joi.string().required().valid(DELIVERY_METHOD.DOOR, DELIVERY_METHOD.PICKUP),
    totalTax: Joi.number().required(),
    totalPayable: Joi.number().required(),
    discount: Joi.number().optional(),
    totalPrice: Joi.number().required(),
    orderType: Joi.number().required().valid(ORDER_TYPE.TYPE24, ORDER_TYPE.TYPE20),
    paymentMethod: Joi.string()
      .required()
      .valid(PAYMENT_METHOD.CREDITCARD, PAYMENT_METHOD.BANKACCOUNT),
    deliveryAddress: Joi.optional(),
    deliveryLatLng: Joi.optional(),
    products: Joi.array().items(
      Joi.object({
        productUnitPrice: Joi.number().required(),
        productId: Joi.number().required(),
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        totalTax: Joi.number().required(),
        totalPrice: Joi.number().required(),
        productItemSKU: Joi.string().required(),
      }).required(),
    ),
  }),
};
