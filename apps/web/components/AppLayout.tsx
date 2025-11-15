'use client';

import { useState } from 'react';
import { Sidebar, Header } from './ui';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        language={language}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header 
          language={language}
          onLanguageChange={setLanguage}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="korean-text">
                  © 2025 한국 AI 기본법 플랫폼
                </span>
                <span className="text-gray-400">|</span>
                <span>Version 0.1.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-obangsaek-blue" title="동 (East)"></div>
                  <div className="w-2 h-2 rounded-full bg-obangsaek-red" title="남 (South)"></div>
                  <div className="w-2 h-2 rounded-full bg-obangsaek-yellow" title="중앙 (Center)"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-200 border border-gray-300" title="서 (West)"></div>
                  <div className="w-2 h-2 rounded-full bg-obangsaek-black" title="북 (North)"></div>
                </div>
                <span className="text-xs text-gray-500 korean-text">오방색</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
