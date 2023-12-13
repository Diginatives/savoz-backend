export const PAYMENT_LOGS_TABLE_NAME = 'paymentLogs';

export const PAYMENT_LOGS_COL = {
  id: 'id',
  userId: 'userId',
  orderId: 'orderId',
  amount: 'amount',
  transactionId: 'transactionId',
};

export default interface PaymentLogs {
  id: number;
  userId: number;
  orderId: number;
  amount: number;
  transactionId: string;
  createdAt: Date;
}
