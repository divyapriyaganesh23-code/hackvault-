import { HackathonEvent, ProblemStatement, ProjectSolution, UserBookmark } from '../types';
import { INITIAL_HACKATHONS, INITIAL_PROBLEMS, INITIAL_PROJECTS } from '../data/seedData';

const STORAGE_KEYS = {
  PROBLEMS: 'hackvault_problems_v1',
  PROJECTS: 'hackvault_projects_v1',
  HACKATHONS: 'hackvault_hackathons_v1',
  BOOKMARKS: 'hackvault_bookmarks_v1',
  COMPARE_IDS: 'hackvault_compare_ids_v1',
  AI_CONFIG: 'hackvault_ai_config_v1'
};

export interface AIConfig {
  apiKey?: string;
  provider: 'built-in' | 'gemini';
  model?: string;
}

function sanitizeProblem(p: any): ProblemStatement {
  return {
    id: p?.id || 'prob-' + Math.random().toString(36).slice(2, 7),
    code: p?.code || 'HACK-001',
    title: p?.title || 'Untitled Problem Statement',
    organization: p?.organization || 'Open Organization',
    hackathonName: p?.hackathonName || 'National Hackathon',
    hackathonYear: typeof p?.hackathonYear === 'number' ? p.hackathonYear : 2024,
    domain: p?.domain || 'General',
    category: p?.category || 'Software',
    difficulty: p?.difficulty || 'Intermediate',
    originalStatement: p?.originalStatement || '',
    simpleExplanationEn: p?.simpleExplanationEn || '',
    simpleExplanationTa: p?.simpleExplanationTa || '',
    backgroundContext: p?.backgroundContext || '',
    expectedDeliverables: Array.isArray(p?.expectedDeliverables) ? p.expectedDeliverables : [],
    suggestedTechStack: Array.isArray(p?.suggestedTechStack) ? p.suggestedTechStack : [],
    winningOpportunityAngles: Array.isArray(p?.winningOpportunityAngles) ? p.winningOpportunityAngles : [],
    officialSourceUrl: p?.officialSourceUrl || '',
    verifiedSource: Boolean(p?.verifiedSource),
    participantCount: typeof p?.participantCount === 'number' ? p.participantCount : undefined,
    relatedProblemIds: Array.isArray(p?.relatedProblemIds) ? p.relatedProblemIds : [],
    projectSolutionIds: Array.isArray(p?.projectSolutionIds) ? p.projectSolutionIds : [],
    createdAt: p?.createdAt || new Date().toISOString()
  };
}

function sanitizeProject(p: any): ProjectSolution {
  return {
    id: p?.id || 'sol-' + Math.random().toString(36).slice(2, 7),
    problemId: p?.problemId || '',
    name: p?.name || 'Untitled Solution',
    shortDescription: p?.shortDescription || '',
    approach: p?.approach || '',
    hackathonName: p?.hackathonName || 'Hackathon',
    hackathonYear: typeof p?.hackathonYear === 'number' ? p.hackathonYear : 2024,
    teamName: p?.teamName,
    verificationStatus: p?.verificationStatus || 'Community Project',
    technologies: Array.isArray(p?.technologies) ? p.technologies : [],
    githubUrl: p?.githubUrl || '',
    liveUrl: p?.liveUrl,
    demoVideoUrl: p?.demoVideoUrl,
    presentationUrl: p?.presentationUrl,
    features: Array.isArray(p?.features) ? p.features : [],
    limitations: Array.isArray(p?.limitations) ? p.limitations : [],
    keyInnovations: Array.isArray(p?.keyInnovations) ? p.keyInnovations : [],
    isVerifiedLink: Boolean(p?.isVerifiedLink),
    lastCheckedDate: p?.lastCheckedDate || new Date().toISOString().split('T')[0]
  };
}

