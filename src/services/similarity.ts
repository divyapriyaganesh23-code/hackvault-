import { ProblemStatement, ProjectSolution } from '../types';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
  'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she',
  'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'development', 'system', 'platform', 'using', 'based', 'create', 'build'
]);

export interface SimilarityMatch {
  problem: ProblemStatement;
  score: number; // 0 to 100
  reasons: string[];
  sharedKeywords: string[];
  relatedSolutions: ProjectSolution[];
}

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

export function findSimilarProblems(
  targetProblem: ProblemStatement | { title: string; originalStatement: string; domain?: string; suggestedTechStack?: string[] },
  allProblems: ProblemStatement[],
  allProjects: ProjectSolution[],
  excludeId?: string
): SimilarityMatch[] {
  const targetText = `${targetProblem.title} ${targetProblem.originalStatement} ${targetProblem.domain || ''}`;
  const targetWords = extractKeywords(targetText);
  const targetWordSet = new Set(targetWords);

  const results: SimilarityMatch[] = [];

  for (const p of allProblems) {
    if (excludeId && p.id === excludeId) continue;

    const candidateText = `${p.title} ${p.originalStatement} ${p.domain}`;
    const candidateWords = extractKeywords(candidateText);

    // Count shared keywords
    const shared: string[] = [];
    for (const w of candidateWords) {
      if (targetWordSet.has(w) && !shared.includes(w)) {
        shared.push(w);
      }
    }

    const reasons: string[] = [];
    let score = 0;

    // Domain match bonus
    if (targetProblem.domain && p.domain.toLowerCase() === targetProblem.domain.toLowerCase()) {
      score += 35;
      reasons.push(`Direct domain overlap in ${p.domain}`);
    } else if (
      targetProblem.domain &&
      (p.domain.toLowerCase().includes(targetProblem.domain.toLowerCase()) ||
       targetProblem.domain.toLowerCase().includes(p.domain.toLowerCase()))
    ) {
      score += 20;
      reasons.push(`Related industry domain (${p.domain})`);
    }

    // Keyword overlap
    if (shared.length > 0) {
      const keywordScore = Math.min(45, shared.length * 6);
      score += keywordScore;
      reasons.push(`Shares key thematic terms: ${shared.slice(0, 4).join(', ')}`);
    }

    // Tech stack overlap
    if (targetProblem.suggestedTechStack && targetProblem.suggestedTechStack.length > 0) {
      const sharedTech = p.suggestedTechStack.filter(t =>
        targetProblem.suggestedTechStack!.some(st => st.toLowerCase() === t.toLowerCase())
      );
      if (sharedTech.length > 0) {
        score += Math.min(20, sharedTech.length * 5);
        reasons.push(`Common implementation stack: ${sharedTech.join(', ')}`);
      }
    }

    // Bound score
    const finalScore = Math.min(98, Math.max(15, score));

    // Get related verified solutions
    const relatedSolutions = allProjects.filter(sol => p.projectSolutionIds.includes(sol.id));

    if (finalScore >= 30 || shared.length >= 2) {
      results.push({
        problem: p,
        score: finalScore,
        reasons,
        sharedKeywords: shared,
        relatedSolutions
      });
    }
  }

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
}
