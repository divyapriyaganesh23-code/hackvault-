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

// Storage helpers
export const storageService = {
  getProblems(): ProblemStatement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
    if (!raw) {
      this.saveProblems(INITIAL_PROBLEMS);
      return INITIAL_PROBLEMS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PROBLEMS;
    }
  },

  saveProblems(problems: ProblemStatement[]): void {
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
  },

  getProjects(): ProjectSolution[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      this.saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  saveProjects(projects: ProjectSolution[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getHackathons(): HackathonEvent[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HACKATHONS);
    if (!raw) {
      this.saveHackathons(INITIAL_HACKATHONS);
      return INITIAL_HACKATHONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_HACKATHONS;
    }
  },

  saveHackathons(hackathons: HackathonEvent[]): void {
    localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(hackathons));
  },

  getBookmarks(): UserBookmark {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) {
      const initial: UserBookmark = {
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
      this.saveBookmarks(initial);
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return { problemIds: [], projectIds: [], collections: [], researchNotes: {} };
    }
  },

  saveBookmarks(bookmarks: UserBookmark): void {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
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

  // Comparison list
  getCompareProjectIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPARE_IDS);
    if (!raw) return ['sol-railguard-ai', 'sol-trackvision-edge'];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCompareProjectIds(ids: string[]): void {
    localStorage.setItem(STORAGE_KEYS.COMPARE_IDS, JSON.stringify(ids));
  },

  toggleCompareProject(projectId: string): boolean {
    const ids = this.getCompareProjectIds();
    const exists = ids.includes(projectId);
    let newIds: string[];
    if (exists) {
      newIds = ids.filter(id => id !== projectId);
    } else {
      if (ids.length >= 4) {
        // limit comparison to 4 items at a time
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

  // AI Configuration
  getAIConfig(): AIConfig {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_CONFIG);
    if (!raw) return { provider: 'built-in' };
    try {
      return JSON.parse(raw);
    } catch {
      return { provider: 'built-in' };
    }
  },

  saveAIConfig(config: AIConfig): void {
    localStorage.setItem(STORAGE_KEYS.AI_CONFIG, JSON.stringify(config));
  },

  // Admin and Data Reset
  resetToFactoryData(): void {
    this.saveProblems(INITIAL_PROBLEMS);
    this.saveProjects(INITIAL_PROJECTS);
    this.saveHackathons(INITIAL_HACKATHONS);
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
      if (Array.isArray(data.problems)) this.saveProblems(data.problems);
      if (Array.isArray(data.projects)) this.saveProjects(data.projects);
      if (Array.isArray(data.hackathons)) this.saveHackathons(data.hackathons);
      if (data.bookmarks) this.saveBookmarks(data.bookmarks);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Invalid JSON format' };
    }
  }
};
