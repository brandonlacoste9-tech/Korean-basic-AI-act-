'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarNavItem {
  id: string;
  label: {
    ko: string;
    en: string;
  };
  href: string;
  icon?: React.ReactNode;
  color?: string;
}

export const NAV_ITEMS: SidebarNavItem[] = [
  {
    id: 'roadmap',
    label: { ko: '로드맵', en: 'Roadmap' },
    href: '/roadmap',
    color: 'var(--obangsaek-blue)',
  },
  {
    id: 'trust',
    label: { ko: '신뢰 센터', en: 'Trust Center' },
    href: '/trust',
    color: 'var(--obangsaek-yellow)',
  },
  {
    id: 'law',
    label: { ko: '법률', en: 'Law' },
    href: '/law',
    color: 'var(--obangsaek-white)',
  },
  {
    id: 'dashboard',
    label: { ko: '대시보드', en: 'Dashboard' },
    href: '/dashboard',
    color: 'var(--obangsaek-blue)',
  },
  {
    id: 'compliance',
    label: { ko: '규정 준수', en: 'Compliance' },
    href: '/compliance',
    color: 'var(--obangsaek-red)',
  },
  {
    id: 'api',
    label: { ko: 'API', en: 'API' },
    href: '/api',
    color: 'var(--obangsaek-black)',
  },
];

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  language?: 'ko' | 'en';
}

export default function Sidebar({ 
  isOpen = true, 
  onClose,
  language = 'ko'
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header with accent bar */}
        <div className="accent-bar-top">
          <div className="p-6">
            <Link href="/">
              <h1 className="text-xl font-bold text-obangsaek-blue korean-text">
                {language === 'ko' ? 'AI 기본법' : 'AI Basic Act'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'ko' ? '한국 규정 준수 플랫폼' : 'Korean Compliance Platform'}
              </p>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${active 
                    ? 'bg-obangsaek-blue text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-obangsaek-blue'
                  }
                `}
                onClick={onClose}
              >
                {item.icon && (
                  <span className="mr-3">{item.icon}</span>
                )}
                <span className={language === 'ko' ? 'korean-text' : 'english-text'}>
                  {item.label[language]}
                </span>
                {active && (
                  <span 
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p className="korean-text">
              {language === 'ko' ? '버전 0.1.0' : 'Version 0.1.0'}
            </p>
            <p className="mt-1">
              {language === 'ko' ? '© 2025 AI 기본법 플랫폼' : '© 2025 AI Basic Act Platform'}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
