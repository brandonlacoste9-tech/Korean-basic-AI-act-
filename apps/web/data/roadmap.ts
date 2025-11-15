// Korean AI Compliance Roadmap Data Model
// Version 1.0 - Foundry Sovereign Roadmap

export interface RoadmapItem {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  workstream: string;
  quarter: string;
  status: 'Planned' | 'In Progress' | 'Launched' | 'Closed';
  type: 'Feature' | 'Bug' | 'Enhancement';
  labels: string[];
  githubLink?: string;
  createdAt: string;
  updatedAt: string;
}

export const roadmap = {
  quarters: {
    "Q3-2025": [] as RoadmapItem[],
    "Q4-2025": [] as RoadmapItem[],
    "Q1-2026": [] as RoadmapItem[],
    "Q2-2026": [] as RoadmapItem[],
    "Future": [] as RoadmapItem[]
  },
  workstreams: [
    "CLI User Experience",
    "Community & Automation",
    "Engineering Excellence",
    "Extensibility",
    "Model Quality",
    "Context Engineering",
    "Reasoning"
  ],
  statuses: ["Planned", "In Progress", "Launched", "Closed"] as const
};

// Sample roadmap items for demonstration
export const sampleRoadmapItems: RoadmapItem[] = [
  {
    id: "roadmap-001",
    title: {
      ko: "한국어 AI 준수 대시보드",
      en: "Korean AI Compliance Dashboard"
    },
    description: {
      ko: "AI 기본법 준수를 위한 통합 대시보드 구현",
      en: "Integrated dashboard for AI Basic Act compliance"
    },
    workstream: "CLI User Experience",
    quarter: "Q3-2025",
    status: "In Progress",
    type: "Feature",
    labels: ["compliance", "dashboard", "korean"],
    createdAt: "2025-01-15T09:00:00Z",
    updatedAt: "2025-11-15T12:00:00Z"
  },
  {
    id: "roadmap-002",
    title: {
      ko: "자동화된 위험 평가 도구",
      en: "Automated Risk Assessment Tool"
    },
    description: {
      ko: "AI 시스템의 위험 수준을 자동으로 평가하는 도구",
      en: "Tool for automatically assessing AI system risk levels"
    },
    workstream: "Model Quality",
    quarter: "Q4-2025",
    status: "Planned",
    type: "Feature",
    labels: ["risk-assessment", "automation"],
    createdAt: "2025-02-01T09:00:00Z",
    updatedAt: "2025-11-10T14:00:00Z"
  },
  {
    id: "roadmap-003",
    title: {
      ko: "API 문서 자동 생성",
      en: "Automated API Documentation"
    },
    description: {
      ko: "준수 API에 대한 자동 문서 생성 시스템",
      en: "Automated documentation generation for compliance APIs"
    },
    workstream: "Engineering Excellence",
    quarter: "Q1-2026",
    status: "Planned",
    type: "Enhancement",
    labels: ["documentation", "api"],
    createdAt: "2025-03-01T09:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  }
];

// Initialize quarters with sample items
roadmap.quarters["Q3-2025"] = sampleRoadmapItems.filter(item => item.quarter === "Q3-2025");
roadmap.quarters["Q4-2025"] = sampleRoadmapItems.filter(item => item.quarter === "Q4-2025");
roadmap.quarters["Q1-2026"] = sampleRoadmapItems.filter(item => item.quarter === "Q1-2026");
roadmap.quarters["Q2-2026"] = sampleRoadmapItems.filter(item => item.quarter === "Q2-2026");
roadmap.quarters["Future"] = sampleRoadmapItems.filter(item => item.quarter === "Future");

export default roadmap;
