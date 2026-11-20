import { ProblemStatement, ProjectSolution } from '../types';
import { storageService } from './storage';

export interface AIAnalysisResult {
  summaryEn: string;
  summaryTanglish: string;
  recommendedTech: string[];
  architectureOverview: string;
  differentiatorIdeas: string[];
  potentialPitfalls: string[];
  isAIGenerated: boolean;
  modelUsed: string;
}

export interface ComparisonAnalysisResult {
  executiveSummary: string;
  technicalDivergence: string;
  feasibilityScoreWinner: string;
  scalabilityAssessment: string;
  winningStrategyRecommendation: string;
  isAIGenerated: boolean;
}

export const aiService = {
  async analyzeProblem(problem: ProblemStatement): Promise<AIAnalysisResult> {
    const config = storageService.getAIConfig();

    if (config.provider === 'gemini' && config.apiKey) {
      try {
        const prompt = `You are a hackathon jury mentor and senior architect. Analyze this hackathon problem statement:
Title: ${problem.title}
Domain: ${problem.domain}
Original Statement: ${problem.originalStatement}

Provide a JSON response with:
{
  "summaryEn": "concise 2-sentence plain English breakdown",
  "summaryTanglish": "simple Tanglish explanation for South Indian engineering students",
  "recommendedTech": ["tech1", "tech2", "tech3", "tech4"],
  "architectureOverview": "3-sentence high level architecture",
  "differentiatorIdeas": ["idea1", "idea2", "idea3"],
  "potentialPitfalls": ["pitfall1", "pitfall2"]
}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return {
              summaryEn: parsed.summaryEn || problem.simpleExplanationEn,
              summaryTanglish: parsed.summaryTanglish || problem.simpleExplanationTa,
              recommendedTech: parsed.recommendedTech || problem.suggestedTechStack,
              architectureOverview: parsed.architectureOverview || 'Modular edge/cloud decoupled architecture with real-time telemetry streaming.',
              differentiatorIdeas: parsed.differentiatorIdeas || problem.winningOpportunityAngles,
              potentialPitfalls: parsed.potentialPitfalls || ['Underestimating field network latency', 'Hardware sensor calibration drift'],
              isAIGenerated: true,
              modelUsed: 'Google Gemini 1.5 Flash'
            };
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', err);
      }
    }

    // Heuristic / Built-in Intelligence fallback
    return {
      summaryEn: problem.simpleExplanationEn,
      summaryTanglish: problem.simpleExplanationTa,
      recommendedTech: problem.suggestedTechStack,
      architectureOverview: `Decoupled multi-tier system: Edge capture / client sensor layer passing telemetry via REST/WebSocket to an asynchronous processing backend with an interactive dashboard for field stakeholders.`,
      differentiatorIdeas: problem.winningOpportunityAngles,
      potentialPitfalls: [
        'Over-focusing on UI while neglecting real-world hardware/network offline edge cases',
        'Failing to quantify actual cost savings or metric improvement for the evaluation jury'
      ],
      isAIGenerated: false,
      modelUsed: 'HackVault Built-in Heuristic Engine (Deterministic)'
    };
  },

  async compareProjects(projects: ProjectSolution[]): Promise<ComparisonAnalysisResult> {
    const config = storageService.getAIConfig();

    if (config.provider === 'gemini' && config.apiKey && projects.length >= 2) {
      try {
        const prompt = `Compare these hackathon project implementations side-by-side:
${projects.map((p, idx) => `
Project ${idx + 1}: ${p.name} (${p.verificationStatus})
Tech: ${p.technologies.join(', ')}
Approach: ${p.approach}
Limitations: ${p.limitations.join('; ')}
`).join('\n')}

Provide a JSON response:
{
  "executiveSummary": "2-3 sentences contrasting their primary philosophical approaches",
  "technicalDivergence": "key architectural differences between the stacks",
  "feasibilityScoreWinner": "which one is more practical for real deployment and why",
  "scalabilityAssessment": "how both handle scale or low-resource field conditions",
  "winningStrategyRecommendation": "what a new student team should combine from both to build a superior winning prototype"
}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return {
              ...parsed,
              isAIGenerated: true
            };
          }
        }
      } catch (err) {
        console.warn('Gemini compare failed, falling back:', err);
      }
    }

    // Heuristic comparative synthesis
    const names = projects.map(p => p.name).join(' vs ');
    const allTechs = Array.from(new Set(projects.flatMap(p => p.technologies)));
    const winner = projects.find(p => p.verificationStatus.includes('1st')) || projects[0];

    return {
      executiveSummary: `Comparative synthesis between ${names}: Both projects address the problem but diverge in deployment topology. ${projects[0].name} leans towards ${projects[0].technologies.slice(0, 3).join('/')} for specialized edge performance, while alternate approaches favor broader accessibility and lower component cost.`,
      technicalDivergence: `Key divergence lies in hardware dependency and model quantization: High-tier teams implement quantized edge pipelines (TensorRT/TFLite) for on-device inference, whereas secondary submissions often rely on cloud API round-trips which fail in low-connectivity settings.`,
      feasibilityScoreWinner: `${winner.name} demonstrates superior deployment feasibility because its architecture explicitly provides offline caching and localized sensor verification.`,
      scalabilityAssessment: `Enterprise adoption requires addressing the documented limitations: namely sensor dust/weather degradation and automated calibration without manual engineer intervention.`,
      winningStrategyRecommendation: `To build a 1st place winning project: combine the high-speed edge inference of ${projects[0].name} with the low-cost vernacular accessibility of ${projects[1]?.name || 'community prototypes'}, while introducing automated self-diagnostic telemetry.`,
      isAIGenerated: false
    };
  }
};
