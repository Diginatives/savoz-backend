import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import asyncHandler from '../../../helpers/asyncHandler';
import schema from './schema';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ORDER_TYPE } from '../../../constants/order';
import { ProtectedRequest } from 'app-request';
import OrderRepo from '../../../database/repository/OrderRepo';
import ProductRepo from '../../../database/repository/admin/ProductRepo';
//let moment = require('moment');
import moment from 'moment';
import EmployeeRepo from '../../../database/repository/admin/EmployeeRepo';
import { getDataBy, orderDataBy } from '../../../function/utils';
import UserRepo from '../../../database/repository/UserRepo';

const router = express.Router();

router.post(
  '/statistics',
  validator(schema.option, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { option } = req.body;
    const now = moment();
    const currentDate = now.format('YYYY-MM-DD');
    const userId = req.userId;
    const user: any = await EmployeeRepo.findById(userId);
    const orderType = user && user[0].storeId === 1 ? 24 : 20;
    const storeId = user[0].storeId;
    const getBy: any = getDataBy(option as number);
    const orderBy: any = orderDataBy(option as number);

    const spanDays = moment();
    const spanOf = spanDays.subtract(option, 'days').format('YYYY-MM-DD');
    const previousSpanDays = spanDays.subtract(option, 'days').format('YYYY-MM-DD');
    // recent orders
    const recentOrders = await OrderRepo.recentOrders(currentDate, spanOf as string);
    // deliverd orders
    const deliveredOrders = await OrderRepo.deliveredOrders(currentDate, spanOf as string);
    // items out of stock
    const itemsOutOfStock = await ProductRepo.itemsOutOfStock(currentDate, spanOf as string);
    // sales
    const sales = await OrderRepo.sales(currentDate, spanOf as string, orderType);
    // average sales
    const avgSales = await OrderRepo.avgSales(currentDate, spanOf as string, orderType);
    const ordersGraphData = await OrderRepo.graphData(
      currentDate,
      spanOf as string,
      orderType,
      getBy,
      orderBy,
    );
    // average sales for previous span
    const previousSales = await OrderRepo.salesPreviousSpan(
      spanOf,
      previousSpanDays as string,
      orderType,
    );

    // New Customers Sections
    const employees = await UserRepo.newUsers(spanOf as string, currentDate);
    const employeesGraphData = await UserRepo.graphData(spanOf as string, currentDate, getBy);
    const previousSpanEmployees = await UserRepo.previousSpanUsers(previousSpanDays, spanOf);

    // Orders Sections
    const avgOrders = await OrderRepo.avgOrders(spanOf as string, currentDate, orderType);
    const previousAvgOrders = await OrderRepo.previousAvgOrders(
      previousSpanDays,
      spanOf,
      orderType,
    );

    return new SuccessResponse('', {
      sales: { sales, avgSales, previousSales },
      employees: { employees, previousSpanEmployees, employeesGraphData },
      orders: { avgOrders, previousAvgOrders, ordersGraphData },
      RecentOrder: recentOrders,
      DeliveredOrders: deliveredOrders,
      ItemsOutOfStock: itemsOutOfStock,
    }).send(res);
  }),
);

export default router;
