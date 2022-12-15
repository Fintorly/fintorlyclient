/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from 'yup';
import {NumberSchema, StringSchema} from 'yup';
import {isEmpty, isNil} from 'lodash';
import {LangKeys} from '~/Locale/LangKeys';

export const mixed = {
  default: (values) => ({
    key: LangKeys.common_yup_mixed_default,
    values,
  }),
  notType: (values) => ({
    key: LangKeys.common_yup_mixed_notType,
    values,
  }),
  required: (values) => ({
    key: LangKeys.common_yup_mixed_required,
    values,
  }),
  oneOf: (values) => ({
    key: LangKeys.common_yup_mixed_oneOf,
    values,
  }),
  notOneOf: (values) => ({
    key: LangKeys.common_yup_mixed_notOneOf,
    values,
  }),
};

export const string = {
  length: (values) => ({
    key: LangKeys.common_yup_string_length,
    values,
  }),
  min: (values) => ({
    key: LangKeys.common_yup_string_min,
    values,
  }),
  max: (values) => ({
    key: LangKeys.common_yup_string_max,
    values,
  }),
  matches: (values) => ({
    key: LangKeys.common_yup_string_matches,
    values,
  }),
  email: (values) => ({
    key: LangKeys.common_yup_string_email,
    values,
  }),
  url: (values) => ({
    key: LangKeys.common_yup_string_url,
    values,
  }),
  trim: (values) => ({
    key: LangKeys.common_yup_string_trim,
    values,
  }),
  lowercase: (values) => ({
    key: LangKeys.common_yup_string_lowercase,
    values,
  }),
  uppercase: (values) => ({
    key: LangKeys.common_yup_string_uppercase,
    values,
  }),
};

export const number = {
  min: (values) => ({
    key: LangKeys.common_yup_number_min,
    values,
  }),
  max: (values) => ({
    key: LangKeys.common_yup_number_max,
    values,
  }),
  lessThan: (values) => ({
    key: LangKeys.common_yup_number_lessThan,
    values,
  }),
  moreThan: (values) => ({
    key: LangKeys.common_yup_number_moreThan,
    values,
  }),
  positive: (values) => ({
    key: LangKeys.common_yup_number_positive,
    values,
  }),
  negative: (values) => ({
    key: LangKeys.common_yup_number_negative,
    values,
  }),
  integer: (values) => ({
    key: LangKeys.common_yup_number_integer,
    values,
  }),
};

export const date = {
  min: (values) => ({
    key: LangKeys.common_yup_date_min,
    values,
  }),
  max: (values) => ({
    key: LangKeys.common_yup_date_max,
    values,
  }),
};

export const boolean = {
  isValue: (values) => ({
    key: LangKeys.common_yup_boolean_isValue,
    values,
  }),
};

export const object = {
  noUnknown: (values) => ({
    key: LangKeys.common_yup_object_noUnknown,
    values,
  }),
};

export const array = {
  min: (values) => ({
    key: LangKeys.common_yup_array_min,
    values,
  }),
  max: (values) => ({
    key: LangKeys.common_yup_array_max,
    values,
  }),
  length: (values) => ({
    key: LangKeys.common_yup_array_length,
    values,
  }),
};

const defaultMessages = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};

export const phoneValidationRegex =
  /(([\+]90?)|([0]?))([ ]?)((\([0-9]{3}\))|([0-9]{3}))([ ]?)([0-9]{3})(\s*[\-]?)([0-9]{2})(\s*[\-]?)([0-9]{2})/g;
export function turkishPhoneNumber() {
  return this.test({
    name: 'turkishPhoneNumber',
    message: LangKeys.common_yup_string_turkishPhoneNumber,
    test: (value) => {
      const reg = new RegExp(phoneValidationRegex);
      return value && reg.test(value);
    },
  });
}
yup.addMethod<StringSchema>(
  yup.string,
  'turkishPhoneNumber',
  turkishPhoneNumber,
);

export function clearEmpty(this: StringSchema, msg: string) {
  return this.transform((value) =>
    isEmpty(value) || isNil(value) ? undefined : value,
  );
}
yup.addMethod<StringSchema>(yup.string, 'clearEmpty', clearEmpty);

export function clearNaN(this: NumberSchema, msg: string) {
  return this.transform((value) => (isNaN(value) ? undefined : Number(value)));
}
yup.addMethod<NumberSchema>(yup.number, 'clearNaN', clearNaN);

function isValidTCKN() {
  return this.test({
    name: 'isValidTCKN',
    message: LangKeys.common_yup_string_tckn,
    test: (numberTCKN) => {
      if (!numberTCKN?.length || numberTCKN?.length < 11) {
        return false;
      }

      var totalTcknNumbers = 0;
      for (var i = 0; i < 10; i++) {
        totalTcknNumbers += Number(numberTCKN.substring(i, 1 + i));
      }
      var isEqualLastDigit =
        totalTcknNumbers % 10 === Number(numberTCKN.substring(10, 11));

      var totalDoubleDigit = 0;
      var totalSingleDigit = 0;
      for (var i = 0; i < 10; i += 2) {
        totalDoubleDigit += Number(numberTCKN.substring(i, 1 + i));
      }

      for (var i = 1; i < 9; i += 2) {
        totalSingleDigit += Number(numberTCKN.substring(i, 1 + i));
      }

      var isEqualNinthDigit =
        (totalDoubleDigit * 7 - totalSingleDigit) % 10 ===
        Number(numberTCKN.substring(9, 10));
      return isEqualLastDigit && isEqualNinthDigit;
    },
  });
}
yup.addMethod<StringSchema>(yup.string, 'isValidTCKN', isValidTCKN);

yup.setLocale(defaultMessages);

//INFO: yup içerisinde bulunan email kontrolu @gmail.c durumunda valid olarak algılıyor. https://github.com/jquense/yup/issues/507#issuecomment-518423526
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export function email() {
  return this.test({
    name: 'email',
    message: LangKeys.common_yup_string_email,
    test: (value) => {
      const reg = new RegExp(emailRegex);
      return value && reg.test(value);
    },
  });
}
yup.addMethod<StringSchema>(yup.string, 'email', email);
/*
• ,. gibi özel karakter içeremez.
•	Alfanumerik olmalıdır.
•	En az bir harf içermelidir.
•	Boşluk içermemelidir.
*/
export const onboardingUsernameRegex = /^(?=.*[A-Za-z])(?!=.*\d)[A-Za-z\d]+$/;

/*
• Boşluk içermemelidir.
• A’dan Z’ye kadar küçük veya büyük harf girişi yapılabilir. Nokta, virgül gibi karakterler girilemez.
• Rakam girişi yapılamaz.
*/
export const onboardingQuestionReplyRegex = /^(?=.*[A-Za-z])[A-Za-z]+$/;
/*
• Ardışık olmayan sayı kontrolü
• yup ile beraber .matches(/^((?!012|123|234|345|456|567|678|789).)*$/, 'message' ) seklinde kullanilirsa matches'in değiline düşer.
*/
export const checkNotConsecutiveThreeDigit =
  /^((?!012|123|234|345|456|567|678|789).)*$/;

export default yup;
