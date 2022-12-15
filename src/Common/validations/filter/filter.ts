import yup from '../../yup';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {formSelectValidationSchema} from '../common/common';
export const schemaFilterRangeInput = yup.object({}).shape({
  max: yup
    .number()
    .nullable(false)
    .transform((value, orginalValue) => (orginalValue === '' ? null : value))
    .moreThan(yup.ref('min'), i18n.t(LangKeys.required_greater_than)),
  min: yup
    .number()
    .nullable(false)
    .transform((value, orginalValue) => (orginalValue === '' ? null : value))
    .moreThan(0, i18n.t(LangKeys.required_greater_zero)),
});

export const schemaFilterAmount = yup.object({}).shape({
  amount: yup
    .number()
    .nullable(false)
    .min(0)
    .required(i18n.t(LangKeys.required_product_quantity_amount)),
});

export const schemaFilterLocation = yup.object({}).shape({
  city: formSelectValidationSchema,
  district: formSelectValidationSchema,
});
