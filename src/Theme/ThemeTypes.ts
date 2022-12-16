import BaseStyle from '../Styles/BaseStyle';
export { ThemeKeys } from './ThemeKeys';
import { default as mapping } from './finto-mapping.json';

export type ThemeType = {
  mapping: typeof mapping;
  spacing: typeof BaseStyle.spacing;
  fonts: typeof BaseStyle.fonts;
  eva: Record<string, any>;
};
