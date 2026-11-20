import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  Github, 
  Video, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Layers, 
  Save, 
  Cpu, 
  Award, 
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';
import { ProblemStatement, ProjectSolution } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { aiService, AIAnalysisResult } from '../services/aiService';
import { storageService } from '../services/storage';

interface Props {
  problem: ProblemStatement;
  allProblems: ProblemStatement[];
  allProjects: ProjectSolution[];
  bookmarkedProblemIds: string[];
  compareProjectIds: string[];
  onBack: () => void;
  onToggleBookmark: (problemId: string) => void;
  onToggleCompare: (projectId: string) => void;
  onSelectProblem: (problemId: string) => void;
  onNavigateToCompare: () => void;
}

export const ProblemDetailsPage: React.FC<Props> = ({
  problem,
  allProblems,
  allProjects,
  bookmarkedProblemIds,
  compareProjectIds,
  onBack,
  onToggleBookmark,
  onToggleCompare,
  onSelectProblem,
  onNavigateToCompare
}) => {
  const [langTab, setLangTab] = useState<'en' | 'ta'>('en');
  const [studentNote, setStudentNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const isBookmarked = bookmarkedProblemIds?.includes(problem.id) || false;

  // Load student note from bookmarks
  useEffect(() => {
    const b = storageService.getBookmarks();
    setStudentNote(b?.researchNotes?.[problem.id] || '');
  }, [problem.id]);

  // Load AI / Heuristic Analysis
  useEffect(() => {
    let isMounted = true;
    setLoadingAi(true);
    aiService.analyzeProblem(problem).then(res => {
      if (isMounted) {
        setAiAnalysis(res);
        setLoadingAi(false);
      }
    });
    return () => { isMounted = false; };
  }, [problem]);

  const handleSaveNote = () => {
    storageService.saveProblemNote(problem.id, studentNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Get related project solutions
  const existingSolutions = (allProjects || []).filter(p => problem.projectSolutionIds?.includes(p.id) || false);

  // Get related problems
  const relatedProblems = (allProblems || []).filter(p => problem.relatedProblemIds?.includes(p.id) || (p.domain === problem.domain && p.id !== problem.id)).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Back & Action Nav */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Explorer</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleBookmark(problem.id)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2 transition ${
              isBookmarked
                ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            <span>{isBookmarked ? 'Saved in Research List' : 'Bookmark Problem'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            {problem.code}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-100 text-slate-800">
            {problem.hackathonName} &bull; {problem.hackathonYear}
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
            {problem.domain}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200">
            Type: {problem.category}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200">
            Difficulty: {problem.difficulty}
          </span>
          {problem.verifiedSource && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Ministry Source</span>
            </span>
          )}
        </div>

        {/* Title & Ministry */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {problem.title}
          </h1>
          <p className="text-sm text-slate-600">
            Issued By: <span className="font-semibold text-slate-900">{problem.organization}</span>
            {problem.participantCount && (
              <span className="ml-3 text-slate-400">({problem.participantCount} registered teams)</span>
            )}
          </p>
        </div>

        {/* Official Source Link Bar */}
        {problem.officialSourceUrl && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="truncate">Official Archive Source: <code className="font-mono text-slate-700">{problem.officialSourceUrl}</code></span>
            <a
              href={problem.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 ml-4 shrink-0"
            >
              <span>Visit Official Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Dual Column Content: Left Explanation & Deliverables, Right Context & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simple Explanation Tab Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Simple Student Explanation</span>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLangTab('en')}
                  className={`px-3 py-1 rounded-lg transition ${
                    langTab === 'en' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLangTab('ta')}
                  className={`px-3 py-1 rounded-lg transition ${
                    langTab === 'ta' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  தமிழ் / Tanglish
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100/80">
              {langTab === 'en' ? (
                <p>{problem.simpleExplanationEn}</p>
              ) : (
                <div className="space-y-2">
                  <p className="font-sans">{problem.simpleExplanationTa}</p>
                  <span className="text-[11px] text-slate-400 block pt-1">
                    * Written in colloquial Tanglish so engineering students can quickly grasp the fundamental problem requirements.
                  </span>
                </div>
              )}
            </div>

            {/* Original Problem Statement Raw Text */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Original Government Problem Statement (Unedited)
              </h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed italic">
                "{problem.originalStatement}"
              </p>
            </div>
          </div>

          {/* Expected Deliverables & Evaluation Criteria */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Expected Deliverables & Jury Criteria</span>
            </h3>
            <ul className="space-y-2.5">
              {(problem.expectedDeliverables || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Winning Opportunity & How to Beat Previous Winners */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Winning Opportunity Angle: How to Stand Out</span>
            </div>
            <p className="text-xs text-amber-800">
              Jury evaluations favor teams that identify unaddressed edge cases from previous hackathon submissions:
            </p>
            <div className="space-y-2.5">
              {(problem.winningOpportunityAngles || []).map((angle, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200/70 text-xs text-slate-700 leading-relaxed shadow-xs flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-sm leading-none">&bull;</span>
                  <span>{angle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Projects / Solutions Addressing This Problem */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-blue-600" />
                  <span>Existing Solutions ({existingSolutions.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publicly submitted and verified projects addressing this problem statement
                </p>
              </div>

              {existingSolutions.length >= 2 && (
                <button
                  type="button"
                  onClick={onNavigateToCompare}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare These Solutions</span>
                </button>
              )}
            </div>

            {existingSolutions.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                No solutions currently indexed for this specific problem statement. Be the first team to publish a prototype!
              </div>
            ) : (
              <div className="space-y-4">
                {existingSolutions.map((sol) => {
                  const inCompare = compareProjectIds.includes(sol.id);
                  return (
                    <div
                      key={sol.id}
                      className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition space-y-4 bg-slate-50/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <VerificationBadge status={sol.verificationStatus} />
                            <span className="text-xs text-slate-500 font-medium">{sol.hackathonName} ({sol.hackathonYear})</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{sol.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">Team: {sol.teamName || 'Collegiate Finalists'}</p>
                        </div>

                        {/* Compare toggle */}
                        <button
                          type="button"
                          onClick={() => onToggleCompare(sol.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-lg border transition flex items-center gap-1 self-start ${
                            inCompare
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Scale className="w-3 h-3" />
                          <span>{inCompare ? 'In Compare Matrix' : '+ Add to Compare'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {sol.shortDescription}
                      </p>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                        <strong className="text-slate-900 block">Technical Approach:</strong>
                        <p className="text-slate-600">{sol.approach}</p>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {sol.technologies.map(t => (
                          <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/70 text-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* External Links */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60">
                        {sol.githubUrl && (
                          <a
                            href={sol.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub Code Repo</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        )}

                        {sol.liveUrl && (
                          <a
                            href={sol.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition"
                          >
                            <span>Live Prototype</span>
                            <ExternalLink className="w-3 h-3 text-blue-200" />
                          </a>
                        )}

                        {sol.demoVideoUrl && (
                          <a
                            href={sol.demoVideoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition"
                          >
                            <Video className="w-3.5 h-3.5 text-red-600" />
                            <span>Demo Video</span>
                          </a>
                        )}

                        {sol.presentationUrl && (
                          <a
                            href={sol.presentationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>Slide Deck</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Tech Stack, Scratchpad Notes, Related Problems */}
        <div className="space-y-6">
          
          {/* Suggested Tech Stack */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Suggested Tech Stack</span>
            </h3>
            <p className="text-xs text-slate-500">
              Recommended tools to meet jury technical criteria:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {problem.suggestedTechStack.map(tech => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Student Research Scratchpad */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>My Research Scratchpad</span>
              </h3>
              <span className="text-[11px] text-slate-400">Auto-saved locally</span>
            </div>
            <p className="text-xs text-slate-500">
              Record team brainstorming thoughts or notes on how you plan to tackle this challenge:
            </p>
            <textarea
              rows={4}
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              placeholder="e.g. Discuss with team: Can we use YOLOv8 nano on Jetson instead of cloud API? Need to check offline caching..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 bg-slate-50 font-sans"
            />
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{noteSaved ? 'Note Saved!' : 'Save Note'}</span>
              </button>
              {noteSaved && <span className="text-xs text-emerald-600 font-medium">Saved to My Saved tab</span>}
            </div>
          </div>

          {/* Related Problem Statements */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Related Hackathon Challenges</span>
            </h3>
            <p className="text-xs text-slate-500">
              Similar problem statements you can draw inspiration from:
            </p>
            <div className="space-y-2.5 pt-1">
              {relatedProblems.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => onSelectProblem(rp.id)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                      {rp.code}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate">{rp.hackathonName}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-blue-600">
                    {rp.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
