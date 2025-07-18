import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ stats, isExpanded, onToggle }) => {
  // Calculate weighted progress (considering both subjects and credits)
  const weightedProgress = Math.round((stats.overallProgress + stats.creditProgress) / 2);
  
  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div 
        onClick={onToggle}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground">
              Progreso Académico
            </h3>
            <p className="text-xs font-caption text-muted-foreground">
              {stats.approvedSubjects}/{stats.totalSubjects} materias • {stats.creditsEarned}/{stats.totalCredits} créditos
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-lg font-heading font-bold text-primary">
              {weightedProgress}%
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              Progreso Real
            </p>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border">
          {/* Dual Progress Rings */}
          <div className="flex items-center justify-center space-x-8 py-4">
            {/* Subject Progress Ring */}
            <div className="text-center">
              <div className="relative w-20 h-20 mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - stats.overallProgress / 100)}`}
                    className="text-primary progress-ring"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-heading font-bold text-foreground">
                    {stats.overallProgress}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-caption text-muted-foreground">
                Materias
              </p>
            </div>
            
            {/* Credit Progress Ring */}
            <div className="text-center">
              <div className="relative w-20 h-20 mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - stats.creditProgress / 100)}`}
                    className="text-accent progress-ring"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-heading font-bold text-foreground">
                    {stats.creditProgress}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-caption text-muted-foreground">
                Créditos
              </p>
            </div>
          </div>
          
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Icon name="CheckCircle2" size={20} className="text-success" />
              </div>
              <p className="text-lg font-heading font-bold text-success">
                {stats.approvedSubjects}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Materias Aprobadas
              </p>
            </div>
            
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Icon name="BookOpen" size={20} className="text-accent" />
              </div>
              <p className="text-lg font-heading font-bold text-accent">
                {stats.creditsEarned}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Créditos Obtenidos
              </p>
            </div>
            
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Clock" size={20} className="text-warning" />
              </div>
              <p className="text-lg font-heading font-bold text-warning">
                {stats.remainingSubjects}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Materias Restantes
              </p>
            </div>
            
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Target" size={20} className="text-primary" />
              </div>
              <p className="text-lg font-heading font-bold text-primary">
                {stats.remainingCredits}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Créditos Restantes
              </p>
            </div>
          </div>
          
          {/* Semester Progress */}
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-semibold text-foreground">
              Progreso por Semestre
            </h4>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {stats.semesterProgress.map((semester, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-body text-muted-foreground">
                    {semester.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${semester.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-caption text-muted-foreground w-8">
                      {semester.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressStats;