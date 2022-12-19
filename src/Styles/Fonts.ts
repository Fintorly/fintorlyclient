enum FONT_WEIGHT {
  Book = 'Book',
  Black = 'Black',
  Bold = 'Bold',
  Light = 'Light',
  Medium = 'Medium',
  Thin = 'Thin',
  Ultra = 'Ultra',
  XLight = 'XLight',
  ExtraBold = 'ExtraBold',
  ExtraLight = 'ExtraLight',
  Regular = 'Regular',
  SemiBold = 'SemiBold',
}

const font = (weight: FONT_WEIGHT) => {
  const defaultFontName = 'Inter';
  return [defaultFontName, weight].join('-');
};

export default {
  black: font(FONT_WEIGHT.Black),
  bold: font(FONT_WEIGHT.Bold),
  extraBold: font(FONT_WEIGHT.ExtraBold),
  extraLight: font(FONT_WEIGHT.ExtraLight),
  light: font(FONT_WEIGHT.Light),
  medium: font(FONT_WEIGHT.Medium),
  regular: font(FONT_WEIGHT.Regular),
  semiBold: font(FONT_WEIGHT.SemiBold),
  thin: font(FONT_WEIGHT.Thin),
};
