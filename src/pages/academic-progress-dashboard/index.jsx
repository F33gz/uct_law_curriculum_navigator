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
  const [isExamenApproved, setIsExamenApproved] = useState(false);
  const scrollContainerRef = useRef(null);

  // Mock curriculum data
  const curriculumData = [
    {
      id: 1,
      name: "Semestre 1",
      totalCredits: 30,
      subjects: [
        { id: "DER101", name: "Introducción al Derecho", code: "DER101", credits: 6, hours: 4, prerequisites: [] },
        { id: "DER102", name: "Historia del Derecho", code: "DER102", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER103", name: "Filosofía del Derecho", code: "DER103", credits: 5, hours: 3, prerequisites: [] },
        { id: "DER104", name: "Metodología de la Investigación", code: "DER104", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER105", name: "Comunicación Oral y Escrita", code: "DER105", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER106", name: "Inglés I", code: "DER106", credits: 3, hours: 2, prerequisites: [] },
        { id: "DER107", name: "Educación Física", code: "DER107", credits: 2, hours: 2, prerequisites: [] },
        { id: "DER108", name: "Formación Cristiana", code: "DER108", credits: 2, hours: 2, prerequisites: [] }
      ]
    },
    {
      id: 2,
      name: "Semestre 2", 
      totalCredits: 32,
      subjects: [
        { id: "DER201", name: "Derecho Romano", code: "DER201", credits: 6, hours: 4, prerequisites: ["DER101"] },
        { id: "DER202", name: "Teoría del Estado", code: "DER202", credits: 5, hours: 3, prerequisites: ["DER101"] },
        { id: "DER203", name: "Derecho Constitucional I", code: "DER203", credits: 6, hours: 4, prerequisites: ["DER101"] },
        { id: "DER204", name: "Economía Política", code: "DER204", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER205", name: "Sociología Jurídica", code: "DER205", credits: 4, hours: 3, prerequisites: ["DER103"] },
        { id: "DER206", name: "Inglés II", code: "DER206", credits: 3, hours: 2, prerequisites: ["DER106"] },
        { id: "DER207", name: "Lógica Jurídica", code: "DER207", credits: 4, hours: 3, prerequisites: ["DER103"] }
      ]
    },
    {
      id: 3,
      name: "Semestre 3",
      totalCredits: 34,
      subjects: [
        { id: "DER301", name: "Derecho Civil I", code: "DER301", credits: 8, hours: 5, prerequisites: ["DER201"] },
        { id: "DER302", name: "Derecho Constitucional II", code: "DER302", credits: 6, hours: 4, prerequisites: ["DER203"] },
        { id: "DER303", name: "Derecho Penal I", code: "DER303", credits: 6, hours: 4, prerequisites: ["DER101"] },
        { id: "DER304", name: "Derecho Administrativo I", code: "DER304", credits: 6, hours: 4, prerequisites: ["DER203"] },
        { id: "DER305", name: "Estadística Aplicada", code: "DER305", credits: 4, hours: 3, prerequisites: ["DER204"] },
        { id: "DER306", name: "Inglés III", code: "DER306", credits: 4, hours: 3, prerequisites: ["DER206"] }
      ]
    },
    {
      id: 4,
      name: "Semestre 4",
      totalCredits: 36,
      subjects: [
        { id: "DER401", name: "Derecho Civil II", code: "DER401", credits: 8, hours: 5, prerequisites: ["DER301"] },
        { id: "DER402", name: "Derecho Penal II", code: "DER402", credits: 6, hours: 4, prerequisites: ["DER303"] },
        { id: "DER403", name: "Derecho Administrativo II", code: "DER403", credits: 6, hours: 4, prerequisites: ["DER304"] },
        { id: "DER404", name: "Derecho Procesal Civil I", code: "DER404", credits: 6, hours: 4, prerequisites: ["DER301"] },
        { id: "DER405", name: "Derecho Comercial I", code: "DER405", credits: 6, hours: 4, prerequisites: ["DER301"] },
        { id: "DER406", name: "Ética Profesional", code: "DER406", credits: 4, hours: 3, prerequisites: ["DER103"] }
      ]
    },
    {
      id: 5,
      name: "Semestre 5",
      totalCredits: 38,
      subjects: [
        { id: "DER501", name: "Derecho Civil III", code: "DER501", credits: 8, hours: 5, prerequisites: ["DER401"] },
        { id: "DER502", name: "Derecho Penal III", code: "DER502", credits: 6, hours: 4, prerequisites: ["DER402"] },
        { id: "DER503", name: "Derecho Procesal Civil II", code: "DER503", credits: 6, hours: 4, prerequisites: ["DER404"] },
        { id: "DER504", name: "Derecho Comercial II", code: "DER504", credits: 6, hours: 4, prerequisites: ["DER405"] },
        { id: "DER505", name: "Derecho Laboral I", code: "DER505", credits: 6, hours: 4, prerequisites: ["DER301"] },
        { id: "DER506", name: "Derecho Internacional Público", code: "DER506", credits: 6, hours: 4, prerequisites: ["DER302"] }
      ]
    },
    {
      id: 6,
      name: "Semestre 6",
      totalCredits: 36,
      subjects: [
        { id: "DER601", name: "Derecho Civil IV", code: "DER601", credits: 8, hours: 5, prerequisites: ["DER501"] },
        { id: "DER602", name: "Derecho Procesal Penal I", code: "DER602", credits: 6, hours: 4, prerequisites: ["DER502"] },
        { id: "DER603", name: "Derecho Laboral II", code: "DER603", credits: 6, hours: 4, prerequisites: ["DER505"] },
        { id: "DER604", name: "Derecho Tributario I", code: "DER604", credits: 6, hours: 4, prerequisites: ["DER403"] },
        { id: "DER605", name: "Derecho de Familia", code: "DER605", credits: 6, hours: 4, prerequisites: ["DER501"] },
        { id: "DER606", name: "Medicina Legal", code: "DER606", credits: 4, hours: 3, prerequisites: ["DER502"] }
      ]
    },
    {
      id: 7,
      name: "Semestre 7",
      totalCredits: 34,
      subjects: [
        { id: "DER701", name: "Derecho Civil V", code: "DER701", credits: 8, hours: 5, prerequisites: ["DER601"] },
        { id: "DER702", name: "Derecho Procesal Penal II", code: "DER702", credits: 6, hours: 4, prerequisites: ["DER602"] },
        { id: "DER703", name: "Derecho Tributario II", code: "DER703", credits: 6, hours: 4, prerequisites: ["DER604"] },
        { id: "DER704", name: "Derecho Internacional Privado", code: "DER704", credits: 6, hours: 4, prerequisites: ["DER506"] },
        { id: "DER705", name: "Derecho Ambiental", code: "DER705", credits: 4, hours: 3, prerequisites: ["DER403"] },
        { id: "DER706", name: "Criminología", code: "DER706", credits: 4, hours: 3, prerequisites: ["DER502"] }
      ]
    },
    {
      id: 8,
      name: "Semestre 8",
      totalCredits: 32,
      subjects: [
        { id: "DER801", name: "Derecho Civil VI", code: "DER801", credits: 8, hours: 5, prerequisites: ["DER701"] },
        { id: "DER802", name: "Práctica Procesal Civil", code: "DER802", credits: 6, hours: 4, prerequisites: ["DER503"] },
        { id: "DER803", name: "Práctica Procesal Penal", code: "DER803", credits: 6, hours: 4, prerequisites: ["DER702"] },
        { id: "DER804", name: "Derecho de la Seguridad Social", code: "DER804", credits: 4, hours: 3, prerequisites: ["DER603"] },
        { id: "DER805", name: "Derecho Minero", code: "DER805", credits: 4, hours: 3, prerequisites: ["DER403"] },
        { id: "DER806", name: "Taller de Tesis I", code: "DER806", credits: 4, hours: 3, prerequisites: ["DER104"] }
      ]
    },
    {
      id: 9,
      name: "Semestre 9",
      totalCredits: 30,
      subjects: [
        { id: "DER901", name: "Práctica Profesional", code: "DER901", credits: 12, hours: 8, prerequisites: ["DER801", "DER802", "DER803"] },
        { id: "DER902", name: "Taller de Tesis II", code: "DER902", credits: 6, hours: 4, prerequisites: ["DER806"] },
        { id: "DER903", name: "Derecho Procesal Constitucional", code: "DER903", credits: 4, hours: 3, prerequisites: ["DER302"] },
        { id: "DER904", name: "Electivo de Especialización I", code: "DER904", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER905", name: "Electivo de Especialización II", code: "DER905", credits: 4, hours: 3, prerequisites: [] }
      ]
    },
    {
      id: 10,
      name: "Semestre 10",
      totalCredits: 28,
      subjects: [
        { id: "DER1001", name: "Seminario de Grado", code: "DER1001", credits: 8, hours: 5, prerequisites: ["DER902"] },
        { id: "DER1002", name: "Clínica Jurídica", code: "DER1002", credits: 8, hours: 5, prerequisites: ["DER901"] },
        { id: "DER1003", name: "Derecho Procesal Laboral", code: "DER1003", credits: 4, hours: 3, prerequisites: ["DER603"] },
        { id: "DER1004", name: "Electivo de Especialización III", code: "DER1004", credits: 4, hours: 3, prerequisites: [] },
        { id: "DER1005", name: "Electivo de Especialización IV", code: "DER1005", credits: 4, hours: 3, prerequisites: [] }
      ]
    }
  ];

  // Load approved subjects from localStorage on component mount
  useEffect(() => {
    const savedApproved = localStorage.getItem('approvedSubjects');
    const savedExamen = localStorage.getItem('examenApproved');
    
    if (savedApproved) {
      setApprovedSubjects(JSON.parse(savedApproved));
    }
    
    if (savedExamen) {
      setIsExamenApproved(JSON.parse(savedExamen));
    }
  }, []);

  // Save to localStorage whenever approved subjects change
  useEffect(() => {
    localStorage.setItem('approvedSubjects', JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  useEffect(() => {
    localStorage.setItem('examenApproved', JSON.stringify(isExamenApproved));
  }, [isExamenApproved]);

  // Check if a subject is unlocked based on prerequisites
  const isSubjectUnlocked = useCallback((subject) => {
    if (!subject.prerequisites || subject.prerequisites.length === 0) {
      return true;
    }
    
    return subject.prerequisites.every(prereq => 
      approvedSubjects.includes(prereq)
    );
  }, [approvedSubjects]);

  // Check if Examen de Grado is unlocked (all semesters 1-9 completed)
  const isExamenUnlocked = useCallback(() => {
    const allRequiredSubjects = curriculumData
      .slice(0, 9) // Semesters 1-9
      .flatMap(semester => semester.subjects.map(subject => subject.id));
    
    return allRequiredSubjects.every(subjectId => 
      approvedSubjects.includes(subjectId)
    );
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
      setIsExamenApproved(prev => !prev);
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
      setIsExamenApproved(false);
      localStorage.removeItem('approvedSubjects');
      localStorage.removeItem('examenApproved');
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
      examenCompleted: isExamenApproved,
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
            isApproved={isExamenApproved}
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