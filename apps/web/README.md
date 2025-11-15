# Korean AI Basic Act Compliance Roadmap System

A comprehensive Korean-first web application for tracking and managing AI Basic Act compliance roadmap, built with Next.js and TypeScript.

## 🎨 Design System

### FoundryAI + BeeHive Hybrid Style

This application follows a government-style layout with Korean-first UI design principles.

#### Obangsaek Color Palette (Korean Traditional Colors)

- **Blue** (`#003478`) - Primary color, government authority
- **Red** (`#CE2029`) - Secondary color, important actions
- **Black** (`#000000`) - Text and borders
- **White** (`#FFFFFF`) - Background
- **Yellow** (`#FFD700`) - Accent color, warnings

#### Typography

- **Korean**: Noto Sans KR (400, 500, 700, 900)
- **English**: Inter / IBM Plex Sans (fallback)

## 🚀 Features

### 1. Roadmap System (`/roadmap`)

- **Quarterly View**: Q3-2025, Q4-2025, Q1-2026, Q2-2026, Future
- **Filtering**: By type (Feature/Bug/Enhancement), workstream, and status
- **Status Tracking**: Planned, In Progress, Launched, Closed
- **Expandable Cards**: Detailed information for each roadmap item
- **Progress Statistics**: Visual summary of completion rates

### 2. Trust Center (`/trust/roadmap`)

- **Live System Status**: Real-time monitoring of all services
- **Deployment Feed**: Recent production and staging deployments
- **PR Activity**: GitHub pull request tracking
- **Commit History**: Latest 20 commits with details
- **Roadmap Progress**: Visual progress bar with completion metrics

### 3. Law Page (`/law`)

- **Bilingual Content**: Complete Korean and English versions
- **Structured Layout**: Articles organized by chapters
- **Implementation Schedule**: Timeline for law enforcement
- **Compliance Requirements**: Detailed obligations for AI providers

### 4. API Explorer (`/api-explorer`)

- **Interactive Testing**: Click to test any API endpoint
- **Live Responses**: Real-time API response display
- **Documentation**: Complete API reference with examples

## 📁 Project Structure

```
apps/web/
├── components/
│   ├── Layout.tsx              # Main layout with sidebar
│   ├── roadmap/
│   │   ├── RoadmapItem.tsx     # Individual roadmap card
│   │   ├── RoadmapQuarter.tsx  # Quarter section display
│   │   └── RoadmapFilterBar.tsx # Filter controls
│   └── trust/
│       ├── DeploymentFeed.tsx   # Deployment history
│       ├── RecentPRs.tsx        # PR activity feed
│       └── LiveStatus.tsx       # System status indicators
├── data/
│   └── roadmap.ts              # Roadmap data model
├── pages/
│   ├── _app.tsx                # App wrapper
│   ├── index.tsx               # Homepage
│   ├── roadmap/
│   │   └── index.tsx           # Roadmap page
│   ├── trust/
│   │   └── roadmap.tsx         # Trust Center page
│   ├── law/
│   │   └── index.tsx           # Law page
│   ├── api-explorer.tsx        # API Explorer page
│   └── api/
│       ├── roadmap/
│       │   ├── index.ts        # GET all roadmap data
│       │   ├── [quarter].ts    # GET quarter-specific data
│       │   └── sync.ts         # POST GitHub sync (stub)
│       ├── compliance/
│       │   └── check.ts        # GET compliance score
│       └── risk/
│           └── score.ts        # GET risk assessment
├── styles/
│   └── globals.css             # Global styles and theme
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠️ Installation
# Korean AI Basic Act Compliance Platform - Web Application

한국 AI 기본법 규정 준수 플랫폼 - 웹 애플리케이션

## Overview | 개요

This is the web frontend for the Korean AI Basic Act Compliance Platform. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring a Korean-first government-style UI design using traditional Obangsaek (오방색) color palette.

## Tech Stack | 기술 스택

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Obangsaek Palette
- **Fonts**: Noto Sans KR (primary) + Inter (secondary)
- **Design System**: Korean Government-style UI components

## Obangsaek Color Palette | 오방색 팔레트

The platform uses traditional Korean five colors (오방색):

- **Blue (청색)** `#003478` - East, Wood, Spring
- **Red (적색)** `#CE2029` - South, Fire, Summer  
- **Yellow (황색)** `#FFD700` - Center, Earth
- **White (백색)** `#FFFFFF` - West, Metal, Autumn
- **Black (흑색)** `#000000` - North, Water, Winter

## Getting Started | 시작하기

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Available Routes

- `/` - Homepage
- `/roadmap` - Roadmap system
- `/trust/roadmap` - Trust Center
- `/law` - Law information
- `/api-explorer` - API documentation and testing

## 🔌 API Endpoints

### GET `/api/roadmap`
Returns complete roadmap data for all quarters.

**Response:**
```json
{
  "success": true,
  "data": {
    "quarters": { ... },
    "workstreams": [...],
    "statuses": [...],
    "totalItems": 3
  }
}
```

