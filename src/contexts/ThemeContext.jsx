import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [systemTheme, setSystemTheme] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Update resolved theme when theme or systemTheme changes
  useEffect(() => {
    const newResolvedTheme = theme === 'system' ? systemTheme : theme;
    setResolvedTheme(newResolvedTheme);
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newResolvedTheme);
    
    // Update data attribute for easier CSS targeting
    document.documentElement.setAttribute('data-theme', newResolvedTheme);
  }, [theme, systemTheme]);

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setThemeMode('light');
    } else if (theme === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('system');
    }
  };

  const value = {
    theme,
    systemTheme,
    resolvedTheme,
    setTheme: setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};