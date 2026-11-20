import React, { useState } from 'react';
import { 
  Bookmark, 
  Layers, 
  FolderGit2, 
  Trash2, 
  ExternalLink, 
  Github, 
  Download, 
  ArrowRight, 
  Plus, 
  FileText,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ProblemStatement, ProjectSolution, UserBookmark } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { storageService } from '../services/storage';

interface Props {
  problems: ProblemStatement[];
  projects: ProjectSolution[];
  bookmarks: UserBookmark;
  onRefreshBookmarks: () => void;
  onSelectProblem: (problemId: string) => void;
  onToggleBookmarkProblem: (problemId: string) => void;
  onToggleSaveProject: (projectId: string) => void;
  onNavigateToProblems: () => void;
}

export const SavedProjectsPage: React.FC<Props> = ({
  problems,
  projects,
  bookmarks,
  onRefreshBookmarks,
  onSelectProblem,
  onToggleBookmarkProblem,
  onToggleSaveProject,
  onNavigateToProblems
}) => {
  const [activeTab, setActiveTab] = useState<'problems' | 'projects' | 'notes'>('problems');
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [isCreatingCol, setIsCreatingCol] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const bookmarkedProblems = problems.filter(p => bookmarks.problemIds.includes(p.id));
  const savedProjects = projects.filter(p => bookmarks.projectIds.includes(p.id));

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      storageService.createCollection(newColName.trim(), newColDesc.trim(), bookmarks.problemIds);
      setNewColName('');
      setNewColDesc('');
      setIsCreatingCol(false);
      onRefreshBookmarks();
    }
  };

  const handleDeleteCollection = (id: string) => {
    storageService.deleteCollection(id);
    onRefreshBookmarks();
  };

  const handleExportResearchBrief = () => {
    const text = `# HackVault - My Hackathon Research Portfolio
Exported at: ${new Date().toLocaleString()}

## Bookmarked Problem Statements (${bookmarkedProblems.length})
${bookmarkedProblems.map(p => `
### [${p.code}] ${p.title}
- Hackathon: ${p.hackathonName} (${p.hackathonYear})
- Ministry / Org: ${p.organization}
- Domain: ${p.domain}
- Deliverables: ${p.expectedDeliverables.join('; ')}
- Suggested Tech: ${p.suggestedTechStack.join(', ')}
- Official Source: ${p.officialSourceUrl}
- My Research Notes: ${bookmarks.researchNotes[p.id] || 'None'}
`).join('\n---\n')}

## Shortlisted Reference Projects (${savedProjects.length})
${savedProjects.map(proj => `
### ${proj.name} (${proj.verificationStatus})
- Hackathon: ${proj.hackathonName} (${proj.hackathonYear})
- Team: ${proj.teamName || 'Public Team'}
- GitHub: ${proj.githubUrl}
- Tech: ${proj.technologies.join(', ')}
- Limitations to overcome: ${proj.limitations.join('; ')}
`).join('\n---\n')}
`;

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HackVault-Research-Portfolio-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4 fill-blue-600 text-blue-600" />
            <span>Personal Hackathon Workspace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Saved Research
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Shortlist problems for your team, save reference repositories, and export structured briefs for your hackathon pitch decks.
          </p>
        </div>

        {(bookmarkedProblems.length > 0 || savedProjects.length > 0) && (
          <button
            onClick={handleExportResearchBrief}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>{exportNotice ? 'Exported Portfolio!' : 'Export Research Brief (.md)'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('problems')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeTab === 'problems'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Bookmarked Problems ({bookmarkedProblems.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeTab === 'projects'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Saved Projects ({savedProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeTab === 'notes'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Research Notes ({Object.keys(bookmarks.researchNotes).length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          {bookmarkedProblems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">No bookmarked problem statements yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the bookmark icon on any problem statement card to pin it to your personal shortlist.
                </p>
              </div>
              <button
                onClick={onNavigateToProblems}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
              >
                Browse Problem Statements
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookmarkedProblems.map(p => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {p.code}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{p.hackathonName}</span>
                      <span className="text-xs text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {p.domain}
                      </span>
                    </div>
                    <h3
                      onClick={() => onSelectProblem(p.id)}
                      className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition"
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500">Org: {p.organization}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => onSelectProblem(p.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleBookmarkProblem(p.id)}
                      title="Remove bookmark"
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6">
          {savedProjects.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">No saved reference projects yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Save winning projects and repositories to inspect their code later.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedProjects.map(proj => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <VerificationBadge status={proj.verificationStatus} />
                      <button
                        onClick={() => onToggleSaveProject(proj.id)}
                        className="text-slate-400 hover:text-red-600 transition"
                        title="Remove saved project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{proj.name}</h4>
                    <p className="text-xs text-slate-500">{proj.hackathonName} ({proj.hackathonYear})</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{proj.shortDescription}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-700 hover:text-blue-600 flex items-center gap-1 font-medium"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium ml-auto"
                      >
                        <span>Live Prototype</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-4">
          {Object.keys(bookmarks.researchNotes).length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
              No notes saved yet. Open any Problem Details page to add custom brainstorm scratchpad notes for your team!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(bookmarks.researchNotes).map(([problemId, note]) => {
                const problem = problems.find(p => p.id === problemId);
                return (
                  <div key={problemId} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4
                        onClick={() => onSelectProblem(problemId)}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition"
                      >
                        {problem ? `[${problem.code}] ${problem.title}` : `Problem #${problemId}`}
                      </h4>
                      <span className="text-[11px] text-slate-400">Scratchpad Note</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-sans">
                      {note}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
