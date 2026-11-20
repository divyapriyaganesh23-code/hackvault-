import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  Github, 
  Video, 
  FileText, 
  Scale, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ProjectSolution, ProblemStatement } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

interface Props {
  projects: ProjectSolution[];
  problems: ProblemStatement[];
  compareProjectIds: string[];
  initialSearchQuery?: string;
  onToggleCompare: (projectId: string) => void;
  onSelectProblem: (problemId: string) => void;
  onNavigateToCompare: () => void;
}

export const SolutionsExplorerPage: React.FC<Props> = ({
  projects,
  problems,
  compareProjectIds,
  initialSearchQuery = '',
  onToggleCompare,
  onSelectProblem,
  onNavigateToCompare
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedHackathon, setSelectedHackathon] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyWithLiveDemo, setOnlyWithLiveDemo] = useState(false);
  const [onlyWithVideo, setOnlyWithVideo] = useState(false);

  // Extract unique hackathon names
  const hackathons = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.hackathonName)))], [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesApproach = p.approach.toLowerCase().includes(q);
        const matchesTech = p.technologies.some(t => t.toLowerCase().includes(q));
        const matchesTeam = p.teamName?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesApproach && !matchesTech && !matchesTeam) {
          return false;
        }
      }

      if (selectedHackathon !== 'All' && p.hackathonName !== selectedHackathon) return false;

      if (selectedStatus !== 'All') {
        if (selectedStatus === 'Winners' && !p.verificationStatus.includes('Winner')) return false;
        if (selectedStatus === 'Finalists' && p.verificationStatus !== 'Finalist') return false;
      }

      if (onlyWithLiveDemo && !p.liveUrl) return false;
      if (onlyWithVideo && !p.demoVideoUrl) return false;

      return true;
    });
  }, [projects, searchQuery, selectedHackathon, selectedStatus, onlyWithLiveDemo, onlyWithVideo]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedHackathon('All');
    setSelectedStatus('All');
    setOnlyWithLiveDemo(false);
    setOnlyWithVideo(false);
  };

  const isFiltering = searchQuery !== '' || selectedHackathon !== 'All' || selectedStatus !== 'All' || onlyWithLiveDemo || onlyWithVideo;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Open Source Hackathon Codebase</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Existing Solutions Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Discover real, publicly accessible repositories, prototypes, and slide presentations submitted by past winning and finalist student teams.
          </p>
        </div>

        {compareProjectIds.length > 0 && (
          <button
            onClick={onNavigateToCompare}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition shrink-0 self-start md:self-auto"
          >
            <Scale className="w-4 h-4" />
            <span>Open Comparison ({compareProjectIds.length} Selected)</span>
          </button>
        )}
      </div>

      {/* Filter Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name, team, architecture (e.g. MediaPipe, YOLOv8, LoRa, Smart Contract)..."
            className="w-full text-sm pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdowns & Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            {/* Hackathon */}
            <div>
              <select
                value={selectedHackathon}
                onChange={(e) => setSelectedHackathon(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
              >
                {hackathons.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            {/* Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
              >
                <option value="All">All Verification Statuses</option>
                <option value="Winners">Winners Only</option>
                <option value="Finalists">Finalists Only</option>
              </select>
            </div>

            {/* Toggle checkboxes */}
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyWithLiveDemo}
                onChange={(e) => setOnlyWithLiveDemo(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Has Live Demo</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyWithVideo}
                onChange={(e) => setOnlyWithVideo(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Has Video Demo</span>
            </label>
          </div>

          {/* Reset */}
          {isFiltering && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No project solutions found</h3>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search query or unchecking filters.</p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => {
            const inCompare = compareProjectIds.includes(proj.id);
            const parentProblem = problems.find(p => p.id === proj.problemId);

            return (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Status & Compare button */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <VerificationBadge status={proj.verificationStatus} />
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {proj.hackathonName} &bull; {proj.hackathonYear}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleCompare(proj.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition flex items-center gap-1 shrink-0 ${
                        inCompare
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{inCompare ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>

                  {/* Title & Team */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{proj.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Team: <span className="text-slate-800">{proj.teamName || 'Collegiate Finalist Team'}</span>
                    </p>
                  </div>

                  {/* Parent Problem Link */}
                  {parentProblem && (
                    <div 
                      onClick={() => onSelectProblem(parentProblem.id)}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer transition flex items-center justify-between text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Problem Solved:</span>
                        <span className="font-semibold text-slate-800 truncate block">{parentProblem.code}: {parentProblem.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  )}

                  {/* Description & Approach */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-900 block">Technical Approach:</span>
                    <p className="text-slate-600 leading-relaxed">{proj.approach}</p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map(t => (
                      <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Limitations Mentioned */}
                  {proj.limitations && proj.limitations.length > 0 && (
                    <div className="text-[11px] text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60">
                      <strong className="block font-semibold">Documented Limitations:</strong>
                      <span className="italic">{proj.limitations[0]}</span>
                    </div>
                  )}
                </div>

                {/* External Links Bar */}
                <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repo</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3 h-3 text-blue-200" />
                    </a>
                  )}

                  {proj.demoVideoUrl && (
                    <a
                      href={proj.demoVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition flex items-center justify-center gap-1 border border-slate-200"
                    >
                      <Video className="w-3.5 h-3.5 text-red-600" />
                      <span>Video</span>
                    </a>
                  )}

                  {proj.presentationUrl && (
                    <a
                      href={proj.presentationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition flex items-center justify-center gap-1 border border-slate-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Deck</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
