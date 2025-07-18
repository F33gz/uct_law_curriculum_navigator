import React, { useMemo } from 'react';
import SubjectCard from './SubjectCard';
import Icon from '../../../components/AppIcon';

const SemesterColumn = ({ 
  semester, 
  approvedSubjects, 
  isSubjectUnlocked, 
  onToggleSubjectApproval 
}) => {
  const completionPercentage = React.useMemo(() => {
    const approvedCount = semester.subjects.filter(subject => 
      approvedSubjects.includes(subject.id)
    ).length;
    return Math.round((approvedCount / semester.subjects.length) * 100);
  }, [semester.subjects, approvedSubjects]);

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
    <div className="flex-shrink-0 w-80 sm:w-96 bg-card border border-border rounded-xl p-4 shadow-card">
      {/* Semester Header */}
      <div className="sticky top-0 bg-card z-10 pb-4 border-b border-border mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={getStatusIcon()} 
                size={20} 
                className={getStatusColor()} 
              />
              <h3 className="text-lg font-heading font-bold text-foreground">
                {semester.name}
              </h3>
            </div>
            
            <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={14} />
                <span>{semester.subjects.length} materias</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="GraduationCap" size={14} />
                <span>{semester.totalCredits} créditos</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-heading font-bold text-primary">
              {completionPercentage}%
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              Completado
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subjects List - Vertical Stack */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide">
        {semester.subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={{
              ...subject,
              isApproved: approvedSubjects.includes(subject.id)
            }}
            isUnlocked={isSubjectUnlocked(subject)}
            onToggleApproval={onToggleSubjectApproval}
            isCompact={true}
          />
        ))}
      </div>

      {/* Semester Summary Footer */}
      <div className="mt-4 pt-4 border-t border-border bg-card">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <span className="font-caption text-muted-foreground">
              {semester.subjects.filter(s => approvedSubjects.includes(s.id)).length} / {semester.subjects.length} aprobadas
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-muted-foreground" />
            <span className="font-caption text-muted-foreground">
              {semester.subjects
                .filter(s => approvedSubjects.includes(s.id))
                .reduce((sum, s) => sum + s.credits, 0)} / {semester.totalCredits} créditos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterColumn;