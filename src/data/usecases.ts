export type RiskLevel = "Minimal" | "Limited" | "High" | "Prohibited";

export type UseCase = {
  id: string;
  title: string;
  prompt: string;
  description: string;
  riskLevel: RiskLevel;
  riskScore: number;
  summary: string;
  indicators: string[];
  recommendations: string[];
  watchouts: string[];
  tags: string[];
};

export const useCases: UseCase[] = [
  {
    id: "hiring-assistant",
    title: "AI hiring assistant",
    prompt: "AI tool for screening job applicants",
    description: "Screens, ranks, or recommends candidates during recruitment.",
    riskLevel: "High",
    riskScore: 84,
    summary:
      "Employment and worker-management systems are commonly treated as high-risk when they influence access to jobs or candidate evaluation.",
    indicators: ["Employment decisions", "Candidate ranking", "Automated screening"],
    recommendations: ["Bias and accuracy testing", "Human review workflow", "Candidate transparency notice"],
    watchouts: ["Automated rejection", "Unbalanced training data", "No appeal process"],
    tags: ["hiring", "recruitment", "employment", "candidate", "hr", "screening"],
  },
  {
    id: "customer-support",
    title: "Customer support chatbot",
    prompt: "Chatbot answering customer questions",
    description: "Automates customer conversations and support triage.",
    riskLevel: "Limited",
    riskScore: 38,
    summary:
      "Most customer support chatbots are lower-risk, but users should be clearly informed when they are interacting with AI.",
    indicators: ["Customer interaction", "AI disclosure", "Support automation"],
    recommendations: ["AI interaction disclosure", "Escalation to human support", "Conversation monitoring policy"],
    watchouts: ["Misleading users", "Unsafe advice", "No human fallback"],
    tags: ["chatbot", "support", "customer", "service", "assistant"],
  },
  {
    id: "credit-scoring",
    title: "AI credit scoring model",
    prompt: "AI model deciding credit eligibility",
    description: "Scores applicants or supports financial eligibility decisions.",
    riskLevel: "High",
    riskScore: 88,
    summary:
      "AI used to evaluate creditworthiness can materially affect access to essential private services and is likely to require strict controls.",
    indicators: ["Financial eligibility", "Creditworthiness", "Decision support"],
    recommendations: ["Documented risk controls", "Explainability review", "Human oversight procedure"],
    watchouts: ["Discriminatory variables", "Opaque denial reasons", "Model drift"],
    tags: ["credit", "loan", "banking", "finance", "eligibility", "scoring"],
  },
  {
    id: "medical-triage",
    title: "Medical triage AI",
    prompt: "AI assistant prioritizing patient cases",
    description: "Supports triage, diagnosis, or prioritization in healthcare settings.",
    riskLevel: "High",
    riskScore: 91,
    summary:
      "Healthcare AI that supports patient triage or clinical decisions may carry high-risk obligations and sector-specific safety expectations.",
    indicators: ["Healthcare setting", "Patient prioritization", "Clinical decision support"],
    recommendations: ["Clinical validation", "Safety monitoring", "Human override design"],
    watchouts: ["Incorrect urgency scoring", "Insufficient validation", "Unclear accountability"],
    tags: ["medical", "health", "triage", "patient", "diagnosis", "clinical"],
  },
  {
    id: "employee-monitoring",
    title: "Employee monitoring AI",
    prompt: "AI system monitoring employee performance",
    description: "Tracks productivity, behavior, sentiment, or performance at work.",
    riskLevel: "High",
    riskScore: 79,
    summary:
      "AI used in workplace monitoring can affect employment conditions and requires careful transparency, proportionality, and oversight controls.",
    indicators: ["Workplace monitoring", "Performance scoring", "Worker impact"],
    recommendations: ["Worker notice", "Necessity assessment", "Human governance process"],
    watchouts: ["Emotion inference", "Continuous surveillance", "Disciplinary automation"],
    tags: ["employee", "monitoring", "workplace", "productivity", "performance"],
  },
  {
    id: "biometric-identification",
    title: "Biometric identification",
    prompt: "AI facial recognition for identity checks",
    description: "Identifies or verifies people using biometric characteristics.",
    riskLevel: "Prohibited",
    riskScore: 96,
    summary:
      "Some biometric identification use cases are heavily restricted or prohibited depending on context, purpose, and deployment environment.",
    indicators: ["Biometric processing", "Identity recognition", "Sensitive context"],
    recommendations: ["Legal basis review", "Necessity test", "Strict access controls"],
    watchouts: ["Public-space identification", "Sensitive attribute inference", "Mass surveillance"],
    tags: ["biometric", "face", "facial", "recognition", "identity", "verification"],
  },
];
