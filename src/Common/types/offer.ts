import {SelectType} from '~/Navigator/NavigatorTypes';

export type PurchaseOfferSelectType = {
  city?: SelectType;
  district?: SelectType;
  quarter?: SelectType;
  street?: SelectType;
  addressDescription?: string;
  quantityUnit?: SelectType;
  prices?: SelectType;
  quantity?: number;
};

export type SaleOfferSelectType = {
  city?: SelectType;
  district?: SelectType;
  quantityUnit?: SelectType;
  price?: number;
  delivery?: SelectType;
  quantity?: number;
  isShippingCost?: boolean;
};

export type MyOfferPropsTypes = {
  search?: string;
  isTabChange: boolean;
};
