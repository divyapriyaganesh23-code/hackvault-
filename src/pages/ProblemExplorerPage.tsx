import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  ExternalLink,
  Layers,
  ChevronDown,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import { ProblemStatement, HackathonCategory, DifficultyLevel } from '../types';

interface Props {
  problems: ProblemStatement[];
  bookmarkedProblemIds: string[];
  initialSearchQuery?: string;
  onToggleBookmark: (problemId: string) => void;
  onSelectProblem: (problemId: string) => void;
  onNavigateToSolutions: (problemId: string) => void;
}

export const ProblemExplorerPage: React.FC<Props> = ({
  problems,
  bookmarkedProblemIds,
  initialSearchQuery = '',
  onToggleBookmark,
  onSelectProblem,
  onNavigateToSolutions
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedHackathon, setSelectedHackathon] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [tanglishLanguageMap, setTanglishLanguageMap] = useState<Record<string, boolean>>({});

  // Extract unique filters
  const domains = useMemo(() => ['All', ...Array.from(new Set(problems.map(p => p.domain)))], [problems]);
  const hackathons = useMemo(() => ['All', ...Array.from(new Set(problems.map(p => p.hackathonName)))], [problems]);
  const years = useMemo(() => ['All', ...Array.from(new Set(problems.map(p => p.hackathonYear.toString())))], [problems]);

  const toggleLanguageForCard = (id: string) => {
    setTanglishLanguageMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesOrg = p.organization.toLowerCase().includes(query);
        const matchesDesc = p.originalStatement.toLowerCase().includes(query);
        const matchesTech = p.suggestedTechStack.some(t => t.toLowerCase().includes(query));
        const matchesDomain = p.domain.toLowerCase().includes(query);
        if (!matchesCode && !matchesTitle && !matchesOrg && !matchesDesc && !matchesTech && !matchesDomain) {
          return false;
        }
      }

      // Domain filter
      if (selectedDomain !== 'All' && p.domain !== selectedDomain) return false;

      // Hackathon filter
      if (selectedHackathon !== 'All' && p.hackathonName !== selectedHackathon) return false;

      // Year filter
      if (selectedYear !== 'All' && p.hackathonYear.toString() !== selectedYear) return false;

      // Category (Software / Hardware / Both)
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Difficulty
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;

      return true;
    });
  }, [problems, searchQuery, selectedDomain, selectedHackathon, selectedYear, selectedCategory, selectedDifficulty]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedHackathon('All');
    setSelectedYear('All');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  const isFiltering = searchQuery !== '' || selectedDomain !== 'All' || selectedHackathon !== 'All' || selectedYear !== 'All' || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Smart Hackathon Repository</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Problem Statement Explorer
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Search, filter and analyze previous hackathon problem statements. View original requirements, official government links, and toggle simplified explanations in English and Tamil/Tanglish.
        </p>
      </div>

      {/* Search & Filter Controls Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, title, problem ID (e.g. SIH-1432), organisation, or tech (OpenCV, ESP32)..."
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

        {/* Multi-facet Filter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {/* Domain */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Domain</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Hackathon */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Hackathon</label>
            <select
              value={selectedHackathon}
              onChange={(e) => setSelectedHackathon(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              {hackathons.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Type</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="All">All Types</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Both">Both (IoT/Edge)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredProblems.length}</span> of {problems.length} problem statements
          </div>
          {isFiltering && (
            <button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Problem Cards List */}
      {filteredProblems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No problem statements match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try relaxing your search keywords or clearing some filters.</p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProblems.map((problem) => {
            const isBookmarked = bookmarkedProblemIds.includes(problem.id);
            const isTanglish = tanglishLanguageMap[problem.id] || false;
            const solutionsCount = problem.projectSolutionIds.length;

            return (
              <div
                key={problem.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all space-y-5"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {problem.code}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {problem.hackathonName} &bull; {problem.hackathonYear}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                        {problem.domain}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                        problem.category === 'Hardware' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        problem.category === 'Both' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-sky-50 text-sky-700 border-sky-200'
                      }`}>
                        {problem.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Difficulty: <strong className="text-slate-700">{problem.difficulty}</strong>
                      </span>
                    </div>

                    <h2
                      onClick={() => onSelectProblem(problem.id)}
                      className="text-lg sm:text-xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition leading-snug pt-1"
                    >
                      {problem.title}
                    </h2>
                    
                    <p className="text-xs text-slate-500 font-medium">
                      Organization / Ministry: <span className="font-semibold text-slate-700">{problem.organization}</span>
                      {problem.participantCount && (
                        <span className="ml-2 text-slate-400">({problem.participantCount} teams registered)</span>
                      )}
                    </p>
                  </div>

                  {/* Bookmark Button */}
                  <div className="flex items-center gap-2 self-start">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(problem.id)}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this problem'}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                        isBookmarked
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                          : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                      <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
                    </button>
                  </div>
                </div>

                {/* Original Statement Excerpt */}
                <div className="text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
                  <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <span>Original Problem Statement:</span>
                    {problem.officialSourceUrl && (
                      <a
                        href={problem.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-[11px] inline-flex items-center gap-0.5 ml-auto font-normal"
                      >
                        Official Source <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="italic text-slate-600 line-clamp-2">"{problem.originalStatement}"</p>
                </div>

                {/* Simple Explanation with English / Tamil-Tanglish Toggle */}
                <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Simple Explanation for Students</span>
                    </div>

                    {/* Language Switcher Pill */}
                    <div className="flex items-center p-0.5 bg-white border border-slate-200 rounded-lg text-[11px]">
                      <button
                        type="button"
                        onClick={() => toggleLanguageForCard(problem.id)}
                        className={`px-2 py-0.5 rounded-md font-medium transition ${
                          !isTanglish ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLanguageForCard(problem.id)}
                        className={`px-2 py-0.5 rounded-md font-medium transition ${
                          isTanglish ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        தமிழ் / Tanglish
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {isTanglish ? problem.simpleExplanationTa : problem.simpleExplanationEn}
                  </p>
                </div>

                {/* Tech Stack Pills & Deliverables Preview */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">Stack:</span>
                    {problem.suggestedTechStack.map(t => (
                      <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/50">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => onSelectProblem(problem.id)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Problem Details & {solutionsCount} Solution{solutionsCount > 1 ? 's' : ''}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
