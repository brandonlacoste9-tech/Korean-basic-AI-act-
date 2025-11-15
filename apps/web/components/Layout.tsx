import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const isActive = (path: string) => {
    return router.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      {/* Vertical Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            🇰🇷 AI 기본법
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Korean AI Basic Act
          </p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="sidebar-nav-item">
              <Link 
                href="/roadmap" 
                className={`sidebar-nav-link ${isActive('/roadmap') ? 'active' : ''}`}
              >
                🗺️ 로드맵 (Roadmap)
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link 
                href="/trust/roadmap" 
                className={`sidebar-nav-link ${isActive('/trust') ? 'active' : ''}`}
              >
                🔒 신뢰센터 (Trust Center)
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link 
                href="/law" 
                className={`sidebar-nav-link ${isActive('/law') ? 'active' : ''}`}
              >
                📜 법령 (Law)
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link 
                href="/api-explorer" 
                className={`sidebar-nav-link ${isActive('/api-explorer') ? 'active' : ''}`}
              >
                🔌 API Explorer
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <button 
            onClick={toggleLanguage}
            className="btn"
            style={{ 
              width: '100%', 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            {language === 'ko' ? '🇺🇸 English' : '🇰🇷 한국어'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
