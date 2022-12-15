export enum Language {
  tr = 'tr',
  en = 'en',
}

export enum LanguageCode {
  tr = 'tr-TR',
  en = 'en-US',
}

export const LanguageCodes: Record<Language, string> = {
  [Language.en]: LanguageCode.en,
  [Language.tr]: LanguageCode.tr,
};
