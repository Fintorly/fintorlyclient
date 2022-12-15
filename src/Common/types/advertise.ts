import {AdvertisePaymentMethodResponse} from '~/Mobile-Api';
import {SelectType} from '~/Navigator/NavigatorTypes';

export type ChosenData = {
  subcategory?: SelectType;
  category?: SelectType;
  group: SelectType;
};

export type CreateSalesAdvertiseType = {
  title?: string;
  description?: string;
  city?: SelectType;
  district?: SelectType;
  brand?: string;
  amount?: {
    maxAmount?: number;
    minAmount?: number;
    maxAmountUnit?: SelectType;
    minAmountUnit?: SelectType;
  };
  isShippingCost?: boolean;
  delivery?: SelectType;
  advertisePeriod?: SelectType;
  expireTime?: SelectType;
  prices?: SelectType;
  id?: number;
  paymentMethod?: AdvertisePaymentMethodResponse;
};

export type CreatePurchaseAdvertiseType = {
  title?: string;
  description?: string;
  city?: SelectType;
  district?: SelectType;
  brand?: string;
  quarter?: SelectType;
  street?: SelectType;
  address?: string;
  addressId?: number;
  quantityUnit?: SelectType;
  quantity?: number;
  delivery?: SelectType;
  isShippingCost?: boolean;
  expireTime?: SelectType;
  prices?: SelectType;
  shownOwnAddress?: boolean;
  id?: number;
  paymentMethod?: AdvertisePaymentMethodResponse;
};
