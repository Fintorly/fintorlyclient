import yup from '~/Common/yup';
import {
  formSelectValidationRequiredSchema,
  formSelectValidationSchema,
} from '../common/common';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';

export const schemaPurchaseSummary = (usedMyAddres?: boolean) => {
  const locationValidation = usedMyAddres
    ? formSelectValidationSchema
    : formSelectValidationRequiredSchema;
  return yup.object({}).shape({
    city: locationValidation,
    district: locationValidation,
    quarter: locationValidation,
    street: locationValidation,
    address: usedMyAddres
      ? yup.string()
      : yup.string().required(i18n.t(LangKeys.require_address_detail)),
    account: formSelectValidationRequiredSchema,
  });
};
