import React, {createContext, ReactElement} from 'react';
import {default as themeLight} from './zgtp-theme-light';
import {default as themeDark} from './zgtp-theme-dark';

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
  selectedTheme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: {children: ReactElement}) => {
  const [selectedTheme, setSelectedTheme] = React.useState<Themes>('light');

  const toggleTheme = () => {
    const nextTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{selectedTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
