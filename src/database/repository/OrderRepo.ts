import { ORDER_STATUS } from '../../constants/order';
import userConstants from '../../constants/userConstants';
import Logger from '../../core/Logger';
import payment from '../../function/payment';
import { fixedPrice, transferAmountForStripe } from '../../function/utils';
import sql, { executeQuery, updateRecord } from '../index';
import Order, { ORDER_COL, ORDER_TABLE_NAME } from '../model/Order';
import { ORDER_PRODUCT_COL, ORDER_PRODUCT_TABLE_NAME } from '../model/OrderPrducts';
import { PRODUCT_COL, PRODUCT_TABLE_NAME } from '../model/Product';
import PaymentLogsRepo from './PaymentLogsRepo';
import ProductRepo from './ProductRepo';
import UserRepo from './UserRepo';

export default class OrderRepo {
  public static async createOrder(
    order: Order,
    userId: number,
    products: any,
    cardId: string,
  ): Promise<{ order: Order; products: any }> {
    const connection: any = await sql.connection();
    try {
      await connection.query('START TRANSACTION');
      const orderProductsName: string = products.map((p: any) => p.productName).join(',');
      const user: any = await UserRepo.findById(userId);
      console.log('at orderplace query...');
      const now = new Date();
      const orderObj = {
        orderUserId: userId,
        orderTotalPrice: fixedPrice(order.orderTotalPrice),
        orderTotalTax: fixedPrice(order.orderTotalTax),
        orderTotalPayable: fixedPrice(order.orderTotalPayable),
        orderStatus: ORDER_STATUS.INPROGRESS,
        orderOrderType: order.orderOrderType,
        orderTotalDiscount: fixedPrice(order.orderTotalDiscount || 0),
        orderDeliveryMethod: order.orderDeliveryMethod,
        orderDeliveryAddress: order.orderDeliveryAddress,
        orderDeliveryLatLng: order.orderDeliveryLatLng,
        orderDeliveryCharges: order.orderDeliveryCharges,
        orderPaymentMethod: order.orderPaymentMethod,
        orderProductsName: orderProductsName,
        orderUserName: `${user[0].firstName} ${user[0].lastName}`,
        orderCreatedAt: now,
      };

      const data: any = await connection.query(`INSERT INTO ${ORDER_TABLE_NAME} SET ?`, orderObj);
      const newOrder: Order = { ...orderObj, orderId: data.insertId };
      let productData = [];
      let productObj;
      if (newOrder && newOrder.orderId) {
        for (const product of products) {
          await ProductRepo.updateQuantity(
            product.product.productId,
            product.product.productQuantity - product.quantity,
          );
          productObj = {
            orderId: newOrder.orderId,
            productName: product.productName,
            productId: product.productId,
            quantity: product.quantity,
            unitPrice: product.productUnitPrice,
            totalPrice: product.totalPrice,
            totalTax: product.totalTax,
            createdAt: now,
          };
          const productResponse = await connection.query(
            `INSERT INTO ${ORDER_PRODUCT_TABLE_NAME} SET ?`,
            productObj,
          );
          productData.push({ ...productObj, orderProductId: productResponse.insertId });
        }
      }
      // const paymentIntent: any = await payment.chargePayment(
      //   user[0],
      //   cardId,
      //   transferAmountForStripe(order.orderTotalPayable.toFixed(2)),
      // );
      // const paymentLog = {
      //   userId: userId,
      //   orderId: newOrder.orderId,
      //   amount: order.orderTotalPayable,
      //   transactionId: paymentIntent.id,
      // };
      // await PaymentLogsRepo.create(paymentLog);
      await connection.query('COMMIT');
      return { order: newOrder, products: productData };
    } catch (err) {
      await connection.query('ROLLBACK');
      console.log('ROLLBACK at order place query');
      Logger.info('DB Trasanction Failed at Order Place Creation');
      Logger.info(err);
      throw err;
    } finally {
      await connection.release();
    }
  }

  public static async countOrderByUserId(userId: number): Promise<any> {
    const query: string = `Select count(*) as rowCount
    from ${ORDER_TABLE_NAME} 
    where ${ORDER_TABLE_NAME}.${ORDER_COL.orderUserId} = ${userId}
    and ${ORDER_TABLE_NAME}.${ORDER_COL.orderIsActive} = ${userConstants.ACTIVE_STATUS.ISACTIVETRUE}`;
    return executeQuery(query);
  }

