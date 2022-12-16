import React, { createContext, ReactElement } from 'react';
import { default as themeLight } from './finto-theme-light';
import { default as themeDark } from './finto-theme-dark';
import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

type Themes = 'light' | 'dark';

export const theme = {
  light: themeLight,
  dark: themeDark,
};

type ThemeValues = {
  selectedTheme: Themes;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeValues>({
  selectedTheme: colorScheme === 'dark' ? 'dark' : 'light',
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [selectedTheme, setSelectedTheme] = React.useState<Themes>(`${colorScheme === 'dark' ? 'dark' : 'light'}`);

  const toggleTheme = () => {
    const nextTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
