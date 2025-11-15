import React from 'react';
import RoadmapItem from './RoadmapItem';
import { RoadmapItem as RoadmapItemType } from '../../../data/roadmap';

interface RoadmapQuarterProps {
  quarter: string;
  items: RoadmapItemType[];
  language?: 'ko' | 'en';
}

const RoadmapQuarter: React.FC<RoadmapQuarterProps> = ({ quarter, items, language = 'ko' }) => {
  const getQuarterTitle = (q: string) => {
    if (language === 'ko') {
      if (q === 'Future') return '미래 계획';
      return q;
    }
    return q;
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '3px solid var(--color-primary)'
      }}>
        <h2 style={{ marginBottom: 0 }}>
          {getQuarterTitle(quarter)}
        </h2>
        <span 
          className="badge" 
          style={{ 
            marginLeft: '1rem',
            backgroundColor: 'var(--color-gray-200)', 
            color: 'var(--color-black)' 
          }}
        >
          {items.length} {language === 'ko' ? '항목' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--color-gray-500)' }}>
            {language === 'ko' 
              ? '이 분기에 계획된 항목이 없습니다.' 
              : 'No items planned for this quarter.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <RoadmapItem key={item.id} item={item} language={language} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapQuarter;
