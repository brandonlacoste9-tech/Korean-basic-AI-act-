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
