enum FONT_WEIGHT {
  Book = 'Book',
  Black = 'Black',
  Bold = 'Bold',
  Light = 'Light',
  Medium = 'Medium',
  Thin = 'Thin',
  Ultra = 'Ultra',
  XLight = 'XLight',
}

const font = (weight: FONT_WEIGHT) => {
  const defaultFontName = 'GothamNarrow';
  return [defaultFontName, weight].join('-');
};

export default {
  black: font(FONT_WEIGHT.Black),
  bold: font(FONT_WEIGHT.Bold),
  book: font(FONT_WEIGHT.Book),
  light: font(FONT_WEIGHT.Light),
  medium: font(FONT_WEIGHT.Medium),
  thin: font(FONT_WEIGHT.Thin),
  ultra: font(FONT_WEIGHT.Ultra),
  xLight: font(FONT_WEIGHT.XLight),
};