export const storageService = {
  getProblems(): ProblemStatement[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      if (!raw) {
        this.saveProblems(INITIAL_PROBLEMS);
        return INITIAL_PROBLEMS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeProblem);
      }
      this.saveProblems(INITIAL_PROBLEMS);
      return INITIAL_PROBLEMS;
    } catch {
      return INITIAL_PROBLEMS;
    }
  },

  saveProblems(problems: ProblemStatement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getProjects(): ProjectSolution[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!raw) {
        this.saveProjects(INITIAL_PROJECTS);
        return INITIAL_PROJECTS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeProject);
      }
      this.saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  saveProjects(projects: ProjectSolution[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getHackathons(): HackathonEvent[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HACKATHONS);
      if (!raw) {
        this.saveHackathons(INITIAL_HACKATHONS);
        return INITIAL_HACKATHONS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_HACKATHONS;
    } catch {
      return INITIAL_HACKATHONS;
    }
  },

  saveHackathons(hackathons: HackathonEvent[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(hackathons));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getBookmarks(): UserBookmark {
    const defaultBookmarks: UserBookmark = {
      problemIds: ['prob-sih-railway-01', 'prob-google-sign-05'],
      projectIds: ['sol-railguard-ai'],
      collections: [
        {
          id: 'col-1',
          name: 'SIH 2025 AI Shortlist',
          description: 'Top problems with edge computing and computer vision solutions',
          problemIds: ['prob-sih-railway-01', 'prob-sih-ayush-02'],
          createdAt: new Date().toISOString()
        }
      ],
      researchNotes: {
        'prob-sih-railway-01': 'Check previous solution RailGuard AI. We can improve it by adding acoustic vibration sensors for internal rail fractures that optical cameras miss!'
      }
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (!raw) {
        this.saveBookmarks(defaultBookmarks);
        return defaultBookmarks;
      }
      const parsed = JSON.parse(raw);
      return {
        problemIds: Array.isArray(parsed?.problemIds) ? parsed.problemIds : [],
        projectIds: Array.isArray(parsed?.projectIds) ? parsed.projectIds : [],
        collections: Array.isArray(parsed?.collections) ? parsed.collections : [],
        researchNotes: parsed?.researchNotes && typeof parsed.researchNotes === 'object' ? parsed.researchNotes : {}
      };
    } catch {
      return defaultBookmarks;
    }
  },

  saveBookmarks(bookmarks: UserBookmark): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  toggleBookmarkProblem(problemId: string): boolean {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.problemIds.includes(problemId);
    if (exists) {
      bookmarks.problemIds = bookmarks.problemIds.filter(id => id !== problemId);
    } else {
      bookmarks.problemIds.push(problemId);
    }
    this.saveBookmarks(bookmarks);
    return !exists;
  },

  toggleSaveProject(projectId: string): boolean {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.projectIds.includes(projectId);
    if (exists) {
      bookmarks.projectIds = bookmarks.projectIds.filter(id => id !== projectId);
    } else {
      bookmarks.projectIds.push(projectId);
    }
    this.saveBookmarks(bookmarks);
    return !exists;
  },

  saveProblemNote(problemId: string, note: string): void {
    const bookmarks = this.getBookmarks();
    bookmarks.researchNotes[problemId] = note;
    this.saveBookmarks(bookmarks);
  },

  createCollection(name: string, description: string, problemIds: string[] = []): void {
    const bookmarks = this.getBookmarks();
    bookmarks.collections.push({
      id: 'col-' + Date.now(),
      name,
      description,
      problemIds,
      createdAt: new Date().toISOString()
    });
    this.saveBookmarks(bookmarks);
  },

  deleteCollection(colId: string): void {
    const bookmarks = this.getBookmarks();
    bookmarks.collections = bookmarks.collections.filter(c => c.id !== colId);
    this.saveBookmarks(bookmarks);
  },

  getCompareProjectIds(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMPARE_IDS);
      if (!raw) return ['sol-railguard-ai', 'sol-trackvision-edge'];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : ['sol-railguard-ai', 'sol-trackvision-edge'];
    } catch {
      return ['sol-railguard-ai', 'sol-trackvision-edge'];
    }
  },

  saveCompareProjectIds(ids: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARE_IDS, JSON.stringify(ids));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  toggleCompareProject(projectId: string): boolean {
    const ids = this.getCompareProjectIds();
    const exists = ids.includes(projectId);
    let newIds: string[];
    if (exists) {
      newIds = ids.filter(id => id !== projectId);
    } else {
      if (ids.length >= 4) {
        newIds = [...ids.slice(1), projectId];
      } else {
        newIds = [...ids, projectId];
      }
    }
    this.saveCompareProjectIds(newIds);
    return !exists;
  },

  clearCompare(): void {
    this.saveCompareProjectIds([]);
  },

  getAIConfig(): AIConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AI_CONFIG);
      if (!raw) return { provider: 'built-in' };
      return JSON.parse(raw) || { provider: 'built-in' };
    } catch {
      return { provider: 'built-in' };
    }
  },

  saveAIConfig(config: AIConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AI_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  resetToFactoryData(): void {
    this.saveProblems(INITIAL_PROBLEMS);
    this.saveProjects(INITIAL_PROJECTS);
    this.saveHackathons(INITIAL_HACKATHONS);
    this.saveCompareProjectIds(['sol-railguard-ai', 'sol-trackvision-edge']);
  },

  exportAllData(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      hackathons: this.getHackathons(),
      problems: this.getProblems(),
      projects: this.getProjects(),
      bookmarks: this.getBookmarks()
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString: string): { success: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.problems)) this.saveProblems(data.problems.map(sanitizeProblem));
      if (Array.isArray(data.projects)) this.saveProjects(data.projects.map(sanitizeProject));
      if (Array.isArray(data.hackathons)) this.saveHackathons(data.hackathons);
      if (data.bookmarks) this.saveBookmarks(data.bookmarks);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Invalid JSON format' };
    }
  }
};
