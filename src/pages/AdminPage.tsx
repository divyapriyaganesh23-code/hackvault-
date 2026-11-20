import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldAlert,
  Layers,
  FolderGit2
} from 'lucide-react';
import { HackathonEvent, ProblemStatement, ProjectSolution } from '../types';
import { storageService } from '../services/storage';

interface Props {
  problems: ProblemStatement[];
  projects: ProjectSolution[];
  hackathons: HackathonEvent[];
  onDataChanged: () => void;
}

export const AdminPage: React.FC<Props> = ({
  problems,
  projects,
  hackathons,
  onDataChanged
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'problems' | 'projects' | 'hackathons' | 'json'>('problems');
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showAddProblemModal, setShowAddProblemModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // New Problem Form State
  const [newProbCode, setNewProbCode] = useState('');
  const [newProbTitle, setNewProbTitle] = useState('');
  const [newProbOrg, setNewProbOrg] = useState('');
  const [newProbHackathon, setNewProbHackathon] = useState('Smart India Hackathon 2024');
  const [newProbDomain, setNewProbDomain] = useState('Healthcare');
  const [newProbStatement, setNewProbStatement] = useState('');
  const [newProbSimpleEn, setNewProbSimpleEn] = useState('');
  const [newProbSimpleTa, setNewProbSimpleTa] = useState('');
  const [newProbSourceUrl, setNewProbSourceUrl] = useState('');

  // New Project Form State
  const [newProjName, setNewProjName] = useState('');
  const [newProjProblemId, setNewProjProblemId] = useState(problems[0]?.id || '');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjApproach, setNewProjApproach] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');
  const [newProjLive, setNewProjLive] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<any>('Winner - 1st Place');
  const [newProjTech, setNewProjTech] = useState('React, Python, OpenCV');

  const handleResetFactory = () => {
    if (window.confirm('Reset all problem statements and projects to factory seed data? Any custom items will be overwritten.')) {
      storageService.resetToFactoryData();
      onDataChanged();
      alert('Reset to verified seed data successfully!');
    }
  };

  const handleExportJSON = () => {
    const jsonStr = storageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HackVault-Database-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    if (!importJsonText.trim()) return;
    const res = storageService.importData(importJsonText);
    if (res.success) {
      setImportStatus('Database successfully updated from JSON!');
      onDataChanged();
      setImportJsonText('');
    } else {
      setImportStatus(`Import Error: ${res.error}`);
    }
  };

  const handleDeleteProblem = (id: string) => {
    if (window.confirm('Delete this problem statement?')) {
      const updated = problems.filter(p => p.id !== id);
      storageService.saveProblems(updated);
      onDataChanged();
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this solution record?')) {
      const updated = projects.filter(p => p.id !== id);
      storageService.saveProjects(updated);
      onDataChanged();
    }
  };

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProbCode.trim() || !newProbTitle.trim()) return;

    const newProblem: ProblemStatement = {
      id: 'prob-custom-' + Date.now(),
      code: newProbCode.trim(),
      title: newProbTitle.trim(),
      organization: newProbOrg.trim() || 'Government Agency',
      hackathonName: newProbHackathon,
      hackathonYear: 2024,
      domain: newProbDomain,
      category: 'Software',
      difficulty: 'Intermediate',
      originalStatement: newProbStatement.trim() || newProbTitle.trim(),
      simpleExplanationEn: newProbSimpleEn.trim() || newProbTitle.trim(),
      simpleExplanationTa: newProbSimpleTa.trim() || 'Indha problem statement-la core requirement...',
      backgroundContext: 'Curated hackathon challenge.',
      expectedDeliverables: ['Functional working prototype', 'GitHub source repository', 'Demonstration deck'],
      suggestedTechStack: ['React', 'Python', 'FastAPI'],
      winningOpportunityAngles: ['Include offline operation support and multi-lingual voice accessibility'],
      officialSourceUrl: newProbSourceUrl.trim() || 'https://sih.gov.in',
      verifiedSource: true,
      relatedProblemIds: [],
      projectSolutionIds: [],
      createdAt: new Date().toISOString()
    };

    storageService.saveProblems([newProblem, ...problems]);
    onDataChanged();
    setShowAddProblemModal(false);
    // Reset
    setNewProbCode('');
    setNewProbTitle('');
    setNewProbOrg('');
    setNewProbStatement('');
    setNewProbSimpleEn('');
    setNewProbSimpleTa('');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim() || !newProjGithub.trim()) return;

    const techArray = newProjTech.split(',').map(s => s.trim()).filter(Boolean);
    const newProj: ProjectSolution = {
      id: 'sol-custom-' + Date.now(),
      problemId: newProjProblemId,
      name: newProjName.trim(),
      shortDescription: newProjDesc.trim() || 'Hackathon prototype submission.',
      approach: newProjApproach.trim() || 'Engineered modular components.',
      hackathonName: 'Smart India Hackathon 2024',
      hackathonYear: 2024,
      teamName: 'Innovators Team',
      verificationStatus: newProjStatus,
      technologies: techArray.length ? techArray : ['React', 'Node.js'],
      githubUrl: newProjGithub.trim(),
      liveUrl: newProjLive.trim() || undefined,
      features: ['Real-time processing', 'Web portal interface'],
      limitations: ['Requires network connection'],
      keyInnovations: ['Low latency pipeline'],
      isVerifiedLink: true,
      lastCheckedDate: new Date().toISOString().split('T')[0]
    };

    // Also link to parent problem
    const updatedProblems = problems.map(p => {
      if (p.id === newProjProblemId) {
        return {
          ...p,
          projectSolutionIds: [...p.projectSolutionIds, newProj.id]
        };
      }
      return p;
    });

    storageService.saveProjects([newProj, ...projects]);
    storageService.saveProblems(updatedProblems);
    onDataChanged();
    setShowAddProjectModal(false);
    // Reset
    setNewProjName('');
    setNewProjGithub('');
    setNewProjLive('');
    setNewProjDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Admin Portal (Demo / Local Storage Mode):</strong>
          <span>
            Authentication is not configured in this demo version. All modifications, additions, and deletions are saved directly to your local browser repository. In a production environment with Supabase/Firebase credentials, these forms sync to the central PostgreSQL database.
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Database Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Curator Admin Panel
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage indexed hackathon editions, add problem statements, update GitHub repo links, and audit verification statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleResetFactory}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seed</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('problems')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeSubTab === 'problems' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Problem Statements ({problems.length})
        </button>
        <button
          onClick={() => setActiveSubTab('projects')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeSubTab === 'projects' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Solutions & Repos ({projects.length})
        </button>
        <button
          onClick={() => setActiveSubTab('hackathons')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeSubTab === 'hackathons' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Hackathons ({hackathons.length})
        </button>
        <button
          onClick={() => setActiveSubTab('json')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
            activeSubTab === 'json' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Backup & Restore
        </button>
      </div>

      {/* Problems Sub Tab */}
      {activeSubTab === 'problems' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Indexed Problem Statements</h3>
            <button
              onClick={() => setShowAddProblemModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Problem Statement</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="p-3.5">ID / Code</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Hackathon</th>
                  <th className="p-3.5">Domain</th>
                  <th className="p-3.5">Solutions</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {problems.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-blue-700">{p.code}</td>
                    <td className="p-3.5 font-semibold text-slate-900 max-w-xs truncate">{p.title}</td>
                    <td className="p-3.5">{p.hackathonName}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {p.domain}
                      </span>
                    </td>
                    <td className="p-3.5">{p.projectSolutionIds.length} projects</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteProblem(p.id)}
                        className="text-slate-400 hover:text-red-600 transition p-1"
                        title="Delete problem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Sub Tab */}
      {activeSubTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Indexed Solutions & Repositories</h3>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Solution Record</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="p-3.5">Project Name</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Hackathon</th>
                  <th className="p-3.5">GitHub URL</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {projects.map(proj => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{proj.name}</td>
                    <td className="p-3.5">{proj.verificationStatus}</td>
                    <td className="p-3.5">{proj.hackathonName} ({proj.hackathonYear})</td>
                    <td className="p-3.5">
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline max-w-[200px] truncate block">
                        {proj.githubUrl}
                      </a>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-slate-400 hover:text-red-600 transition p-1"
                        title="Delete solution"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hackathons Sub Tab */}
      {activeSubTab === 'hackathons' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Registered Hackathons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathons.map(h => (
              <div key={h.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">{h.name}</h4>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{h.year}</span>
                </div>
                <p className="text-xs text-slate-500">Organizer: {h.organizer}</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                  <a href={h.websiteUrl} target="_blank" rel="noreferrer">{h.websiteUrl}</a>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JSON Backup & Restore Tab */}
      {activeSubTab === 'json' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Direct Database JSON Import</h3>
          <p className="text-xs text-slate-500">
            Paste exported HackVault JSON data below to restore your curated problem statements and solutions.
          </p>
          <textarea
            rows={8}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='Paste JSON here... { "problems": [...], "projects": [...] }'
            className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleImportJSON}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import & Save to LocalStorage</span>
            </button>
            {importStatus && (
              <span className={`text-xs ${importStatus.includes('successfully') ? 'text-emerald-600 font-semibold' : 'text-red-600'}`}>
                {importStatus}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Problem Statement */}
      {showAddProblemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Problem Statement</h3>
              <button onClick={() => setShowAddProblemModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateProblem} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Problem Code (e.g. SIH-1599)</label>
                <input
                  type="text"
                  required
                  value={newProbCode}
                  onChange={e => setNewProbCode(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newProbTitle}
                  onChange={e => setNewProbTitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Organization / Ministry</label>
                <input
                  type="text"
                  value={newProbOrg}
                  onChange={e => setNewProbOrg(e.target.value)}
                  placeholder="e.g. Ministry of Environment"
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Hackathon</label>
                  <select
                    value={newProbHackathon}
                    onChange={e => setNewProbHackathon(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200"
                  >
                    {hackathons.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Domain</label>
                  <input
                    type="text"
                    value={newProbDomain}
                    onChange={e => setNewProbDomain(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Original Statement</label>
                <textarea
                  rows={2}
                  value={newProbStatement}
                  onChange={e => setNewProbStatement(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Simple Explanation (English)</label>
                <textarea
                  rows={2}
                  value={newProbSimpleEn}
                  onChange={e => setNewProbSimpleEn(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Simple Explanation (Tamil / Tanglish)</label>
                <textarea
                  rows={2}
                  value={newProbSimpleTa}
                  onChange={e => setNewProbSimpleTa(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Official Archive URL</label>
                <input
                  type="url"
                  value={newProbSourceUrl}
                  onChange={e => setNewProbSourceUrl(e.target.value)}
                  placeholder="https://sih.gov.in"
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddProblemModal(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Problem Statement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Solution Record */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Project Solution</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjName}
                  onChange={e => setNewProjName(e.target.value)}
                  placeholder="e.g. RailGuard AI"
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Associated Problem Statement</label>
                <select
                  value={newProjProblemId}
                  onChange={e => setNewProjProblemId(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                >
                  {problems.map(p => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Verification Status</label>
                <select
                  value={newProjStatus}
                  onChange={e => setNewProjStatus(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                >
                  <option value="Winner - 1st Place">Winner - 1st Place</option>
                  <option value="Winner - 2nd Place">Winner - 2nd Place</option>
                  <option value="Finalist">Finalist</option>
                  <option value="Verified Submission">Verified Submission</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">GitHub Repository URL (Working Public Repo)</label>
                <input
                  type="url"
                  required
                  value={newProjGithub}
                  onChange={e => setNewProjGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2 rounded-lg border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Live Prototype / Demo URL (Optional)</label>
                <input
                  type="url"
                  value={newProjLive}
                  onChange={e => setNewProjLive(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 rounded-lg border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={newProjTech}
                  onChange={e => setNewProjTech(e.target.value)}
                  placeholder="React, YOLOv8, FastAPI, OpenCV"
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Technical Approach</label>
                <textarea
                  rows={2}
                  value={newProjApproach}
                  onChange={e => setNewProjApproach(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Project Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
