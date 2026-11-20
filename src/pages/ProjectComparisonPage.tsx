import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Trash2, 
  Plus, 
  ExternalLink, 
  Github, 
  Video, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  X
} from 'lucide-react';
import { ProjectSolution, ProblemStatement } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { aiService, ComparisonAnalysisResult } from '../services/aiService';

interface Props {
  allProjects: ProjectSolution[];
  allProblems: ProblemStatement[];
  compareProjectIds: string[];
  onRemoveFromCompare: (projectId: string) => void;
  onClearCompare: () => void;
  onAddProjectToCompare: (projectId: string) => void;
  onNavigateToSolutions: () => void;
}

export const ProjectComparisonPage: React.FC<Props> = ({
  allProjects,
  allProblems,
  compareProjectIds,
  onRemoveFromCompare,
  onClearCompare,
  onAddProjectToCompare,
  onNavigateToSolutions
}) => {
  const [selectedProjects, setSelectedProjects] = useState<ProjectSolution[]>([]);
  const [analysis, setAnalysis] = useState<ComparisonAnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    const list = allProjects.filter(p => compareProjectIds.includes(p.id));
    setSelectedProjects(list);
  }, [allProjects, compareProjectIds]);

  useEffect(() => {
    if (selectedProjects.length >= 2) {
      let isMounted = true;
      setLoadingAnalysis(true);
      aiService.compareProjects(selectedProjects).then(res => {
        if (isMounted) {
          setAnalysis(res);
          setLoadingAnalysis(false);
        }
      });
      return () => { isMounted = false; };
    } else {
      setAnalysis(null);
    }
  }, [selectedProjects]);

  const handleExportMarkdown = () => {
    if (selectedProjects.length === 0) return;
    const text = `# HackVault - Project Comparison Matrix
Exported at: ${new Date().toLocaleString()}

${selectedProjects.map((p, idx) => `
## Project ${idx + 1}: ${p.name}
- Status: ${p.verificationStatus}
- Hackathon: ${p.hackathonName} (${p.hackathonYear})
- Team: ${p.teamName || 'Public Finalists'}
- GitHub: ${p.githubUrl}
- Live Demo: ${p.liveUrl || 'N/A'}
- Tech Stack: ${p.technologies.join(', ')}
- Approach: ${p.approach}
- Documented Limitations: ${p.limitations.join('; ')}
`).join('\n---\n')}

${analysis ? `
## AI & Heuristic Comparative Evaluation
- Executive Summary: ${analysis.executiveSummary}
- Technical Divergence: ${analysis.technicalDivergence}
- Deployment Feasibility Winner: ${analysis.feasibilityScoreWinner}
- Winning Strategy: ${analysis.winningStrategyRecommendation}
` : ''}
`;

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HackVault-Comparison-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  // Remaining projects that can be added
  const remainingProjects = allProjects.filter(p => !compareProjectIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Architectural Evaluation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Project Comparison Matrix
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Compare features, technologies, problem-solving approaches, and documented limitations across multiple hackathon submissions.
          </p>
        </div>

        {selectedProjects.length > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportMarkdown}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exportNotice ? 'Exported MD!' : 'Export Matrix (.md)'}</span>
            </button>

            <button
              onClick={onClearCompare}
              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {selectedProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <Scale className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Your comparison matrix is empty</h3>
            <p className="text-xs text-slate-500">
              Select 2 or more projects from the Problem Details or Solutions Explorer to evaluate how different teams tackled the same challenge.
            </p>
          </div>
          <button
            onClick={onNavigateToSolutions}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition"
          >
            Browse Projects to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Quick Add Project Bar */}
          {remainingProjects.length > 0 && selectedProjects.length < 4 && (
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-700">Add another project to this matrix:</span>
              <div className="flex flex-wrap items-center gap-2">
                {remainingProjects.slice(0, 4).map(p => (
                  <button
                    key={p.id}
                    onClick={() => onAddProjectToCompare(p.id)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-medium transition flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{p.name.slice(0, 24)}...</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI / Heuristic Analysis Banner (Clearly marked!) */}
          {analysis && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Synthesized Solution Analysis</span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200">
                  {analysis.isAIGenerated ? 'Live Gemini AI' : 'Verified Heuristic Engine'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-4 bg-white/80 rounded-xl border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 block font-semibold">Core Divergence:</strong>
                  <p>{analysis.technicalDivergence}</p>
                </div>

                <div className="p-4 bg-white/80 rounded-xl border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 block font-semibold">Feasibility Assessment:</strong>
                  <p>{analysis.feasibilityScoreWinner}</p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Winning Strategy for New Teams:</span>
                  <span>{analysis.winningStrategyRecommendation}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * Note: The comparison below contains verified factual parameters extracted from public repositories, alongside analytical synthesis.
              </p>
            </div>
          )}

          {/* Side-by-Side Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Header: Project Names */}
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-48">
                    Criteria
                  </th>
                  {selectedProjects.map((p) => (
                    <th key={p.id} className="p-4 align-top border-l border-slate-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <VerificationBadge status={p.verificationStatus} />
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="text-slate-400 hover:text-red-600 transition"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {p.hackathonName} ({p.hackathonYear})
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-100 text-xs">
                
                {/* Team */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Team Name</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 text-slate-700 border-l border-slate-100">
                      {p.teamName || 'Collegiate Finalists'}
                    </td>
                  ))}
                </tr>

                {/* Problem-Solving Approach */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Problem-Solving Approach</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 text-slate-700 border-l border-slate-100 leading-relaxed">
                      {p.approach}
                    </td>
                  ))}
                </tr>

                {/* Technologies */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Technologies Used</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies.map(t => (
                          <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Key Features</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100">
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                        {p.features.map((f, idx) => (
                          <li key={idx} className="leading-snug">{f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Documented Limitations */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Public Limitations</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100">
                      {p.limitations && p.limitations.length > 0 ? (
                        <ul className="space-y-1 text-amber-800 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                          {p.limitations.map((lim, idx) => (
                            <li key={idx} className="leading-snug">&bull; {lim}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-slate-400">None explicitly stated</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Key Innovations */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Unique Differentiators</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100 text-slate-700">
                      {p.keyInnovations && p.keyInnovations.length > 0 ? (
                        <ul className="space-y-1 list-disc list-inside text-emerald-800">
                          {p.keyInnovations.map((inno, idx) => (
                            <li key={idx} className="leading-snug">{inno}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-slate-400">Standard implementation</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Available Implementation (Links) */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">Public Deliverables</td>
                  {selectedProjects.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100">
                      <div className="flex flex-col gap-2">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium"
                          >
                            <Github className="w-3.5 h-3.5 text-slate-700" />
                            <span>GitHub Source Code</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        )}

                        {p.liveUrl ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:underline font-medium"
                          >
                            <span>Live Deployed Web App</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500" />
                          </a>
                        ) : (
                          <span className="text-slate-400">No public live web link</span>
                        )}

                        {p.demoVideoUrl && (
                          <a
                            href={p.demoVideoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:underline font-medium"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Recorded Demo Video</span>
                          </a>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
