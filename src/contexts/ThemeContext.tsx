import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { Themes } from '../Utils/Themes';

interface ThemeContextData {
  handleChangeTheme: () => void;
  themeName: string;
}

interface ThemeProviderProps {
  children: ReactNode;
  themeName: string;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({
  children,
  ...rest
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState(rest.themeName);
  const [theme, setTheme] = useState(Themes[themeName === "light" ? 0 : 1]);

  useEffect(() => {
    Cookies.set('themeName', String(themeName))
  }, [themeName])

  function handleChangeTheme() {
    if (theme === Themes[0]) {
      setTheme(Themes[1]);
      setThemeName("dark");
    } else {
      setTheme(Themes[0]);
      setThemeName("light");
    }
  }

  function setCSSVariables(theme: { [x: string]: string }) {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  }

  useEffect(() => {
    setCSSVariables(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{                
        handleChangeTheme,
        themeName,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}