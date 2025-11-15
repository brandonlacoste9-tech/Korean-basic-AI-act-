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
