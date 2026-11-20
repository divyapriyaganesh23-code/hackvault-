import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  FolderGit2, 
  Layers, 
  ExternalLink, 
  Github, 
  Scale, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { ProblemStatement, ProjectSolution } from '../types';
import { findSimilarProblems, SimilarityMatch } from '../services/similarity';
import { VerificationBadge } from '../components/VerificationBadge';

interface Props {
  problems: ProblemStatement[];
  projects: ProjectSolution[];
  onSelectProblem: (problemId: string) => void;
  onToggleCompare: (projectId: string) => void;
  compareProjectIds: string[];
}

export const SimilarFinderPage: React.FC<Props> = ({
  problems,
  projects,
  onSelectProblem,
  onToggleCompare,
  compareProjectIds
}) => {
  const [selectedExistingId, setSelectedExistingId] = useState<string>('');
  const [customText, setCustomText] = useState('');
  const [customDomain, setCustomDomain] = useState('All');
  const [hasSearched, setHasSearched] = useState(false);

  const domains = useMemo(() => ['All', ...Array.from(new Set((problems || []).map(p => p.domain)))], [problems]);

  // If student picks an existing problem
  const handleSelectExisting = (id: string) => {
    setSelectedExistingId(id);
    const found = problems.find(p => p.id === id);
    if (found) {
      setCustomText(found.originalStatement);
      setCustomDomain(found.domain);
      setHasSearched(true);
    }
  };

  // Perform similarity matching
  const matches: SimilarityMatch[] = useMemo(() => {
    if (!hasSearched && !selectedExistingId && !customText.trim()) {
      return [];
    }

    if (selectedExistingId) {
      const selected = problems.find(p => p.id === selectedExistingId);
      if (selected) {
        return findSimilarProblems(selected, problems, projects, selectedExistingId);
      }
    }

    if (customText.trim()) {
      return findSimilarProblems(
        {
          title: 'Custom Problem Query',
          originalStatement: customText,
          domain: customDomain !== 'All' ? customDomain : undefined
        },
        problems,
        projects
      );
    }

    return [];
  }, [selectedExistingId, customText, customDomain, hasSearched, problems, projects]);

  const handleRunSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      setSelectedExistingId('');
      setHasSearched(true);
    }
  };

  const handleReset = () => {
    setSelectedExistingId('');
    setCustomText('');
    setCustomDomain('All');
    setHasSearched(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Semantic Cross-Hackathon Matcher</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Similar Problem & Solution Finder
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Paste an upcoming hackathon problem statement or pick a challenge to find how similar problems were framed in past hackathons and discover existing code repositories.
        </p>
      </div>

      {/* Input Options Box */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        
        {/* Option A: Select Existing */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Option A: Pick from Existing Hackathon Challenges
          </label>
          <select
            value={selectedExistingId}
            onChange={(e) => handleSelectExisting(e.target.value)}
            className="w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
          >
            <option value="">-- Choose an indexed problem to find related challenges --</option>
            {problems.map(p => (
              <option key={p.id} value={p.id}>
                [{p.code}] {p.title} ({p.hackathonName})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span>OR</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Option B: Paste Custom Text */}
        <form onSubmit={handleRunSearch} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Option B: Paste Any New Problem Statement
              </label>
              <span className="text-[11px] text-slate-400">e.g. from SIH 2025, college hackathon, or client brief</span>
            </div>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setSelectedExistingId('');
              }}
              placeholder="Paste your hackathon problem statement here... (e.g. Development of an edge device with computer vision and acoustic sensors to detect railway track cracks and anomalies...)"
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Domain Filter:</span>
              <select
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
              >
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              {(customText || selectedExistingId) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Find Similar Problems & Solutions</span>
              </button>
            </div>
          </div>
        </form>

      </div>

      {/* Results Section */}
      {hasSearched || selectedExistingId ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Matched Problem Statements ({matches.length})
            </h2>
            <span className="text-xs text-slate-500">
              Ranked by semantic overlap, shared entity keywords, and tech stack
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <p className="font-semibold text-slate-700">No close problem statements matched your input.</p>
              <p>Try pasting a longer problem description or selecting 'All' in the domain filter.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {matches.map(({ problem, score, reasons, relatedSolutions }) => (
                <div
                  key={problem.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all space-y-4"
                >
                  {/* Match Score & Badges */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {problem.code}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {problem.hackathonName} ({problem.hackathonYear})
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                        {problem.domain}
                      </span>
                    </div>

                    {/* Match Score Pill */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs text-slate-500">Similarity Match:</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        score >= 70 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        score >= 45 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {score}% Match
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProblem(problem.id)}
                    className="text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition leading-snug"
                  >
                    {problem.title}
                  </h3>

                  {/* Why it matches */}
                  <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Why this is related:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                      {reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {problem.simpleExplanationEn}
                  </p>

                  {/* Related Existing Solutions (Instant access!) */}
                  {relatedSolutions.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <FolderGit2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Existing Solution Repositories from this challenge:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {relatedSolutions.map(sol => {
                          const inCompare = compareProjectIds.includes(sol.id);
                          return (
                            <div
                              key={sol.id}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <VerificationBadge status={sol.verificationStatus} />
                                  <button
                                    type="button"
                                    onClick={() => onToggleCompare(sol.id)}
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                      inCompare
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white border-slate-300 text-slate-600'
                                    }`}
                                  >
                                    {inCompare ? 'Comparing' : '+ Compare'}
                                  </button>
                                </div>
                                <h5 className="font-bold text-xs text-slate-900">{sol.name}</h5>
                                <p className="text-[11px] text-slate-500 line-clamp-1">{sol.shortDescription}</p>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                {sol.githubUrl && (
                                  <a
                                    href={sol.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                                  >
                                    <Github className="w-3 h-3 text-slate-700" />
                                    <span>Code Repo</span>
                                  </a>
                                )}
                                {sol.liveUrl && (
                                  <a
                                    href={sol.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                                  >
                                    <span>Live App</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onSelectProblem(problem.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>View Full Problem Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-600 font-medium">
            💡 Select a problem above or paste your challenge requirements to trigger cross-hackathon discovery.
          </p>
        </div>
      )}

    </div>
  );
};
