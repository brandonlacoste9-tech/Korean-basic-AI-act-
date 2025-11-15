// Korean AI Compliance Roadmap Data Model
// Version 1.0 - Foundry Sovereign Roadmap
/**
 * Roadmap Data Model for Korean AI Basic Act Compliance Platform
 * 
 * This file defines the official roadmap structure with TypeScript types
 * Ready for API and UI consumption
 */

export type RoadmapStatus = 
  | 'planned'
  | 'in-progress'
  | 'completed'
  | 'blocked'
  | 'deferred';

export type WorkstreamType = 
  | 'foundation'
  | 'compliance'
  | 'trust'
  | 'legal'
  | 'api'
  | 'ui'
  | 'infrastructure';

export type RoadmapLabel = 
  | 'critical'
  | 'high-priority'
  | 'enhancement'
  | 'documentation'
  | 'security'
  | 'performance';

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
  status: RoadmapStatus;
  workstream: WorkstreamType;
  labels: RoadmapLabel[];
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  assignees?: string[];
  githubIssue?: string;
  githubPR?: string;
  dependencies?: string[]; // IDs of other roadmap items
}

export interface RoadmapQuarter {
  quarter: string; // e.g., "Q3-2025"
  year: number;
  quarterNumber: 1 | 2 | 3 | 4;
  startDate: string;
  endDate: string;
  items: RoadmapItem[];
  summary: {
    ko: string;
    en: string;
  };
}

export interface Workstream {
  id: WorkstreamType;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  color: string; // Obangsaek color
  icon?: string;
}

// Obangsaek-based workstream definitions
export const WORKSTREAMS: Workstream[] = [
  {
    id: 'foundation',
    name: { ko: '기반', en: 'Foundation' },
    description: { 
      ko: '핵심 인프라 및 아키텍처 설정',
      en: 'Core infrastructure and architecture setup'
    },
    color: '#003478', // Blue - East/Wood
  },
  {
    id: 'compliance',
    name: { ko: '규정 준수', en: 'Compliance' },
    description: { 
      ko: 'AI 기본법 규정 준수 기능',
      en: 'AI Basic Act compliance features'
    },
    color: '#CE2029', // Red - South/Fire
  },
  {
    id: 'trust',
    name: { ko: '신뢰', en: 'Trust' },
    description: { 
      ko: '투명성 및 신뢰 센터',
      en: 'Transparency and trust center'
    },
    color: '#FFD700', // Yellow/Gold - Center/Earth
  },
  {
    id: 'legal',
    name: { ko: '법률', en: 'Legal' },
    description: { 
      ko: '법률 텍스트 및 해석',
      en: 'Legal text and interpretation'
    },
    color: '#FFFFFF', // White - West/Metal
  },
  {
    id: 'api',
    name: { ko: 'API', en: 'API' },
    description: { 
      ko: '백엔드 API 및 통합',
      en: 'Backend API and integrations'
    },
    color: '#000000', // Black - North/Water
  },
  {
    id: 'ui',
    name: { ko: 'UI', en: 'UI' },
    description: { 
      ko: '사용자 인터페이스 및 경험',
      en: 'User interface and experience'
    },
    color: '#003478', // Blue
  },
  {
    id: 'infrastructure',
    name: { ko: '인프라', en: 'Infrastructure' },
    description: { 
      ko: '배포 및 운영',
      en: 'Deployment and operations'
    },
    color: '#000000', // Black
  },
];

// Initial roadmap data structure
export const ROADMAP_DATA: RoadmapQuarter[] = [
  {
    quarter: 'Q4-2025',
    year: 2025,
    quarterNumber: 4,
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    summary: {
      ko: 'MVP 출시 및 초기 규정 준수 기능',
      en: 'MVP launch and initial compliance features'
    },
    items: [
      {
        id: 'pr-0',
        title: {
          ko: '로드맵 기반 (PR 0)',
          en: 'Roadmap Foundation (PR 0)'
        },
        description: {
          ko: '오방색 팔레트, 폰트, 레이아웃, 사이드바, 스켈레톤',
          en: 'Obangsaek palette, fonts, layout, sidebar, skeleton'
        },
        status: 'in-progress',
        workstream: 'foundation',
        labels: ['critical', 'high-priority'],
        startDate: '2025-11-15',
        targetDate: '2025-11-20',
      },
      {
        id: 'pr-1',
        title: {
          ko: '로드맵 데이터 모델 (PR 1)',
          en: 'Roadmap Data Model (PR 1)'
        },
        description: {
          ko: '전체 구조화된 로드맵 JSON 및 TypeScript 타입',
          en: 'Full structured roadmap JSON and TypeScript types'
        },
        status: 'planned',
        workstream: 'foundation',
        labels: ['critical'],
        dependencies: ['pr-0'],
      },
      {
        id: 'pr-2',
        title: {
          ko: '로드맵 UI (한국어 우선) (PR 2)',
          en: 'Roadmap UI (Korean-first) (PR 2)'
        },
        description: {
          ko: '탭, 필터, 로드맵 카드, 분기 섹션, 오방색 강조',
          en: 'Tabs, filters, roadmap cards, quarter sections, Obangsaek accents'
        },
        status: 'planned',
        workstream: 'ui',
        labels: ['critical', 'high-priority'],
        dependencies: ['pr-1'],
      },
      {
        id: 'pr-3',
        title: {
          ko: '신뢰 센터 (로드맵 에디션) (PR 3)',
          en: 'Trust Center (Roadmap Edition) (PR 3)'
        },
        description: {
          ko: '최근 커밋, PR, 배포 피드, 로드맵 진행 시각화',
          en: 'Recent commits, PRs, deployment feed, roadmap progress visual'
        },
        status: 'planned',
        workstream: 'trust',
        labels: ['high-priority'],
        dependencies: ['pr-2'],
      },
      {
        id: 'pr-4',
        title: {
          ko: '/law 스캐폴드 (한국어 + 영어) (PR 4)',
          en: '/law Scaffold (Korean + English) (PR 4)'
        },
        description: {
          ko: '개요, 정의, 요구사항, 집행, 타임라인 섹션이 있는 2탭 페이지',
          en: 'Two-tab page with Overview, Definitions, Requirements, Enforcement, Timeline sections'
        },
        status: 'planned',
        workstream: 'legal',
        labels: ['high-priority', 'documentation'],
        dependencies: ['pr-0'],
      },
      {
        id: 'pr-5',
        title: {
          ko: 'API 스텁 (PR 5)',
          en: 'API Stubs (PR 5)'
        },
        description: {
          ko: '규정 준수 및 위험 백엔드 스텁 구현',
          en: 'Implement backend stubs for compliance & risk'
        },
        status: 'planned',
        workstream: 'api',
        labels: ['critical'],
        dependencies: ['pr-0'],
      },
      {
        id: 'pr-6',
        title: {
          ko: '대시보드 프레임워크 (PR 6)',
          en: 'Dashboard Framework (PR 6)'
        },
        description: {
          ko: '깔끔한 한국어 우선 대시보드 스켈레톤',
          en: 'Clean Korean-first dashboard skeleton'
        },
        status: 'planned',
        workstream: 'ui',
        labels: ['high-priority'],
        dependencies: ['pr-0'],
      },
      {
        id: 'pr-7',
        title: {
          ko: '브랜딩 패키지 (PR 7)',
          en: 'Branding Package (PR 7)'
        },
        description: {
          ko: '한국 정부 스타일 엠블럼 + 파비콘 플레이스홀더',
          en: 'Korean government-style emblem + favicon placeholder'
        },
        status: 'planned',
        workstream: 'ui',
        labels: ['enhancement'],
        dependencies: ['pr-0'],
      },
    ],
  },
  {
    quarter: 'Q1-2026',
    year: 2026,
    quarterNumber: 1,
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    summary: {
      ko: '전체 규정 준수 기능 및 통합',
      en: 'Full compliance features and integrations'
    },
    items: [],
  },
];

// Helper functions
export function getWorkstreamById(id: WorkstreamType): Workstream | undefined {
  return WORKSTREAMS.find(w => w.id === id);
}

export function getItemsByStatus(status: RoadmapStatus): RoadmapItem[] {
  return ROADMAP_DATA.flatMap(q => q.items).filter(item => item.status === status);
}

export function getItemsByWorkstream(workstream: WorkstreamType): RoadmapItem[] {
  return ROADMAP_DATA.flatMap(q => q.items).filter(item => item.workstream === workstream);
}

export function getCurrentQuarter(): RoadmapQuarter | undefined {
  const now = new Date();
  return ROADMAP_DATA.find(q => {
    const start = new Date(q.startDate);
    const end = new Date(q.endDate);
    return now >= start && now <= end;
  });
}

export function getAllItems(): RoadmapItem[] {
  return ROADMAP_DATA.flatMap(q => q.items);
}
