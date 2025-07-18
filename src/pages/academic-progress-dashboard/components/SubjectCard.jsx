import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectCard = ({ subject, onToggleApproval, isUnlocked, isCompact = false }) => {
  const getStatusConfig = () => {
    if (subject.isApproved) {
      return {
        bgColor: 'bg-success/10 border-success/30',
        textColor: 'text-success',
        icon: 'CheckCircle2',
        statusText: 'Aprobada'
      };
    }
    
    if (isUnlocked) {
      return {
        bgColor: 'bg-accent/10 border-accent/30 hover:bg-accent/20',
        textColor: 'text-accent',
        icon: 'Circle',
        statusText: 'Disponible'
      };
    }
    
    return {
      bgColor: 'bg-muted border-muted-foreground/20',
      textColor: 'text-muted-foreground',
      icon: 'Lock',
      statusText: 'Bloqueada'
    };
  };

  const config = getStatusConfig();

  return (
    <div
      onClick={isUnlocked ? () => onToggleApproval(subject.id) : undefined}
      className={`
        ${isCompact ? 'p-3' : 'p-4'} rounded-lg border transition-all duration-300 cascade-enter
        ${config.bgColor}
        ${isUnlocked ? 'cursor-pointer hover-lift' : 'cursor-not-allowed'}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={config.icon} 
              size={16} 
              className={config.textColor} 
            />
            <span className={`text-xs font-caption px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
              {config.statusText}
            </span>
          </div>
          
          <h4 className={`${isCompact ? 'text-sm' : 'text-sm'} font-heading font-semibold text-foreground mb-1 ${isCompact ? 'line-clamp-2' : 'truncate'}`}>
            {subject.name}
          </h4>
          
          <p className="text-xs font-caption text-muted-foreground mb-2">
            {subject.code}
          </p>
          
          <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={12} />
              <span>{subject.credits} créditos</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{subject.hours}h</span>
            </div>
          </div>
          
          {subject.prerequisites && subject.prerequisites.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs font-caption text-muted-foreground mb-1">
                Prerrequisitos:
              </p>
              <div className={`flex flex-wrap gap-1 ${isCompact ? 'max-h-16 overflow-y-auto' : ''}`}>
                {subject.prerequisites.map((prereq, index) => (
                  <span 
                    key={index}
                    className="text-xs font-caption px-2 py-1 bg-muted rounded text-muted-foreground"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;