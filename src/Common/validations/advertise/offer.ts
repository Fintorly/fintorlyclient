import yup from '../../yup';
import {
  formInputPriceSchema,
  formSelectValidationRequiredSchema,
  formSelectValidationSchema,
} from '../common/common';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';

export const schemaPurchaseGiveOffer = (
  minAmount: number,
  maxAmount: number,
  usedMyAddres?: boolean,
) => {
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
    description: yup.string().required(i18n.t(LangKeys.require_description)),
    account: formSelectValidationRequiredSchema,
    price: formInputPriceSchema(
      yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(false)
        .moreThan(0, i18n.t(LangKeys.required_greater_zero))
        .required(i18n.t(LangKeys.required_product_price)),
    ),
    priceUnit: formSelectValidationRequiredSchema,
    quantity: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable(false)
      .moreThan(0, i18n.t(LangKeys.required_greater_zero))
      .test('quantity', i18n.t(LangKeys.validation_min_max_quantity), value => {
        return value! <= minAmount && value! >= maxAmount;
      })
      .required(i18n.t(LangKeys.required_product_quantity)),
    quantityUnit: formSelectValidationRequiredSchema,
  });
};

export const schemaSaleGiveOffer = (amount: number) => {
  return yup.object({}).shape({
    city: formSelectValidationRequiredSchema,
    district: formSelectValidationRequiredSchema,
    description: yup.string().required(i18n.t(LangKeys.require_description)),
    price: formInputPriceSchema(
      yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(false)
        .moreThan(0, i18n.t(LangKeys.required_greater_zero))
        .required(i18n.t(LangKeys.required_product_price)),
    ),
    priceUnit: formSelectValidationRequiredSchema,
    account: formSelectValidationRequiredSchema,
    quantity: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable(false)
      .moreThan(0, i18n.t(LangKeys.required_greater_zero))
      .test('quantity', i18n.t(LangKeys.validation_max_quantity), value => {
        return value! <= amount;
      })
      .required(i18n.t(LangKeys.required_product_quantity)),
    delivery: formSelectValidationRequiredSchema,
    quantityUnit: formSelectValidationRequiredSchema,
  });
};
