import React from 'react';
import Icon from '../../../components/AppIcon';

const SemesterCard = ({ semester, isActive, onClick, completionPercentage, isScrollable = false }) => {
  const getStatusIcon = () => {
    if (completionPercentage === 100) return 'CheckCircle2';
    if (completionPercentage > 0) return 'Clock';
    return 'Circle';
  };

  const getStatusColor = () => {
    if (completionPercentage === 100) return 'text-success';
    if (completionPercentage > 0) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300 hover:scale-105 group
        ${isScrollable 
          ? 'min-w-[280px] sm:min-w-[320px] w-80' 
          : 'min-w-[280px] w-full'
        }
        h-32 p-4 rounded-xl
        ${isActive 
          ? 'bg-primary/10 border-2 border-primary shadow-lg' 
          : 'bg-card border border-border shadow-card hover:shadow-modal'
        }
        glass-card
      `}
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={getStatusIcon()} 
              size={20} 
              className={getStatusColor()} 
            />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {semester.name}
            </h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-body text-muted-foreground">
              {semester.subjects.length} materias
            </p>
            <p className="text-sm font-body text-muted-foreground">
              {semester.totalCredits} créditos
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-xs font-caption text-muted-foreground">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Eye" size={14} className="text-primary-foreground" />
          </div>
        )}
        
        {/* Scroll indicator for mobile */}
        {isScrollable && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterCard;