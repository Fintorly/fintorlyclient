import BaseStyle from '../Styles/BaseStyle';
import { navigationStyles } from '../Styles/CustomStyles/NavigationStyles';
import { componentStyles } from '../Styles/CustomStyles/ComponentStyles';
import { layoutStyles } from '../Styles/CustomStyles/LayoutStyles';
import React, { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';
import { useTheme } from '@ui-kitten/components';
import { ThemeType } from './ThemeTypes';
import { default as mapping } from './finto-mapping.json';

export const themeMapping = mapping;

const getThemeVariables = (evaTheme: Record<string, any>): ThemeType => {
  return {
    mapping: themeMapping,
    spacing: BaseStyle.spacing,
    fonts: BaseStyle.fonts,
    eva: evaTheme,
  };
};

const getCustomStyles = (evaTheme: Record<string, any>) => {
  const themeVariables = getThemeVariables(evaTheme);
  return {
    componentStyles: componentStyles(themeVariables, evaTheme),
    navigationStyles: navigationStyles(themeVariables, evaTheme),
    layoutStyles: layoutStyles(themeVariables, evaTheme),
    themeVariables
  };
};

export function useStyle() {
  const { selectedTheme } = React.useContext(ThemeContext);
  const evaTheme = useTheme();
  const [activeTheme, setActiveTheme] = useState(getCustomStyles(evaTheme));
  useEffect(() => {
    setActiveTheme(getCustomStyles(evaTheme));
  }, [selectedTheme, evaTheme]);

  return activeTheme;
}
