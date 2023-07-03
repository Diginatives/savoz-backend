import { PAYMENT_LOGS_TABLE_NAME } from '../model/PaymentLog';
import { insertRecord } from '../index';
import { IPaymentParams } from '../../interfaces/default_types';
import PaymentLogs from '../model/PaymentLog';

export default class PaymentLogsRepo {
  public static async create(data: any): Promise<any> {
    const now = new Date();
    const res: PaymentLogs = await insertRecord(PAYMENT_LOGS_TABLE_NAME, {
      userId: data.userId,
      orderId: data.orderId,
      amount: data.amount,
      transactionId: data.transactionId,
      createdAt: now,
    });

    return { paymentLog: res };
  }
}
