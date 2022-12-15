import yup from '../../yup';
import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {NumberSchema} from 'yup';

export const formSelectValidationSchema = yup.object({}).shape({
  label: yup.string(),
  value: yup.mixed(),
});

export const formSelectValidationRequiredSchema = yup
  .object({})
  .shape({
    label: yup.string(),
    value: yup.mixed(),
  })
  .test('required', i18n.t(LangKeys.require_field), (val) =>
    val?.label === undefined || val?.label === '' ? false : true,
  );

type ValidationType = {
  value: number;
  errorMessage?: string;
};

type NumberValidationType = {
  min?: ValidationType;
  max?: ValidationType;
  moreThan?: ValidationType;
  lessThan?: ValidationType;
  required?: Pick<ValidationType, 'errorMessage'>;
};

export const formInputPriceSchema = (
  schema: NumberSchema<number | undefined>,
) => {
  return yup.object({}).shape({
    textValue: yup.string(),
    value: schema,
  });
};
