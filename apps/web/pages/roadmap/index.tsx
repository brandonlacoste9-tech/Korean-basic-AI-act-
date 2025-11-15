import React, { useState, useMemo } from 'react';
import RoadmapQuarter from './components/RoadmapQuarter';
import RoadmapFilterBar from './components/RoadmapFilterBar';
import roadmap, { sampleRoadmapItems, RoadmapItem } from '../../data/roadmap';

const RoadmapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedWorkstream, setSelectedWorkstream] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const tabs = [
    { id: 'all', label: { ko: '전체 보기', en: 'All' } },
    { id: 'Q3-2025', label: { ko: 'Q3-2025', en: 'Q3-2025' } },
    { id: 'Q4-2025', label: { ko: 'Q4-2025', en: 'Q4-2025' } },
    { id: 'Q1-2026', label: { ko: 'Q1-2026', en: 'Q1-2026' } },
    { id: 'Q2-2026', label: { ko: 'Q2-2026', en: 'Q2-2026' } },
    { id: 'Future', label: { ko: '미래 계획', en: 'Future' } }
  ];

  const filteredItems = useMemo(() => {
    return sampleRoadmapItems.filter((item: RoadmapItem) => {
      // Quarter filter
      if (activeTab !== 'all' && item.quarter !== activeTab) return false;
      
      // Type filter
      if (selectedType && item.type !== selectedType) return false;
      
      // Workstream filter
      if (selectedWorkstream && item.workstream !== selectedWorkstream) return false;
      
      // Status filter
      if (selectedStatus && item.status !== selectedStatus) return false;
      
      return true;
    });
  }, [activeTab, selectedType, selectedWorkstream, selectedStatus]);

  const groupedItems = useMemo(() => {
    const grouped: { [key: string]: RoadmapItem[] } = {
      'Q3-2025': [],
      'Q4-2025': [],
      'Q1-2026': [],
      'Q2-2026': [],
      'Future': []
    };

    filteredItems.forEach((item) => {
      if (grouped[item.quarter]) {
        grouped[item.quarter].push(item);
      }
    });

    return grouped;
  }, [filteredItems]);

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>
          🗺️ 로드맵
        </h1>
        <p className="en-text" style={{ fontSize: '1rem', color: 'var(--color-gray-600)' }}>
          Roadmap
        </p>
        <p style={{ marginTop: '1rem' }}>
          AI 기본법 준수 시스템의 개발 계획 및 진행 상황을 확인하세요.
        </p>
        <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          View development plans and progress for the AI Basic Act compliance system.
        </p>
      </div>

      {/* Tabs */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          borderBottom: '2px solid var(--color-gray-200)',
          overflowX: 'auto'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn"
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--color-black)',
                borderRadius: 0,
                fontWeight: activeTab === tab.id ? '700' : '500',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-secondary)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <RoadmapFilterBar
        selectedType={selectedType}
        selectedWorkstream={selectedWorkstream}
        selectedStatus={selectedStatus}
        onTypeChange={setSelectedType}
        onWorkstreamChange={setSelectedWorkstream}
        onStatusChange={setSelectedStatus}
        workstreams={roadmap.workstreams}
        statuses={roadmap.statuses}
        language={language}
      />

      {/* Summary Stats */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'var(--color-gray-50)' }}>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>
              {filteredItems.length}
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {language === 'ko' ? '총 항목' : 'Total Items'}
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-success)' }}>
              {filteredItems.filter(i => i.status === 'Launched').length}
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {language === 'ko' ? '완료' : 'Launched'}
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-blue)' }}>
              {filteredItems.filter(i => i.status === 'In Progress').length}
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {language === 'ko' ? '진행 중' : 'In Progress'}
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-yellow)' }}>
              {filteredItems.filter(i => i.status === 'Planned').length}
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {language === 'ko' ? '계획됨' : 'Planned'}
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Items by Quarter */}
      {activeTab === 'all' ? (
        Object.keys(groupedItems).map((quarter) => (
          groupedItems[quarter].length > 0 && (
            <RoadmapQuarter
              key={quarter}
              quarter={quarter}
              items={groupedItems[quarter]}
              language={language}
            />
          )
        ))
      ) : (
        <RoadmapQuarter
          quarter={activeTab}
          items={groupedItems[activeTab] || []}
          language={language}
        />
      )}
    </div>
  );
};

export default RoadmapPage;
