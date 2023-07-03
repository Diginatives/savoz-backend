export const ORDER_PRODUCT_TABLE_NAME = 'orderProducts';

export const ORDER_PRODUCT_COL = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  productName: 'productName',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  totalPrice: 'totalPrice',
  totalTax: 'totalTax',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export default interface OrderProduct {
  id?: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  totalTax: number;
  createdAt?: Date;
  updatedAt?: Date;
}
