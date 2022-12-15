import {MyOrderMenu} from '../enums/menu';

export type OrderPropsTypes = {
  type: MyOrderMenu;
  isTabChange: boolean;
};

export enum OrderStatusType {
  Continuing = 'Continuing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum CustomerType {
  Buyer = 'Alıcı',
  Seller = 'Satıcı',
}
