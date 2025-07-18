import React from 'react';
import Icon from '../../../components/AppIcon';

const ExamenGradoCard = ({ isUnlocked, onToggleApproval, isApproved }) => {
  const getStatusConfig = () => {
    if (isApproved) {
      return {
        bgColor: 'bg-success/10 border-success/30',
        textColor: 'text-success',
        icon: 'GraduationCap',
        statusText: 'Completado',
        description: '¡Felicitaciones! Has completado tu carrera de Derecho.'
      };
    }
    
    if (isUnlocked) {
      return {
        bgColor: 'bg-accent/10 border-accent/30 hover:bg-accent/20',
        textColor: 'text-accent',
        icon: 'GraduationCap',
        statusText: 'Disponible',
        description: 'Puedes rendir tu Examen de Grado. ¡Estás muy cerca!'
      };
    }
    
    return {
      bgColor: 'bg-muted border-muted-foreground/20',
      textColor: 'text-muted-foreground',
      icon: 'Lock',
      statusText: 'Bloqueado',
      description: 'Debes completar todos los semestres (1-9) para desbloquear.'
    };
  };

  const config = getStatusConfig();

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-1 h-px bg-border"></div>
        <Icon name="Star" size={16} className="text-warning" />
        <span className="text-sm font-caption text-muted-foreground">Requisito Final</span>
        <Icon name="Star" size={16} className="text-warning" />
        <div className="flex-1 h-px bg-border"></div>
      </div>
      
      <div
        onClick={isUnlocked ? onToggleApproval : undefined}
        className={`
          relative p-6 rounded-xl border-2 transition-all duration-300 cascade-enter
          ${config.bgColor}
          ${isUnlocked ? 'cursor-pointer hover-lift' : 'cursor-not-allowed'}
        `}
      >
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-10">
          <Icon name="GraduationCap" size={48} className={config.textColor} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.bgColor}`}>
              <Icon 
                name={config.icon} 
                size={24} 
                className={config.textColor} 
              />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                Examen de Grado
              </h3>
              <span className={`text-sm font-caption px-3 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
                {config.statusText}
              </span>
            </div>
          </div>
          
          <p className="text-sm font-body text-muted-foreground mb-4">
            {config.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>Requisito Final</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} />
                <span>Título Profesional</span>
              </div>
            </div>
            
            {isUnlocked && !isApproved && (
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="ArrowRight" size={16} />
                <span className="text-sm font-body">Rendir Examen</span>
              </div>
            )}
          </div>
          
          {!isUnlocked && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs font-caption text-muted-foreground mb-2">
                Prerrequisitos pendientes:
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={14} className="text-warning" />
                <span className="text-xs font-caption text-warning">
                  Completar semestres 1-9 (todas las materias)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamenGradoCard;