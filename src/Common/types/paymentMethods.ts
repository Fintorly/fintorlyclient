import {PaymentChannels} from '~/Mobile-Api';
import {PaymentMethodsProps, SelectType} from '~/Navigator/NavigatorTypes';

export type PaymentMethodsPropsTypes = PaymentMethodsProps & {
  isTabChange: boolean;
};

export type PaymentMethodsSelectType = Omit<SelectType, 'value'> & {
  value: {
    cardNumber?: string;
    id: any;
    channel: PaymentChannels;
  };
};
