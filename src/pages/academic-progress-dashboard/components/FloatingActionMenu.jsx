import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const FloatingActionMenu = ({ onReset, onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  const handleExport = () => {
    onExport();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`
        absolute bottom-16 right-0 space-y-3 transition-all duration-300 transform
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-3">
            <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-modal">
              <span className="text-sm font-body text-foreground whitespace-nowrap">
                Exportar Progreso
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
              className="w-12 h-12 rounded-full shadow-modal bg-card hover:bg-accent hover:text-accent-foreground"
              iconName="Download"
              iconSize={20}
            >
              <span className="sr-only">Exportar progreso</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-modal">
              <span className="text-sm font-body text-foreground whitespace-nowrap">
                Reiniciar Progreso
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="w-12 h-12 rounded-full shadow-modal bg-card hover:bg-destructive hover:text-destructive-foreground"
              iconName="RotateCcw"
              iconSize={20}
            >
              <span className="sr-only">Reiniciar progreso</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main FAB */}
      <Button
        variant={isOpen ? "secondary" : "default"}
        size="icon"
        onClick={toggleMenu}
        className={`
          w-14 h-14 rounded-full shadow-modal transition-all duration-300 transform
          ${isOpen ? 'rotate-45 bg-secondary' : 'hover:scale-110'}
        `}
        iconName={isOpen ? "X" : "Settings"}
        iconSize={24}
      >
        <span className="sr-only">Abrir menú de acciones</span>
      </Button>
    </div>
  );
};

export default FloatingActionMenu;