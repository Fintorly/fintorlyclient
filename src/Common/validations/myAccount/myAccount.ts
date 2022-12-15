import yup from '~/Common/yup';
import {
  formSelectValidationRequiredSchema,
  formSelectValidationSchema,
} from '../common/common';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';

export const schemaEditMembershipInformation = () => {
  return yup.object({}).shape({
    city: formSelectValidationRequiredSchema,
    district: formSelectValidationRequiredSchema,
    quarter: formSelectValidationRequiredSchema,
    street: formSelectValidationRequiredSchema,
    account: formSelectValidationSchema, //TODO:account servisi henüz eklenmedi eklenince formSelectValidationRequiredSchema ekle
    address: yup.string().required(i18n.t(LangKeys.require_address_detail)),
    email: yup.string(),
    phone: yup.string(),
    smsChannel: yup.boolean(),
    emailChannel: yup.boolean(),
  });
};