  public static async findAddressByUserId(userId: number): Promise<any> {
    const query: string = `Select DISTINCT ${ORDER_TABLE_NAME}.${ORDER_COL.orderDeliveryAddress},${ORDER_TABLE_NAME}.${ORDER_COL.orderDeliveryLatLng} 
    from ${ORDER_TABLE_NAME} 
    where ${ORDER_TABLE_NAME}.${ORDER_COL.orderUserId} = ${userId}
    and ${ORDER_TABLE_NAME}.${ORDER_COL.orderDeliveryAddress} IS NOT NULL;`;
    return executeQuery(query);
  }

  public static async findByOrderId(orderId: number): Promise<any> {
    const query: string = `Select *
    from ${ORDER_TABLE_NAME} 
    where ${ORDER_TABLE_NAME}.${ORDER_COL.orderId} = ${orderId}`;
    return executeQuery(query);
  }

  public static async findByUserId(userId: number, limit: number, offSet: number): Promise<any> {
    const query: string = `Select * from (Select *
      from ${ORDER_TABLE_NAME} 
      where ${ORDER_TABLE_NAME}.${ORDER_COL.orderUserId} = ${userId}
      and ${ORDER_TABLE_NAME}.${ORDER_COL.orderIsActive} = ${userConstants.ACTIVE_STATUS.ISACTIVETRUE}
      LIMIT ${limit} OFFSET ${offSet}) a ORDER BY ${ORDER_COL.orderId} DESC`;
    return await executeQuery(query);
  }

  public static async findProductsByOrderId(orderId: number): Promise<any> {
    const query: string = `Select *
    from ${ORDER_PRODUCT_TABLE_NAME}
    inner join ${PRODUCT_TABLE_NAME}
    on ${ORDER_PRODUCT_TABLE_NAME}.${ORDER_PRODUCT_COL.productId} = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} 
    where ${ORDER_PRODUCT_TABLE_NAME}.${ORDER_PRODUCT_COL.orderId} = ${orderId}`;
    return executeQuery(query);
  }

  public static async countAllOrder(orderType: number, searchText: string): Promise<any> {
    const query: string = `Select count(*) as rowCount
    from ${ORDER_TABLE_NAME}
    where (${ORDER_TABLE_NAME}.${ORDER_COL.orderUserName} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderProductsName} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderId} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderDeliveryAddress} LIKE '%${searchText}%')
    and ${ORDER_TABLE_NAME}.${ORDER_COL.orderIsActive} = ${userConstants.ACTIVE_STATUS.ISACTIVETRUE}
    ${orderType ? `and( ${ORDER_TABLE_NAME}.${ORDER_COL.orderOrderType} = ${orderType})` : ''}`;
    return executeQuery(query);
  }

  public static async assignRider(orderId: number, riderAssignData: string[]): Promise<any> {
    return updateRecord(
      `update ${ORDER_TABLE_NAME} set ${ORDER_TABLE_NAME}.${ORDER_COL.orderAssignedTo}=?,${ORDER_TABLE_NAME}.${ORDER_COL.orderAssignedDate}=?,${ORDER_TABLE_NAME}.${ORDER_COL.orderAssignedTime}=?,${ORDER_TABLE_NAME}.${ORDER_COL.orderStatus}=? 
      where ${ORDER_TABLE_NAME}.${ORDER_COL.orderId}=${orderId}`,
      riderAssignData,
    );
  }

