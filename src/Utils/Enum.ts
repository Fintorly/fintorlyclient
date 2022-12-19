export enum Language {
  tr = 'tr',
  en = 'en',
  nl = 'nl',
}

export enum LanguageCode {
  tr = 'tr-TR',
  en = 'en-US',
  nl = 'nl-NL',
}

export const LanguageCodes: Record<Language, string> = {
  [Language.en]: LanguageCode.en,
  [Language.tr]: LanguageCode.tr,
  [Language.nl]: LanguageCode.nl,
};
