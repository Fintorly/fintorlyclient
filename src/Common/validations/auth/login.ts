import yup from '../../yup';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {MIN_LENGTH} from '~/Common/constants/validations';

export const schemaLoginWithPassword = yup.object({}).shape({
  customerIdentifier: yup
    .string()
    .required(i18n.t(LangKeys.require_tcknOrCustomerNumber)),
  password: yup.string().required(i18n.t(LangKeys.require_password)),
  captchaShown: yup.boolean(),
  captcha: yup.string().when('captchaShown', {
    is: (value: any) => !!value,
    then: yup.string().required(i18n.t(LangKeys.require_captcha)),
  }),
});

export const schemaLoginWithPasswordCorporate = yup.object({}).shape({
  customerNumber: yup
    .string()
    .required(i18n.t(LangKeys.require_customerNumber)),
  passwordCoparate: yup.string().required(i18n.t(LangKeys.require_password)),
  userCustomerNumber: yup
    .string()
    .required(i18n.t(LangKeys.require_userCustomerNumber)),
  captchaShown: yup.boolean(),
  captcha: yup.string().when('captchaShown', {
    is: (value: any) => !!value,
    then: yup.string().required(i18n.t(LangKeys.require_captcha)),
  }),
});

export const schemaRememberedLoginWithPassword = yup.object({}).shape({
  password: yup.string().required(i18n.t(LangKeys.require_password)),
  captchaShown: yup.boolean(),
  captcha: yup.string().when('captchaShown', {
    is: (value: any) => !!value,
    then: yup.string().required(i18n.t(LangKeys.require_captcha)),
  }),
});

export const schemaRememberedCorporateLoginWithPassword = yup.object({}).shape({
  password: yup.string().required(i18n.t(LangKeys.require_password)),
  userCustomerNumber: yup
    .string()
    .required(i18n.t(LangKeys.require_userCustomerNumber)),
  captchaShown: yup.boolean(),
  captcha: yup.string().when('captchaShown', {
    is: (value: any) => !!value,
    then: yup.string().required(i18n.t(LangKeys.require_captcha)),
  }),
});

export const schemaOtp = yup.object({}).shape({
  otp: yup
    .string()
    .required(i18n.t(LangKeys.requite_otp))
    .min(MIN_LENGTH.SMS_OTP),
});
