import yup from '../../yup';
import {
  formInputPriceSchema,
  formSelectValidationRequiredSchema,
  formSelectValidationSchema,
} from '../common/common';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';

export const schemaCreateSalesAdvertise = (isAdvertiseUpdate: boolean) => {
  return yup.object({}).shape({
    title: yup
      .string()
      .min(3, i18n.t(LangKeys.validation_min_character, {number: 3}))
      .required(i18n.t(LangKeys.require_product_title)),
    city: formSelectValidationRequiredSchema,
    district: formSelectValidationRequiredSchema,
    brand: yup.string().optional(),
    account: formSelectValidationRequiredSchema,
    description: yup
      .string()
      .min(3, i18n.t(LangKeys.validation_min_character, {number: 3}))
      .required(i18n.t(LangKeys.require_description)),
    delivery: formSelectValidationRequiredSchema,
    advertisePeriod: isAdvertiseUpdate
      ? formSelectValidationSchema
      : formSelectValidationRequiredSchema,
    price: formInputPriceSchema(
      yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(false)
        .moreThan(0, i18n.t(LangKeys.required_greater_zero))
        .required(i18n.t(LangKeys.required_product_price)),
    ),
    priceUnit: formSelectValidationRequiredSchema,
    quantiyMax: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable(false)
      .moreThan(yup.ref('quantiyMin'), i18n.t(LangKeys.required_greater_than))
      .required(i18n.t(LangKeys.required_product_quantity)),
    quantiyMaxUnit: formSelectValidationRequiredSchema,
    quantiyMin: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable(false)
      .moreThan(0, i18n.t(LangKeys.required_greater_zero))
      .required(i18n.t(LangKeys.required_product_quantity)),
    quantiyMinUnit: formSelectValidationRequiredSchema,
  });
};

export const schemaCreatePurchaseAdvertise = (
  isAdvertiseUpdate: boolean,
  usedMyAddres?: boolean,
) => {
  const locationValidation = usedMyAddres
    ? formSelectValidationSchema
    : formSelectValidationRequiredSchema;

  return yup.object({}).shape({
    title: yup
      .string()
      .min(3, i18n.t(LangKeys.validation_min_character, {number: 3}))
      .required(i18n.t(LangKeys.require_product_title)),
    city: locationValidation,
    district: locationValidation,
    quarter: locationValidation,
    street: locationValidation,
    brand: yup.string().optional(),
    account: formSelectValidationRequiredSchema,
    description: yup
      .string()
      .min(3, i18n.t(LangKeys.validation_min_character, {number: 3}))
      .required(i18n.t(LangKeys.require_description)),
    address: usedMyAddres
      ? yup.string()
      : yup.string().required(i18n.t(LangKeys.require_address_detail)),
    advertisePeriod: isAdvertiseUpdate
      ? formSelectValidationSchema
      : formSelectValidationRequiredSchema,
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
      .required(i18n.t(LangKeys.required_product_quantity)),
    quantityUnit: formSelectValidationRequiredSchema,
  });
};
