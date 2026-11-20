import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  FolderGit2, 
  Scale, 
  Award, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark, 
  Zap, 
  Cpu, 
  Activity, 
  Wheat, 
  Code2, 
  Radio, 
  Leaf, 
  Coins,
  ChevronRight
} from 'lucide-react';
import { ProblemStatement, ProjectSolution, HackathonEvent } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

interface Props {
  problems: ProblemStatement[];
  projects: ProjectSolution[];
  hackathons: HackathonEvent[];
  bookmarkedProblemIds: string[];
  compareProjectIds: string[];
  onNavigate: (tab: string, param?: string) => void;
  onToggleBookmark: (problemId: string) => void;
  onToggleCompare: (projectId: string) => void;
  onSelectProblem: (problemId: string) => void;
}

export const HomePage: React.FC<Props> = ({
  problems,
  projects,
  hackathons,
  bookmarkedProblemIds,
  compareProjectIds,
  onNavigate,
  onToggleBookmark,
  onToggleCompare,
  onSelectProblem
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('problems', searchTerm.trim());
    } else {
      onNavigate('problems');
    }
  };

  const domainIcons: Record<string, any> = {
    'Transportation & Logistics': Radio,
    'Healthcare': Activity,
    'Agriculture & FoodTech': Wheat,
    'Cybersecurity': ShieldCheck,
    'Accessibility': Cpu,
    'Clean & Green Technology': Leaf,
    'Blockchain & Web3': Coins,
  };

  const domains = [
    'Transportation & Logistics',
    'Healthcare',
    'Agriculture & FoodTech',
    'Cybersecurity',
    'Accessibility',
    'Clean & Green Technology',
    'Blockchain & Web3'
  ];

  const recentProblems = (problems || []).slice(0, 4);
  const featuredWinners = (projects || []).filter(p => p?.verificationStatus?.includes('Winner')).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white gradient-hero-glow overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Built for Smart India Hackathon & Collegiate Innovators</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Discover Past Hackathon Problems, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Understand Them & See Real Winning Code
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stop starting hackathon projects from scratch. HackVault helps students explore previous government & global problem statements, read simple explanations in English and Tanglish, discover winning GitHub repositories, and compare prior solutions.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form onSubmit={handleHeroSearch} className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-blue-500/30 hover:border-blue-500/60 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search problem statements, hackathons or projects (e.g. SIH-1432, YOLO, Crop, Railway)..."
                className="w-full text-sm sm:text-base pl-12 pr-32 py-4 rounded-2xl focus:outline-none placeholder:text-slate-400 font-sans"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            
            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Popular:</span>
              {['Railway Track SIH', 'Ayurvedic Herb AI', 'KAVACH Darknet', 'Sign Language', 'LoRa Precision Agri'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onNavigate('problems', tag)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Value Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-2xl font-bold text-slate-900">{problems.length}+</div>
              <div className="text-xs text-slate-500 mt-0.5">Curated Problem Statements</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-2xl font-bold text-blue-600">{projects.length}+</div>
              <div className="text-xs text-slate-500 mt-0.5">Verified Working Solutions</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Real Working GitHub Repos</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-2xl font-bold text-indigo-600">En & தமிழ்</div>
              <div className="text-xs text-slate-500 mt-0.5">Bilingual Simple Explanations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Quick Browse */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Browse by Domain</h2>
            <p className="text-sm text-slate-500 mt-0.5">Explore problem statements and solutions tailored to your technical discipline</p>
          </div>
          <button
            onClick={() => onNavigate('problems')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Problems</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {domains.map((dom) => {
            const Icon = domainIcons[dom] || Layers;
            const count = problems.filter(p => p.domain === dom).length;
            return (
              <button
                key={dom}
                onClick={() => onNavigate('problems', dom)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left group flex items-start justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition">
                      {dom}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{count} problem statements</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition -translate-x-1 group-hover:translate-x-0" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Problem Statements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Curated Challenges</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recently Added Problem Statements</h2>
            <p className="text-sm text-slate-500 mt-0.5">Authentic problems from Smart India Hackathon, Kavach and Google Solution Challenge</p>
          </div>
          <button
            onClick={() => onNavigate('problems')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Explore all {problems.length} &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProblems.map((problem) => {
            const isBookmarked = bookmarkedProblemIds?.includes(problem.id) || false;
            const relatedCount = problem.projectSolutionIds?.length || 0;

            return (
              <div
                key={problem.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-3">
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

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(problem.id)}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this problem'}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked
                          ? 'bg-blue-50 border-blue-300 text-blue-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 
                      onClick={() => onSelectProblem(problem.id)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition leading-snug"
                    >
                      {problem.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Organization: <span className="text-slate-700">{problem.organization}</span>
                    </p>
                  </div>

                  {/* Plain Language Preview */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Simple Explanation (Preview)</span>
                    </div>
                    <p className="line-clamp-2">{problem.simpleExplanationEn}</p>
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                      <span>தமிழ் / Tanglish explanation available inside &rarr;</span>
                    </div>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {(problem.suggestedTechStack || []).slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {tech}
                      </span>
                    ))}
                    {(problem.suggestedTechStack?.length || 0) > 4 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{(problem.suggestedTechStack?.length || 0) - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{relatedCount} Verified Solution{relatedCount > 1 ? 's' : ''} available</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProblem(problem.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Solutions & Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Winning Solutions Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified Working Implementations</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Learn from Real Winning Projects
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Inspect authentic GitHub code repositories, architectures, and demo recordings of verified 1st place and runner-up teams.
              </p>
            </div>

            <button
              onClick={() => onNavigate('solutions')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-200 border border-slate-700 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <span>Explore All Solutions</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWinners.map((proj) => {
              const inCompare = compareProjectIds.includes(proj.id);
              return (
                <div
                  key={proj.id}
                  className="bg-slate-850 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <VerificationBadge status={proj.verificationStatus} />
                      <span className="text-xs text-slate-400 font-mono">{proj.hackathonYear}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug">{proj.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {proj.teamName || 'Collegiate Finalist Team'} &bull; {proj.hackathonName}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {proj.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 text-blue-200" />
                      </a>

                      {proj.demoVideoUrl && (
                        <a
                          href={proj.demoVideoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1 transition"
                        >
                          <span>Video</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleCompare(proj.id)}
                      className={`w-full py-1.5 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1.5 ${
                        inCompare
                          ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                          : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{inCompare ? 'In Comparison Matrix' : 'Add to Comparison'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Student Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How HackVault Accelerates Your Hackathon Prep
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            The 4-step discovery framework that takes you from reading a problem statement to designing a winning solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Search & Filter</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Find problem statements across SIH, Kavach, and Google Solution Challenge filtered by ministry, year, or tech discipline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Understand Easily</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cut through dense government bureaucracy with simplified explanations in English or Tanglish, plus concrete expected deliverables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Inspect Real Solutions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse actual working GitHub code repositories and live prototypes built by past 1st-place and runner-up student teams.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-lg">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">Compare & Beat Them</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Put past solutions side-by-side in the comparison matrix to analyze their documented limitations and craft your winning edge.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to find your next winning project idea?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl">
              Bookmark problem statements, organize them into custom team research collections, and prepare winning PPTs with verified references.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('problems')}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition"
            >
              Explore Problem Statements
            </button>
            <button
              onClick={() => onNavigate('similar')}
              className="px-6 py-3 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-semibold text-sm border border-blue-400/40 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Similar Problem Finder</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
