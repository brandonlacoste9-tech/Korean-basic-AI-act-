'use client';

export interface HeaderProps {
  language?: 'ko' | 'en';
  onLanguageChange?: (lang: 'ko' | 'en') => void;
  onMenuClick?: () => void;
}

export default function Header({ 
  language = 'ko', 
  onLanguageChange,
  onMenuClick 
}: HeaderProps) {
  return (
    <header className="gov-header sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-white hover:bg-obangsaek-blue-600 transition-colors"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Title */}
        <div className="flex-1 lg:ml-0 ml-4">
          <h2 className="text-lg font-semibold korean-text">
            {language === 'ko' ? '한국 AI 기본법 규정 준수' : 'Korean AI Basic Act Compliance'}
          </h2>
        </div>

        {/* Language toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLanguageChange?.('ko')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${language === 'ko' 
                ? 'bg-white text-obangsaek-blue' 
                : 'bg-obangsaek-blue-600 text-white hover:bg-obangsaek-blue-700'
              }
            `}
          >
            한국어
          </button>
          <button
            onClick={() => onLanguageChange?.('en')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${language === 'en' 
                ? 'bg-white text-obangsaek-blue' 
                : 'bg-obangsaek-blue-600 text-white hover:bg-obangsaek-blue-700'
              }
            `}
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
}