  public static async recentOrders(currentDate: string, spanOf: string): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00' ORDER BY ${ORDER_TABLE_NAME}.${ORDER_COL.orderCreatedAt} ASC LIMIT 10`,
    );
  }

  public static async findOrderById(orderId: number): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderId} = ${orderId}`,
    );
  }

  public static async orderProducts(orderId: number): Promise<any> {
    return executeQuery(
      `SELECT ${ORDER_PRODUCT_TABLE_NAME}.* , productItemName as productName, productItemSKU as productSKU FROM ${ORDER_PRODUCT_TABLE_NAME}
      LEFT JOIN ${PRODUCT_TABLE_NAME} ON ${ORDER_PRODUCT_TABLE_NAME}.${ORDER_PRODUCT_COL.productId} = ${PRODUCT_TABLE_NAME}.${PRODUCT_COL.productId} WHERE ${ORDER_PRODUCT_COL.orderId} = ${orderId}`,
    );
  }

  public static async sales(currentDate: string, spanOf: string, orderType: number): Promise<any> {
    return executeQuery(
      `SELECT SUM(orderTotalPrice) as totalSales FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderOrderType}=${orderType} AND ${ORDER_COL.orderCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'`,
    );
  }

  public static async avgSales(
    currentDate: string,
    spanOf: string,
    orderType: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT AVG(orderTotalPrice) as avgSales FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus}='Delivered' AND ${ORDER_COL.orderOrderType}=${orderType} AND ${ORDER_COL.orderCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'`,
    );
  }

  public static async graphData(
    currentDate: string,
    spanOf: string,
    orderType: number,
    getDataBy: string,
    orderBy: string,
  ): Promise<any> {
    return executeQuery(
      `SELECT ${getDataBy}(${ORDER_COL.orderCreatedAt}) as period, COUNT(*) AS total FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus} NOT IN ('Delivered', 'Cancelled') AND ${ORDER_COL.orderOrderType}=${orderType} AND date(${ORDER_COL.orderCreatedAt}) BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00' GROUP BY period ORDER BY ${orderBy}(period)`,
    );
  }

  public static async salesPreviousSpan(
    spanOf: string,
    previousSpanDays: string,
    orderType: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT SUM(orderTotalPrice) as previouseTotalSales FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus}='Delivered' AND ${ORDER_COL.orderOrderType}=${orderType} AND ${ORDER_COL.orderCreatedAt} BETWEEN '${previousSpanDays} 00:00:00' AND '${spanOf} 00:00:00'`,
    );
  }

  public static async deliveredOrders(currentDate: string, spanOf: string): Promise<any> {
    return executeQuery(
      `SELECT * FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus}='Delivered' AND ${ORDER_COL.orderCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00' ORDER BY ${ORDER_TABLE_NAME}.${ORDER_COL.orderCreatedAt} ASC LIMIT 10;`,
    );
  }

  public static async avgOrders(
    spanOf: string,
    currentDate: string,
    orderType: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT AVG(orderTotalPrice) as avgOrders FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus} NOT IN ('Delivered', 'Cancelled') AND  ${ORDER_COL.orderOrderType}=${orderType} AND ${ORDER_COL.orderCreatedAt} BETWEEN '${spanOf} 00:00:00' AND '${currentDate} 00:00:00'`,
    );
  }

  public static async previousAvgOrders(
    previousSpanDays: string,
    spanOf: string,
    orderType: number,
  ): Promise<any> {
    return executeQuery(
      `SELECT AVG(orderTotalPrice) as previousAvgOrders FROM ${ORDER_TABLE_NAME} WHERE ${ORDER_COL.orderStatus} NOT IN ('Delivered', 'Cancelled') AND  ${ORDER_COL.orderOrderType}=${orderType} AND ${ORDER_COL.orderCreatedAt} BETWEEN '${previousSpanDays} 00:00:00' AND '${spanOf} 00:00:00'`,
    );
  }

  public static async deleteOrdeer(orderId: number): Promise<any> {
    return updateRecord(
      `update ${ORDER_TABLE_NAME} set ${ORDER_TABLE_NAME}.${ORDER_COL.orderIsActive}=? 
    where ${ORDER_TABLE_NAME}.${ORDER_COL.orderId}=${orderId}`,
      [userConstants.ACTIVE_STATUS.ISACTIVEFALSE.toString()],
    );
  }

  public static async getAllOrders(
    orderType: number,
    searchText: string,
    limit: number,
    offSet: number,
  ): Promise<any> {
    const query: string = `Select *
    from ${ORDER_TABLE_NAME} 
    where (${ORDER_TABLE_NAME}.${ORDER_COL.orderUserName} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderId} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderProductsName} LIKE '%${searchText}%' or
    ${ORDER_TABLE_NAME}.${ORDER_COL.orderDeliveryAddress} LIKE '%${searchText}%')
    and ${ORDER_TABLE_NAME}.${ORDER_COL.orderIsActive} = ${userConstants.ACTIVE_STATUS.ISACTIVETRUE}
    ${orderType ? `and (${ORDER_TABLE_NAME}.${ORDER_COL.orderOrderType} = ${orderType})` : ' '}
    ORDER BY ${ORDER_TABLE_NAME}.${ORDER_COL.orderCreatedAt} DESC
    LIMIT ${limit} OFFSET ${offSet}`;
    return executeQuery(query);
  }
}

// inner join
//     ${ORDER_PRODUCT_TABLE_NAME} on
//     ${ORDER_TABLE_NAME}.${ORDER_COL.orderId} = ${ORDER_PRODUCT_TABLE_NAME}.${ORDER_PRODUCT_COL.orderId}
