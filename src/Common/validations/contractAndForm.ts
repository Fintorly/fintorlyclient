import yup from '../yup';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {formSelectValidationRequiredSchema} from './common/common';

export const schemaDocumentsForms = yup.object({}).shape({
  kvkk: yup.boolean().oneOf([true], i18n.t(LangKeys.required_choice)),
  lightingText: yup.boolean().oneOf([true], i18n.t(LangKeys.required_choice)),
  userAgreement: yup.boolean().oneOf([true], i18n.t(LangKeys.required_choice)),
});

export const schemaPaymentForms = yup.object({}).shape({
  distanceSalesAgreement: yup
    .boolean()
    .oneOf([true], i18n.t(LangKeys.required_choice)),
  preliminaryInformation: yup
    .boolean()
    .oneOf([true], i18n.t(LangKeys.required_choice)),
  account: formSelectValidationRequiredSchema,
});
