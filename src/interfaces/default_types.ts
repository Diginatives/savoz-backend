export interface updateData {
  affectedRows: number;
  changedRows: number;
}
export interface IPaymentParams {
  userId: number;
  orderId: number;
  amount: number;
  transactionId: string;
}
export interface riderData {
  riderName: string;
  dateTime: Date;
}