### GET `/api/roadmap/[quarter]`
Returns roadmap items for a specific quarter.

**Parameters:**
- `quarter`: Q3-2025, Q4-2025, Q1-2026, Q2-2026, or Future

**Response:**
```json
{
  "success": true,
  "quarter": "Q3-2025",
  "data": [...],
  "count": 1
}
```

### POST `/api/roadmap/sync`
GitHub sync endpoint (stub - disabled in initial release).

**Response:**
```json
{
  "synced": false,
  "message": "GitHub sync disabled in initial release.",
  "timestamp": "2025-11-15T12:00:00Z"
}
```

### GET `/api/compliance/check`
Check AI Basic Act compliance status.

**Response:**
```json
{
  "compliance_score": 72,
  "issues": [
    {
      "id": "A-120",
      "severity": "medium",
      "message": "Dataset provenance incomplete",
      "message_ko": "데이터셋 출처 정보 불완전"
    }
  ],
  "status": "ok",
  "timestamp": "2025-11-15T12:00:00Z"
}
```

### GET `/api/risk/score`
Assess AI system risk level.

**Response:**
```json
{
  "risk_level": "moderate",
  "confidence": 0.62,
  "factors": [
    "model transparency",
    "training dataset clarity"
  ],
  "factors_ko": [
    "모델 투명성",
    "학습 데이터셋 명확성"
  ],
  "timestamp": "2025-11-15T12:00:00Z"
}
```

## 🌍 Internationalization

The application supports Korean (default) and English:
- Korean content is always displayed first
- English translations appear below Korean text
- Language toggle available in sidebar
- All API responses include both Korean and English fields

## 🎯 Design Principles

1. **Korean-First**: All primary content in Korean, English as secondary
2. **Government Style**: Professional, authoritative layout
3. **Accessibility**: Clear hierarchy, readable fonts, good contrast
4. **Consistency**: Uniform spacing, colors, and typography
5. **Transparency**: Open data, clear status indicators

## 📊 Data Model

### RoadmapItem Interface

```typescript
interface RoadmapItem {
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
```

## 🔒 Security

- No external API calls or secrets required
- All data is static or stubbed
- CSP-friendly (no inline scripts)
- CORS headers properly configured
- Input validation on all API endpoints

## 📝 License

See LICENSE file in repository root.

## 👥 Contributing

This is a demonstration project for Korean AI Basic Act compliance tracking. Contributions welcome following Korean-first design principles.

## 🔗 Related Links

- [Korean AI Basic Act (Official)](https://www.law.go.kr)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure | 프로젝트 구조

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Korean-first setup
│   ├── page.tsx           # Home page
│   ├── roadmap/           # Roadmap page (PR 2)
│   ├── trust/             # Trust Center (PR 3)
│   ├── law/               # Law page (PR 4)
│   ├── dashboard/         # Dashboard (PR 6)
│   ├── compliance/        # Compliance checker (PR 5)
│   └── api/               # API documentation (PR 5)
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   ├── Header.tsx     # Header with language toggle
│   │   ├── Button.tsx     # Button component
│   │   ├── Card.tsx       # Card component
│   │   ├── Badge.tsx      # Badge/status component
│   │   └── index.ts       # Component exports
│   └── AppLayout.tsx      # Main application layout
├── data/
│   └── roadmap.ts         # Roadmap data model and types
├── styles/
│   └── obangsaek.css     # Obangsaek color system
└── public/                # Static assets
```

## Features | 주요 기능

### Implemented in PR 0 (Foundation)

- ✅ Monorepo structure with `/apps/web`
- ✅ Obangsaek color palette and CSS variables
- ✅ Korean-first typography (Noto Sans KR + Inter)
- ✅ Sidebar navigation with all routes
- ✅ Responsive header with language toggle
- ✅ Government-style UI components (Card, Button, Badge)
- ✅ Roadmap data model and TypeScript types
- ✅ Layout skeleton with footer
- ✅ All navigation pages with placeholders

### Coming in Future PRs

- **PR 1**: Full roadmap data model
- **PR 2**: Roadmap UI with filters and tabs
- **PR 3**: Trust Center with GitHub activity
- **PR 4**: Law page with Korean/English content
- **PR 5**: API stubs and endpoints
- **PR 6**: Dashboard framework
- **PR 7**: Branding package (emblem + favicon)

## Design Principles | 디자인 원칙

1. **Korean-First**: Korean language and culture take priority
2. **Government Style**: Clean, professional, trustworthy aesthetic
3. **Accessibility**: WCAG 2.1 compliant
4. **Obangsaek Integration**: Traditional colors with semantic meaning
5. **Responsive**: Mobile-first, works on all devices
6. **Typography**: Optimized for Korean text readability

## Contributing | 기여하기

This is part of the Korean AI Basic Act Compliance Platform. Follow the 7-PR sequence as defined in the project roadmap.

## License | 라이선스

See LICENSE file in the root directory.

---

**Built with ❤️ using Obangsaek (오방색) | Version 0.1.0**
