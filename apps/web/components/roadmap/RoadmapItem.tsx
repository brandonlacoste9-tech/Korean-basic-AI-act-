import React, { useState } from 'react';
import { RoadmapItem as RoadmapItemType } from '../../data/roadmap';

interface RoadmapItemProps {
  item: RoadmapItemType;
  language?: 'ko' | 'en';
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ item, language = 'ko' }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Launched':
        return 'var(--color-success)';
      case 'In Progress':
        return 'var(--color-blue)';
      case 'Planned':
        return 'var(--color-yellow)';
      case 'Closed':
        return 'var(--color-gray-400)';
      default:
        return 'var(--color-gray-400)';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Feature':
        return 'var(--color-primary)';
      case 'Bug':
        return 'var(--color-error)';
      case 'Enhancement':
        return 'var(--color-yellow)';
      default:
        return 'var(--color-gray-400)';
    }
  };

  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '0.5rem' }}>
            {item.title[language]}
          </h3>
          {language === 'ko' && (
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
              {item.title.en}
            </p>
          )}
        </div>
        <button 
          className="btn" 
          style={{ 
            backgroundColor: getStatusColor(item.status),
            color: item.status === 'Planned' ? 'var(--color-black)' : 'white',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem'
          }}
        >
          {item.status}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span 
          className="badge" 
          style={{ backgroundColor: getTypeColor(item.type), color: 'white' }}
        >
          {item.type}
        </span>
        <span className="badge badge-primary">
          {item.workstream}
        </span>
        <span className="badge" style={{ backgroundColor: 'var(--color-gray-200)', color: 'var(--color-black)' }}>
          📅 {item.quarter}
        </span>
        {item.labels.map((label, index) => (
          <span 
            key={index} 
            className="badge" 
            style={{ backgroundColor: 'var(--color-gray-100)', color: 'var(--color-gray-700)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {expanded && (
        <div style={{ 
          marginTop: '1.5rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--color-gray-200)' 
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
            {language === 'ko' ? '상세 설명' : 'Description'}
          </h4>
          <p style={{ marginBottom: '1rem' }}>
            {item.description[language]}
          </p>
          {language === 'ko' && (
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '1rem' }}>
              {item.description.en}
            </p>
          )}

          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
            <div>
              <strong>{language === 'ko' ? '생성일' : 'Created'}:</strong>{' '}
              {new Date(item.createdAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')}
            </div>
            <div>
              <strong>{language === 'ko' ? '업데이트' : 'Updated'}:</strong>{' '}
              {new Date(item.updatedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')}
            </div>
          </div>

          {item.githubLink && (
            <div style={{ marginTop: '1rem' }}>
              <a 
                href={item.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                🔗 GitHub {language === 'ko' ? '에서 보기' : 'View'}
              </a>
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '1rem', textAlign: 'right' }}>
        {expanded ? '▲ ' : '▼ '}{language === 'ko' ? '세부정보 보기' : 'View details'}
      </div>
    </div>
  );
};

export default RoadmapItem;
