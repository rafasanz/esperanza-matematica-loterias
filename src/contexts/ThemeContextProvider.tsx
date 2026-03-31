import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { type Theme, ThemeContext } from './ThemeContext';

const LOCAL_STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return 'light';
}

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTheme);
    document.body.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ currentTheme, toggleTheme }), [currentTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
