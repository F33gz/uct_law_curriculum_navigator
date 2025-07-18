import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-100 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              UCT Law Navigator
            </h1>
            <p className="text-xs font-caption text-muted-foreground">
              Navegador Curricular
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/academic-progress-dashboard"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-body font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Icon name="BarChart3" size={16} />
            <span>Panel de Progreso</span>
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
          >
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-4 space-y-2">
            <a
              href="/academic-progress-dashboard"
              className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon name="BarChart3" size={18} />
              <span>Panel de Progreso Académico</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;