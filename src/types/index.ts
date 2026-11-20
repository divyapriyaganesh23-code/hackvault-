export type HackathonCategory = 'Software' | 'Hardware' | 'Both';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type VerificationStatus = 
  | 'Winner - 1st Place'
  | 'Winner - 2nd Place'
  | 'Winner - 3rd Place'
  | 'Finalist'
  | 'Verified Submission'
  | 'Community Project';

export interface ProjectSolution {
  id: string;
  problemId: string;
  name: string;
  shortDescription: string;
  approach: string;
  hackathonName: string;
  hackathonYear: number;
  teamName?: string;
  verificationStatus: VerificationStatus;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  presentationUrl?: string;
  features: string[];
  limitations: string[];
  keyInnovations: string[];
  isVerifiedLink: boolean;
  lastCheckedDate: string;
}

export interface ProblemStatement {
  id: string;
  code: string; // e.g. SIH-1422, KAV-08
  title: string;
  organization: string; // e.g. Ministry of Railways, ISRO, AICTE
  hackathonName: string; // e.g. Smart India Hackathon
  hackathonYear: number;
  domain: string; // e.g. Healthcare, Agriculture, AI/ML
  category: HackathonCategory;
  difficulty: DifficultyLevel;
  originalStatement: string;
  simpleExplanationEn: string;
  simpleExplanationTa: string; // Tamil / Tanglish simplified breakdown
  backgroundContext: string;
  expectedDeliverables: string[];
  suggestedTechStack: string[];
  winningOpportunityAngles: string[]; // How to improve upon previous submissions
  officialSourceUrl: string;
  verifiedSource: boolean;
  participantCount?: number;
  relatedProblemIds: string[];
  projectSolutionIds: string[];
  createdAt: string;
}

export interface HackathonEvent {
  id: string;
  name: string;
  edition: string;
  year: number;
  organizer: string;
  websiteUrl: string;
  logoBadge?: string;
  totalProblemsCount: number;
  featured: boolean;
  domains: string[];
}

export interface UserBookmark {
  problemIds: string[];
  projectIds: string[];
  collections: {
    id: string;
    name: string;
    description: string;
    problemIds: string[];
    createdAt: string;
  }[];
  researchNotes: Record<string, string>; // problemId -> student note
}

export interface FilterState {
  searchQuery: string;
  year: string;
  domain: string;
  hackathon: string;
  category: string;
  difficulty: string;
}

export interface ComparisonItem {
  project: ProjectSolution;
  problem?: ProblemStatement;
}
