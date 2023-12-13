export const ORDER_TABLE_NAME = 'orders';

export const ORDER_COL = {
  orderId: 'orderId',
  orderUserId: 'orderUserId',
  orderTotalPrice: 'orderTotalPrice',
  orderTotalTax: 'orderTotalTax',
  orderTotalPayable: 'orderTotalPayable',
  orderStatus: 'orderStatus',
  orderOrderType: 'orderOrderType',
  orderDeliveryMethod: 'orderDeliveryMethod',
  orderDeliveryAddress: 'orderDeliveryAddress',
  orderDeliveryLatLng: 'orderDeliveryLatLng',
  orderDeliveryCharges: 'orderDeliveryCharges',
  orderDeliveryDateTime: 'orderDeliveryDateTime',
  orderDeliveryCompany: 'orderDeliveryCompany',
  orderDeliveryTrackingNumber: 'orderDeliveryTrackingNumber',
  orderAssignedTo: 'orderAssignedTo',
  orderAssignedDate: 'orderAssignedDate',
  orderAssignedTime: 'orderAssignedTime',
  orderProductsName: 'orderProductsName',
  orderUserName: 'orderUserName',
  orderIsActive: 'orderIsActive',
  orderCreatedAt: 'orderCreatedAt',
  orderUpdatedAt: 'orderUpdatedAt',
};

export default interface Order {
  orderId?: number;
  orderUserId?: number;
  orderTotalPrice: number;
  orderTotalTax: number;
  orderTotalPayable: number;
  orderStatus?: string;
  orderPaymentMethod: string;
  orderTotalDiscount?: number;
  orderOrderType: number;
  orderDeliveryMethod: number;
  orderDeliveryAddress: string;
  orderDeliveryLatLng: string;
  orderDeliveryCharges?: number;
  orderDeliveryDateTime?: Date;
  orderDeliveryCompany?: number;
  orderDeliveryTrackingNumber?: string;
  orderAssignedTo?: string;
  orderAssignedDate?: Date;
  orderAssignedTime?: Date;
  orderProductsName?: string;
  orderUserName?: string;
  orderIsActive?: boolean;
  orderCreatedAt?: Date;
  orderUpdatedAt?: Date;
}
