export const STORE_TABLE_NAME = 'stores';

export const STORE_COL = {
  storeId: 'storeId',
  storeName: 'storeName',
  storeAddress: 'storeAddress',
  storeCity: 'storeCity',
  storeZipCode: 'StoreZipCode',
  storeLatLng: 'storeLatLng',
  storeEmail: 'storeEmail',
  storePhone: 'storePhone',
  storeIsActive: 'storeIsActive',
  storeType: 'storeType',
  storeCeatedAt: 'storeCreatedAt',
  storeUpdatedAt: 'storeUpdatedAt',
};

export default interface StoreInfo {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeCity: string;
  storeZipCode: number;
  storePhone: string;
  storeEmail: string;
  storeLatLng: string;
  storeIsActive: boolean;
  storeType: string;
  storeCeatedAt?: Date;
  storeUpdatedAt?: Date;
}
