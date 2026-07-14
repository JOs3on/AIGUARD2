export type DashboardRiskLevel = "High" | "Medium" | "Low";

export interface DashboardSummary {
  totalAssessed: number;
  high: number;
  medium: number;
  low: number;
  lastAssessment: string;
  reassessInDays: number;
}

export interface DashboardRisk {
  id: string;
  title: string;
  level: DashboardRiskLevel;
}

export interface DashboardUseCaseCard {
  id: string;
  title: string;
  department: string;
  level: DashboardRiskLevel;
  description: string;
}

export interface DashboardCompany {
  name: string;
  useCaseCount: number;
}

export const demoCompany: DashboardCompany = {
  name: "Acme Corporation",
  useCaseCount: 12,
};

export const demoSummary: DashboardSummary = {
  totalAssessed: 12,
  high: 1,
  medium: 3,
  low: 8,
  lastAssessment: "Apr 24, 2026",
  reassessInDays: 90,
};

export const demoTopRisks: DashboardRisk[] = [
  { id: "no-ai-policy", title: "No AI Policy", level: "High" },
  { id: "cv-screening", title: "CV Screening", level: "High" },
  { id: "sensitive-data", title: "Sensitive Data Usage", level: "Medium" },
];

export const demoUseCaseCards: DashboardUseCaseCard[] = [
  {
    id: "content-creation",
    title: "Content Creation",
    department: "Marketing",
    level: "Low",
    description: "Generates marketing copy and campaign assets using AI.",
  },
  {
    id: "chatbot",
    title: "Customer Support Chatbot",
    department: "Customer Support",
    level: "Low",
    description: "Automates customer conversations and support triage.",
  },
  {
    id: "cv-screening",
    title: "AI Hiring Assistant",
    department: "Human Resources",
    level: "High",
    description: "Screens, ranks, or recommends candidates during recruitment.",
  },
  {
    id: "credit-scoring",
    title: "AI Credit Scoring Model",
    department: "Finance",
    level: "Medium",
    description: "Scores applicants or supports financial eligibility decisions.",
  },
  {
    id: "medical-triage",
    title: "Medical Triage AI",
    department: "Healthcare",
    level: "Medium",
    description: "Supports triage, diagnosis, or prioritization in healthcare.",
  },
  {
    id: "employee-monitoring",
    title: "Employee Monitoring AI",
    department: "Operations",
    level: "Medium",
    description: "Tracks productivity, behavior, sentiment, or performance at work.",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    department: "Marketing",
    level: "Low",
    description: "Analyzes customer feedback and social media sentiment trends.",
  },
  {
    id: "document-summary",
    title: "Document Summarization",
    department: "Legal",
    level: "Low",
    description: "Summarizes long-form legal and compliance documents.",
  },
  {
    id: "inventory-forecast",
    title: "Inventory Forecasting",
    department: "Supply Chain",
    level: "Low",
    description: "Predicts demand and optimizes inventory levels.",
  },
  {
    id: "email-triage",
    title: "Email Triage Assistant",
    department: "Customer Support",
    level: "Low",
    description: "Categorizes and prioritizes incoming support emails.",
  },
  {
    id: "translation",
    title: "AI Translation Tool",
    department: "Operations",
    level: "Low",
    description: "Translates internal documents across multiple languages.",
  },
  {
    id: "code-review",
    title: "Code Review Assistant",
    department: "Engineering",
    level: "Low",
    description: "Reviews pull requests and suggests code improvements.",
  },
];

export type DemoSection =
  | "overview"
  | "assessment"
  | "use-cases"
  | "templates"
  | "reports"
  | "settings";

export const demoNavLinks: { id: DemoSection; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "assessment", label: "Assessment" },
  { id: "use-cases", label: "AI Use Cases" },
  { id: "templates", label: "Templates" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];
