import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SettingsModal } from './components/SettingsModal';
import { HomePage } from './pages/HomePage';
import { ProblemExplorerPage } from './pages/ProblemExplorerPage';
import { ProblemDetailsPage } from './pages/ProblemDetailsPage';
import { SolutionsExplorerPage } from './pages/SolutionsExplorerPage';
import { ProjectComparisonPage } from './pages/ProjectComparisonPage';
import { SimilarFinderPage } from './pages/SimilarFinderPage';
import { SavedProjectsPage } from './pages/SavedProjectsPage';
import { AdminPage } from './pages/AdminPage';
import { storageService } from './services/storage';
import { ProblemStatement, ProjectSolution, HackathonEvent, UserBookmark } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');
  
  // Database states initialized synchronously with safe seed fallbacks
  const [problems, setProblems] = useState<ProblemStatement[]>(() => storageService.getProblems());
  const [projects, setProjects] = useState<ProjectSolution[]>(() => storageService.getProjects());
  const [hackathons, setHackathons] = useState<HackathonEvent[]>(() => storageService.getHackathons());
  const [bookmarks, setBookmarks] = useState<UserBookmark>(() => storageService.getBookmarks());
  const [compareProjectIds, setCompareProjectIds] = useState<string[]>(() => storageService.getCompareProjectIds());
  
  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Reload data from storage whenever updated
  const reloadData = () => {
    setProblems(storageService.getProblems());
    setProjects(storageService.getProjects());
    setHackathons(storageService.getHackathons());
    setBookmarks(storageService.getBookmarks());
    setCompareProjectIds(storageService.getCompareProjectIds());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleNavigate = (tab: string, param?: string) => {
    if (param !== undefined) {
      setSearchParam(param);
    } else {
      setSearchParam('');
    }

    if (tab === 'problems' && param) {
      setCurrentTab('problems');
    } else {
      setCurrentTab(tab);
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleSelectProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    setCurrentTab('details');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleToggleBookmarkProblem = (problemId: string) => {
    storageService.toggleBookmarkProblem(problemId);
    setBookmarks(storageService.getBookmarks());
  };

  const handleToggleSaveProject = (projectId: string) => {
    storageService.toggleSaveProject(projectId);
    setBookmarks(storageService.getBookmarks());
  };

  const handleToggleCompare = (projectId: string) => {
    storageService.toggleCompareProject(projectId);
    setCompareProjectIds(storageService.getCompareProjectIds());
  };

  const handleRemoveFromCompare = (projectId: string) => {
    const updated = (compareProjectIds || []).filter(id => id !== projectId);
    storageService.saveCompareProjectIds(updated);
    setCompareProjectIds(updated);
  };

  const handleClearCompare = () => {
    storageService.clearCompare();
    setCompareProjectIds([]);
  };

  const handleAddProjectToCompare = (projectId: string) => {
    handleToggleCompare(projectId);
  };

  // Safe selected problem
  const selectedProblem = (problems || []).find(p => p.id === selectedProblemId) || problems?.[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        bookmarkCount={(bookmarks?.problemIds?.length || 0) + (bookmarks?.projectIds?.length || 0)}
        compareCount={compareProjectIds?.length || 0}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            problems={problems || []}
            projects={projects || []}
            hackathons={hackathons || []}
            bookmarkedProblemIds={bookmarks?.problemIds || []}
            compareProjectIds={compareProjectIds || []}
            onNavigate={handleNavigate}
            onToggleBookmark={handleToggleBookmarkProblem}
            onToggleCompare={handleToggleCompare}
            onSelectProblem={handleSelectProblem}
          />
        )}

        {currentTab === 'problems' && (
          <ProblemExplorerPage
            problems={problems || []}
            bookmarkedProblemIds={bookmarks?.problemIds || []}
            initialSearchQuery={searchParam}
            onToggleBookmark={handleToggleBookmarkProblem}
            onSelectProblem={handleSelectProblem}
            onNavigateToSolutions={() => handleNavigate('solutions')}
          />
        )}

        {currentTab === 'details' && selectedProblem && (
          <ProblemDetailsPage
            problem={selectedProblem}
            allProblems={problems || []}
            allProjects={projects || []}
            bookmarkedProblemIds={bookmarks?.problemIds || []}
            compareProjectIds={compareProjectIds || []}
            onBack={() => handleNavigate('problems')}
            onToggleBookmark={handleToggleBookmarkProblem}
            onToggleCompare={handleToggleCompare}
            onSelectProblem={handleSelectProblem}
            onNavigateToCompare={() => handleNavigate('compare')}
          />
        )}

        {currentTab === 'solutions' && (
          <SolutionsExplorerPage
            projects={projects || []}
            problems={problems || []}
            compareProjectIds={compareProjectIds || []}
            initialSearchQuery={searchParam}
            onToggleCompare={handleToggleCompare}
            onSelectProblem={handleSelectProblem}
            onNavigateToCompare={() => handleNavigate('compare')}
          />
        )}

        {currentTab === 'compare' && (
          <ProjectComparisonPage
            allProjects={projects || []}
            allProblems={problems || []}
            compareProjectIds={compareProjectIds || []}
            onRemoveFromCompare={handleRemoveFromCompare}
            onClearCompare={handleClearCompare}
            onAddProjectToCompare={handleAddProjectToCompare}
            onNavigateToSolutions={() => handleNavigate('solutions')}
          />
        )}

        {currentTab === 'similar' && (
          <SimilarFinderPage
            problems={problems || []}
            projects={projects || []}
            onSelectProblem={handleSelectProblem}
            onToggleCompare={handleToggleCompare}
            compareProjectIds={compareProjectIds || []}
          />
        )}

        {currentTab === 'saved' && (
          <SavedProjectsPage
            problems={problems || []}
            projects={projects || []}
            bookmarks={bookmarks || { problemIds: [], projectIds: [], collections: [], researchNotes: {} }}
            onRefreshBookmarks={() => setBookmarks(storageService.getBookmarks())}
            onSelectProblem={handleSelectProblem}
            onToggleBookmarkProblem={handleToggleBookmarkProblem}
            onToggleSaveProject={handleToggleSaveProject}
            onNavigateToProblems={() => handleNavigate('problems')}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPage
            problems={problems || []}
            projects={projects || []}
            hackathons={hackathons || []}
            onDataChanged={reloadData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigChanged={reloadData}
      />

    </div>
  );
}

export default App;
