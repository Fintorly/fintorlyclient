import {CustomerStatus} from '~/Mobile-Api';
import {LoginUserType} from '../enums/user';
export type LoginResponseType = {
  name?: string | null;
  surname?: string | null;
  companyName?: string | null;
  userLoginType?: LoginUserType;
  email?: string | null;
  customerId?: string | null;
  agriculturalInputPurchase?: boolean;
  agriculturalInputSales?: boolean;
  agriculturalProductPurchase?: boolean;
  agriculturalProductSales?: boolean;
  isDocumentConfirmed?: boolean;
  isShowedApprovementScreen?: boolean;
  isSubCustomer?: boolean;
  isMainCustomerDocumentConfirmed?: boolean;
  isMainCustomerShowedApprovementScreen?: boolean;
  id?: number;
  customerStatus: CustomerStatus;
};

export type AddressType = {
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
  quarterId: number;
  quarterName: string;
  streetId: number;
  streetName: string;
  addressDescription: string;
  id: number;
};
