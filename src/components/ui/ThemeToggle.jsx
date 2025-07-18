import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'system') {
      return 'Monitor';
    } else if (resolvedTheme === 'dark') {
      return 'Moon';
    } else {
      return 'Sun';
    }
  };

  const getThemeLabel = () => {
    if (theme === 'system') {
      return 'Sistema';
    } else if (resolvedTheme === 'dark') {
      return 'Oscuro';
    } else {
      return 'Claro';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9"
        title={`Cambiar tema (${getThemeLabel()})`}
      >
        <Icon name={getThemeIcon()} size={16} />
      </Button>
      <span className="hidden sm:inline-block text-xs font-caption text-muted-foreground">
        {getThemeLabel()}
      </span>
    </div>
  );
};

export default ThemeToggle;