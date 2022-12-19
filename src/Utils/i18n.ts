import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import En from '../Locale/En';
import Tr from '../Locale/Tr';
import Nl from '../Locale/Nl';
import moment from 'moment';
import 'moment/locale/tr';
import 'moment/locale/en-gb';
import 'moment/locale/nl';
import CommonDataProvider from '../Providers/CommonDataProvider';
import { Language } from './Enum';

export enum InterpolationType {
  DECIMAL_STRING = 'DECIMAL_STRING',
  PARSE_LOCALE_NUMBER = 'PARSE_LOCALE_NUMBER',
}

const cachedLanguage = CommonDataProvider.Shared.data.language;
const language = cachedLanguage ? cachedLanguage : Language.tr;

const languageUpdated = (_language: Language) => {
  CommonDataProvider.Shared.data.language = _language;
  moment.locale(_language);
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      resources: {
        en: {
          translation: En,
        },
        tr: {
          translation: Tr,
        },
        nl: {
          translation: Nl,
        }
      },
      compatibilityJSON: 'v3',
      debug:true,
      lng: language,
      fallbackLng: Language.tr,
      interpolation: {
        escapeValue: false,
        format: function (value, format, lng) {
          if (format === InterpolationType.DECIMAL_STRING) {
            return Intl.NumberFormat(lng, {
              maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
              minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
            }).format(value);
          } else if (format === InterpolationType.PARSE_LOCALE_NUMBER) {
            const thousandSeparator = Intl.NumberFormat(lng)
              .format(11111)
              .replace(/\d/gu, '');
            const decimalSeparator = Intl.NumberFormat(lng)
              .format(1.1)
              .replace(/\d/gu, '');
            return parseFloat(
              value
                .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
                .replace(new RegExp('\\' + decimalSeparator), '.'),
            );
          }
          return value;
        },
      },
    },
    () => {
      languageUpdated(language);
    },
  );

export const currentLanguage = (): Language => {
  return i18n.language as Language;
};

export const interpolate = (str: string, data: object) => {
  return i18n.services.interpolator.interpolate(
    str,
    data,
    currentLanguage(),
    {},
  );
};

export const changeLanguage = (_language: Language) => {
  i18n.changeLanguage(_language).then(() => {
    languageUpdated(_language);
  });
};

export const decimalString = (value: number) => {
  return i18n.t(`{{value,${InterpolationType.DECIMAL_STRING}}}`, {
    value,
  });
};
export const parseLocaleNumber = (value: string): number => {
  return value
    ? Number(
      i18n.t(`{{value,${InterpolationType.PARSE_LOCALE_NUMBER}}}`, {
        value,
      }),
    )
    : 0;
};
