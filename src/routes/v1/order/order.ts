import express from 'express';
import authentication from '../../../auth/authentication';
import DELIVERY_METHOD from '../../../constants/deliveryMethods';
import {
  BadRequestResponse,
  InternalErrorResponse,
  SuccessResponse,
} from '../../../core/ApiResponse';
import Logger from '../../../core/Logger';
import { customOrderCollectionResponse } from '../../../custom/order-responses';
import OrderRepo from '../../../database/repository/OrderRepo';
import UserRepo from '../../../database/repository/UserRepo';
import payment from '../../../function/payment';
import { getPaginationObject, getPaginationParams } from '../../../function/utils';
import asyncHandler from '../../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../../helpers/validator';
import { ProtectedRequest } from '../../../types/app-request';
import schema from './schema';
import userConstants from '../../../constants/userConstants';
import ProductRepo from '../../../database/repository/ProductRepo';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

//User Order's API's

router.post(
  '/order_place',
  validator(schema.order, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const {
      deliveryMethod,
      totalTax,
      totalPayable,
      discount,
      totalPrice,
      orderType,
      paymentMethod,
      deliveryAddress,
      deliveryLatLng,
      cardId,
      paymentMethodId,
      products,
    } = req.body;
    const orderObj = {
      orderPaymentMethod: paymentMethod,
      orderDeliveryMethod: deliveryMethod,
      orderDeliveryLatLng: deliveryMethod === DELIVERY_METHOD.DOOR ? deliveryLatLng : null,
      orderDeliveryAddress: deliveryMethod === DELIVERY_METHOD.DOOR ? deliveryAddress : null,
      orderTotalDiscount: parseFloat(discount),
      orderOrderType: orderType,
      orderTotalPrice: parseFloat(totalPrice),
      orderTotalPayable: parseFloat(totalPayable),
      orderTotalTax: parseFloat(totalTax),
      orderDeliveryCharges: 0,
    };

    if (req['userId'] === userConstants.GUEST_INFO.guestId) {
      return new BadRequestResponse("Guest can't place order").send(res);
    }

    try {
      const user: any = await UserRepo.findById(req['userId']);
      const { isError, productsList }: any = await ProductRepo.validateProductQuantities(
        products,
        orderType,
      );
      if (isError) {
        return new SuccessResponse('success', { productsList, outOfStock: true }).send(res);
      }
      if (!paymentMethodId && !cardId) {
        return new BadRequestResponse('cardId is required').send(res);
      }
      if (paymentMethodId) {
        let stripeId = user[0].stripeId;
        if (user[0] && (!user[0].stripeId || user[0].stripeId === null)) {
          stripeId = await payment.createCustomer(user[0]);
        }
        await payment.attachCard(paymentMethodId, stripeId);
        const cardData = [stripeId, paymentMethodId];
        await UserRepo.updateStripeIdAndCardId(user[0].id, cardData);
      }

      const result: any = await OrderRepo.createOrder(orderObj, req.userId, productsList, cardId);
      if (result) return new SuccessResponse('success', result).send(res);
    } catch (err: any) {
      Logger.info(err);
      console.log('eerr', err.message);
      return new InternalErrorResponse(`${err.message}`).send(res);
    }
  }),
);

router.get(
  '/all_orders',
  asyncHandler(async (req: ProtectedRequest, res) => {
    let { page, limit, offSet } = getPaginationParams(req);
    const userId = req['userId'];
    const countData = await OrderRepo.countOrderByUserId(userId);
    const orders = await OrderRepo.findByUserId(userId, limit, offSet);
    return new SuccessResponse('success', {
      orders: await customOrderCollectionResponse(orders),
      pagination: getPaginationObject(page, countData[0].rowCount, limit),
    }).send(res);
  }),
);

router.get(
  '/order_addresses',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const userId = req['userId'];
    const order = await OrderRepo.findAddressByUserId(userId);
    return new SuccessResponse('success', order).send(res);
  }),
);

router.get(
  '/order_receipt/:orderId',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { orderId } = req.params;
    const order = await OrderRepo.findOrderById(orderId as unknown as number);
    if (!order) throw new BadRequestResponse('Order not found').send(res);
    const userId = order[0].orderUserId;
    const customerDetails = await UserRepo.findById(userId);

    const orderProducts: any = await OrderRepo.orderProducts(order[0].orderId);
    return new SuccessResponse('success', {
      order: order,
      customerDetails: customerDetails,
      orderProducts: orderProducts,
    }).send(res);
  }),
);

export default router;
