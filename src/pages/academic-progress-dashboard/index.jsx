import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../../components/ui/Header';
import SemesterColumn from './components/SemesterColumn';
import ProgressStats from './components/ProgressStats';
import ExamenGradoCard from './components/ExamenGradoCard';
import FloatingActionMenu from './components/FloatingActionMenu';
import Icon from '../../components/AppIcon';

const AcademicProgressDashboard = () => {
  const [approvedSubjects, setApprovedSubjects] = useState([]);
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  // UCT Law Curriculum Data - Official Plan de Estudios
  const curriculumData = [
    {
      id: 1,
      name: "Semestre I",
      totalCredits: 21,
      subjects: [
        { id: "DER01102", name: "Introducción a la Abogacía", code: "DER01102", credits: 4, hours: 4, prerequisites: [] },
        { id: "DER01103", name: "Bases del Derecho Civil", code: "DER01103", credits: 5, hours: 5, prerequisites: [] },
        { id: "DER01105", name: "Filosofía", code: "DER01105", credits: 3, hours: 3, prerequisites: [] },
        { id: "DER01104", name: "Teoría General del Derecho", code: "DER01104", credits: 5, hours: 5, prerequisites: [] },
        { id: "DER01106", name: "Fuentes, Interpretación y Argumentación", code: "DER01106", credits: 4, hours: 4, prerequisites: [] }
      ]
    },
    {
      id: 2,
      name: "Semestre II",
      totalCredits: 23,
      subjects: [
        { id: "DER01107", name: "Derecho Romano I", code: "DER01107", credits: 5, hours: 5, prerequisites: ["DER01102"] },
        { id: "DER01108", name: "Derecho Procesal I", code: "DER01108", credits: 5, hours: 5, prerequisites: ["DER01103"] },
        { id: "DER01111", name: "Investigación Jurídica", code: "DER01111", credits: 3, hours: 3, prerequisites: ["DER01105"] },
        { id: "DER01110", name: "Historia del Derecho", code: "DER01110", credits: 5, hours: 5, prerequisites: ["DER01104"] },
        { id: "DER01109", name: "Derecho Constitucional I", code: "DER01109", credits: 5, hours: 5, prerequisites: ["DER01106"] }
      ]
    },
    {
      id: 3,
      name: "Semestre III",
      totalCredits: 27,
      subjects: [
        { id: "DER01112", name: "Derecho Civil I", code: "DER01112", credits: 5, hours: 5, prerequisites: ["DER01107"] },
        { id: "DER01115", name: "Derecho Procesal II", code: "DER01115", credits: 5, hours: 5, prerequisites: ["DER01108"] },
        { id: "DER01116", name: "Derecho Penal I", code: "DER01116", credits: 5, hours: 5, prerequisites: [] },
        { id: "DER01113", name: "Derecho Constitucional II", code: "DER01113", credits: 5, hours: 5, prerequisites: ["DER01109"] },
        { id: "DER01114", name: "Economía y Derecho", code: "DER01114", credits: 4, hours: 4, prerequisites: [] },
        { id: "ELECT01", name: "Electivo diversidad I", code: "ELECT01", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 4,
      name: "Semestre IV",
      totalCredits: 25,
      subjects: [
        { id: "DER01117", name: "Derecho Civil II", code: "DER01117", credits: 5, hours: 5, prerequisites: ["DER01112"] },
        { id: "DER01118", name: "Derecho Procesal III", code: "DER01118", credits: 5, hours: 5, prerequisites: ["DER01115"] },
        { id: "DER01120", name: "Derecho Penal II", code: "DER01120", credits: 5, hours: 5, prerequisites: ["DER01116"] },
        { id: "DER01121", name: "Derecho Comercial I", code: "DER01121", credits: 4, hours: 4, prerequisites: ["DER01113"] },
        { id: "DERE1150", name: "Evaluación de Ciclo Inicial", code: "DERE1150", credits: 1, hours: 2, prerequisites: [] },
        { id: "ILC01", name: "ILC o ILTE", code: "ILC01", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 5,
      name: "Semestre V",
      totalCredits: 24,
      subjects: [
        { id: "DER01122", name: "Derecho Civil III", code: "DER01122", credits: 5, hours: 5, prerequisites: ["DER01117"] },
        { id: "DER01123", name: "Derecho Procesal IV", code: "DER01123", credits: 5, hours: 5, prerequisites: ["DER01118"] },
        { id: "DER01125", name: "Derecho Penal III", code: "DER01125", credits: 5, hours: 5, prerequisites: ["DER01120"] },
        { id: "DER01124", name: "Derecho Administrativo I", code: "DER01124", credits: 5, hours: 5, prerequisites: ["DER01121"] },
        { id: "DER01126", name: "Derecho Comercial II", code: "DER01132", credits: 4, hours: 4, prerequisites: ["DER01110"] },
        { id: "DER01127", name: "Derecho Internacional Público", code: "DER01127", credits: 4, hours: 4, prerequisites: [] }
      ]
    },
    {
      id: 6,
      name: "Semestre VI",
      totalCredits: 26,
      subjects: [
        { id: "DER01128", name: "Derecho Civil IV", code: "DER01128", credits: 5, hours: 5, prerequisites: ["DER01122"] },
        { id: "DER01129", name: "Derecho Civil V", code: "DER01129", credits: 5, hours: 5, prerequisites: ["DER01123"] },
        { id: "DER01130", name: "Derecho Procesal Penal", code: "DER01130", credits: 5, hours: 5, prerequisites: ["DER01125"] },
        { id: "DER01131", name: "Derecho Administrativo II", code: "DER01131", credits: 4, hours: 4, prerequisites: ["DER01124"] },
        { id: "DER01132", name: "Derecho Comercial III", code: "DER01132", credits: 4, hours: 4, prerequisites: [] },
        { id: "DER01133", name: "Derecho Tributario I", code: "DER01133", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 7,
      name: "Semestre VII",
      totalCredits: 26,
      subjects: [
        { id: "DER01134", name: "Derecho Civil VI", code: "DER01134", credits: 5, hours: 5, prerequisites: ["DER01128"] },
        { id: "DER01135", name: "Resolución Colaborativa de Conflictos", code: "DER01135", credits: 4, hours: 4, prerequisites: ["DER01129"] },
        { id: "DER01136", name: "Derecho Laboral I", code: "DER01136", credits: 5, hours: 5, prerequisites: ["DER01130"] },
        { id: "DER01138", name: "Filosofía del Derecho", code: "DER01138", credits: 3, hours: 3, prerequisites: ["DER01131"] },
        { id: "DER01137", name: "Derecho Tributario II", code: "DER01137", credits: 3, hours: 3, prerequisites: ["DER01133"] },
        { id: "ELECT02", name: "Electivo diversidad II", code: "ELECT02", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 8,
      name: "Semestre VIII",
      totalCredits: 28,
      subjects: [
        { id: "DER01139", name: "Derecho Civil VII", code: "DER01139", credits: 5, hours: 5, prerequisites: ["DER01134"] },
        { id: "DER01140", name: "Derechos Procesal de Familia", code: "DER01140", credits: 4, hours: 4, prerequisites: ["DER01135"] },
        { id: "DER01144", name: "Negociación, Mediación y Arbitraje", code: "DER01144", credits: 4, hours: 4, prerequisites: [] },
        { id: "DER01142", name: "Derecho Laboral II", code: "DER01142", credits: 5, hours: 5, prerequisites: ["DER01136"] },
        { id: "DER01141", name: "Seminario de Investigación", code: "DER01141", credits: 3, hours: 3, prerequisites: ["DER01138"] },
        { id: "DERE1151", name: "Evaluación de Ciclo Intermedio", code: "DERE1151", credits: 1, hours: 2, prerequisites: [] },
        { id: "ELECT03", name: "Electivo diversidad III", code: "ELECT03", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 9,
      name: "Semestre IX",
      totalCredits: 28,
      subjects: [
        { id: "DER01145", name: "Clínica de Litigación", code: "DER01145", credits: 12, hours: 16, prerequisites: ["DER01139", "DER01140"] },
        { id: "DER01146", name: "Clínica Institucional", code: "DER01146", credits: 5, hours: 7, prerequisites: ["DER01144"] },
        { id: "DER01147", name: "Derecho de los Pueblos Indígenas", code: "DER01147", credits: 4, hours: 4, prerequisites: ["DER01142"] },
        { id: "DER01148", name: "Derecho Ambiental", code: "DER01148", credits: 4, hours: 4, prerequisites: ["DER01141"] },
        { id: "FTD1410", name: "Ética Profesional", code: "FTD1410", credits: 3, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 10,
      name: "Semestre X",
      totalCredits: 30,
      subjects: [
        { id: "DER01149", name: "Examen de Grado", code: "DER01149", credits: 12, hours: 24, prerequisites: ["DER01145"] },
        { id: "DER02901", name: "Electivo I", code: "DER02901", credits: 6, hours: 8, prerequisites: [] },
        { id: "DER02902", name: "Electivo II", code: "DER02902", credits: 6, hours: 8, prerequisites: [] },
        { id: "DER02903", name: "Electivo III", code: "DER02903", credits: 6, hours: 8, prerequisites: [] }
      ]
    }
  ];

  // Load approved subjects from localStorage on component mount
  useEffect(() => {
    const savedApproved = localStorage.getItem('approvedSubjects');
    
    if (savedApproved) {
      setApprovedSubjects(JSON.parse(savedApproved));
    }
  }, []);

  // Save to localStorage whenever approved subjects change
  useEffect(() => {
    localStorage.setItem('approvedSubjects', JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  // Check if a subject is unlocked based on prerequisites
  const isSubjectUnlocked = useCallback((subject) => {
    if (!subject.prerequisites || subject.prerequisites.length === 0) {
      return true;
    }
    
    return subject.prerequisites.every(prereq => 
      approvedSubjects.includes(prereq)
    );
  }, [approvedSubjects]);

  // Check if Examen de Grado is unlocked (prerequisite: Clínica de Litigación completed)
  const isExamenUnlocked = useCallback(() => {
    return approvedSubjects.includes("DER01145"); // Clínica de Litigación
  }, [approvedSubjects]);

  // Check if Examen de Grado is approved
  const isExamenApproved = useCallback(() => {
    return approvedSubjects.includes("DER01149"); // Examen de Grado
  }, [approvedSubjects]);

  // Toggle subject approval status
  const toggleSubjectApproval = (subjectId) => {
    setApprovedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  // Toggle Examen de Grado approval
  const toggleExamenApproval = () => {
    if (isExamenUnlocked()) {
      toggleSubjectApproval("DER01149"); // Examen de Grado subject ID
    }
  };

  // Calculate overall statistics
  const calculateStats = () => {
    const totalSubjects = curriculumData.reduce((sum, semester) => 
      sum + semester.subjects.length, 0
    );
    const totalCredits = curriculumData.reduce((sum, semester) => 
      sum + semester.totalCredits, 0
    );
    
    const approvedCount = approvedSubjects.length;
    const creditsEarned = curriculumData
      .flatMap(semester => semester.subjects)
      .filter(subject => approvedSubjects.includes(subject.id))
      .reduce((sum, subject) => sum + subject.credits, 0);
    
    // Enhanced progress calculation
    const overallProgress = totalSubjects > 0 ? Math.round((approvedCount / totalSubjects) * 100) : 0;
    const creditProgress = totalCredits > 0 ? Math.round((creditsEarned / totalCredits) * 100) : 0;
    
    const semesterProgress = curriculumData.map(semester => {
      const approvedCount = semester.subjects.filter(subject => 
        approvedSubjects.includes(subject.id)
      ).length;
      return {
        name: semester.name,
        progress: Math.round((approvedCount / semester.subjects.length) * 100)
      };
    });

    return {
      overallProgress,
      creditProgress,
      approvedSubjects: approvedCount,
      totalSubjects,
      creditsEarned,
      totalCredits,
      remainingSubjects: totalSubjects - approvedCount,
      remainingCredits: totalCredits - creditsEarned,
      semesterProgress
    };
  };

  // Reset all progress
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      setApprovedSubjects([]);
      localStorage.removeItem('approvedSubjects');
    }
  };

  // Export progress
  const handleExport = () => {
    const stats = calculateStats();
    const exportData = {
      timestamp: new Date().toISOString(),
      student: "Estudiante UCT",
      career: "Derecho",
      progress: stats,
      approvedSubjects: approvedSubjects,
      examenCompleted: isExamenApproved(),
      semesterDetails: curriculumData.map(semester => ({
        name: semester.name,
        completion: Math.round((semester.subjects.filter(subject => 
          approvedSubjects.includes(subject.id)
        ).length / semester.subjects.length) * 100),
        approvedSubjects: semester.subjects.filter(subject => 
          approvedSubjects.includes(subject.id)
        ).map(subject => ({
          code: subject.code,
          name: subject.name,
          credits: subject.credits
        }))
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `progreso-academico-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-full">
        {/* Enhanced Progress Stats */}
        <div className="mb-6 max-w-7xl mx-auto">
          <ProgressStats 
            stats={stats}
            isExpanded={isStatsExpanded}
            onToggle={() => setIsStatsExpanded(!isStatsExpanded)}
          />
        </div>

        {/* Continuous Horizontal Scroll Layout */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Plan de Estudios - Vista Completa
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={20} className="text-muted-foreground" />
                <span className="text-sm font-caption text-muted-foreground">
                  {curriculumData.length} semestres
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="GraduationCap" size={20} className="text-muted-foreground" />
                <span className="text-sm font-caption text-muted-foreground">
                  {stats.totalSubjects} materias
                </span>
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth'
              }}
            >
              {curriculumData.map((semester) => (
                <div 
                  key={semester.id} 
                  className="flex-shrink-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <SemesterColumn
                    semester={semester}
                    approvedSubjects={approvedSubjects}
                    isSubjectUnlocked={isSubjectUnlocked}
                    onToggleSubjectApproval={toggleSubjectApproval}
                  />
                </div>
              ))}
            </div>
            
            {/* Scroll Hint */}
            <div className="flex items-center justify-center mt-4 text-sm font-caption text-muted-foreground">
              <Icon name="MousePointer" size={16} className="mr-2" />
              <span>Desliza horizontalmente para navegar entre semestres</span>
            </div>
          </div>
        </div>

        {/* Examen de Grado */}
        <div className="max-w-7xl mx-auto">
          <ExamenGradoCard
            isUnlocked={isExamenUnlocked()}
            isApproved={isExamenApproved()}
            onToggleApproval={toggleExamenApproval}
          />
        </div>

        {/* Floating Action Menu */}
        <FloatingActionMenu
          onReset={handleReset}
          onExport={handleExport}
        />
      </main>
    </div>
  );
};

export default AcademicProgressDashboard;