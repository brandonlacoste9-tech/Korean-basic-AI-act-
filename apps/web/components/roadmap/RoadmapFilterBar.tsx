import React from 'react';

interface RoadmapFilterBarProps {
  selectedType: string;
  selectedWorkstream: string;
  selectedStatus: string;
  onTypeChange: (type: string) => void;
  onWorkstreamChange: (workstream: string) => void;
  onStatusChange: (status: string) => void;
  workstreams: string[];
  statuses: readonly string[];
  language?: 'ko' | 'en';
}

const RoadmapFilterBar: React.FC<RoadmapFilterBarProps> = ({
  selectedType,
  selectedWorkstream,
  selectedStatus,
  onTypeChange,
  onWorkstreamChange,
  onStatusChange,
  workstreams,
  statuses,
  language = 'ko'
}) => {
  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>
        {language === 'ko' ? '필터' : 'Filters'}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            {language === 'ko' ? '유형' : 'Type'}
          </label>
          <select 
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-gray-300)',
              backgroundColor: 'white',
              fontFamily: 'var(--font-korean)',
              fontSize: '0.875rem'
            }}
          >
            <option value="">{language === 'ko' ? '전체' : 'All'}</option>
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Enhancement">Enhancement</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            {language === 'ko' ? '작업 스트림' : 'Workstream'}
          </label>
          <select 
            value={selectedWorkstream}
            onChange={(e) => onWorkstreamChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-gray-300)',
              backgroundColor: 'white',
              fontFamily: 'var(--font-korean)',
              fontSize: '0.875rem'
            }}
          >
            <option value="">{language === 'ko' ? '전체' : 'All'}</option>
            {workstreams.map((ws) => (
              <option key={ws} value={ws}>{ws}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            {language === 'ko' ? '상태' : 'Status'}
          </label>
          <select 
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-gray-300)',
              backgroundColor: 'white',
              fontFamily: 'var(--font-korean)',
              fontSize: '0.875rem'
            }}
          >
            <option value="">{language === 'ko' ? '전체' : 'All'}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RoadmapFilterBar;
