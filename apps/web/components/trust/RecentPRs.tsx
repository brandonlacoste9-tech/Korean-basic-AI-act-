import React from 'react';

interface RecentPRsProps {
  language?: 'ko' | 'en';
}

const RecentPRs: React.FC<RecentPRsProps> = ({ language = 'ko' }) => {
  const pullRequests = [
    {
      id: 'pr-123',
      title: { 
        ko: '준수 체크리스트 UI 개선', 
        en: 'Improve compliance checklist UI' 
      },
      author: 'brandon-dev',
      status: 'merged',
      timestamp: '2025-11-15T08:00:00Z',
      additions: 145,
      deletions: 32
    },
    {
      id: 'pr-122',
      title: { 
        ko: '위험 평가 알고리즘 업데이트', 
        en: 'Update risk assessment algorithm' 
      },
      author: 'ai-team',
      status: 'open',
      timestamp: '2025-11-14T16:30:00Z',
      additions: 234,
      deletions: 89
    },
    {
      id: 'pr-121',
      title: { 
        ko: '한국어 번역 추가', 
        en: 'Add Korean translations' 
      },
      author: 'localization-team',
      status: 'merged',
      timestamp: '2025-11-13T11:00:00Z',
      additions: 456,
      deletions: 12
    },
    {
      id: 'pr-120',
      title: { 
        ko: 'API 문서 자동화', 
        en: 'Automate API documentation' 
      },
      author: 'docs-bot',
      status: 'merged',
      timestamp: '2025-11-12T09:45:00Z',
      additions: 78,
      deletions: 15
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'merged':
        return {
          text: { ko: '병합됨', en: 'Merged' },
          color: 'var(--color-purple)',
          icon: '✓'
        };
      case 'open':
        return {
          text: { ko: '진행 중', en: 'Open' },
          color: 'var(--color-success)',
          icon: '●'
        };
      case 'closed':
        return {
          text: { ko: '닫힘', en: 'Closed' },
          color: 'var(--color-gray-500)',
          icon: '✕'
        };
      default:
        return {
          text: { ko: '알 수 없음', en: 'Unknown' },
          color: 'var(--color-gray-400)',
          icon: '?'
        };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (language === 'ko') {
      if (diffDays > 0) return `${diffDays}일 전`;
      if (diffHours > 0) return `${diffHours}시간 전`;
      return '방금';
    } else {
      if (diffDays > 0) return `${diffDays}d ago`;
      if (diffHours > 0) return `${diffHours}h ago`;
      return 'just now';
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>
        🔀 {language === 'ko' ? 'PR 활동' : 'PR Activity'}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {pullRequests.map((pr) => {
          const statusBadge = getStatusBadge(pr.status);
          return (
            <div 
              key={pr.id}
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-gray-200)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {pr.title[language]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>
                    by {pr.author} • {formatTimestamp(pr.timestamp)}
                  </div>
                </div>
                <span 
                  className="badge" 
                  style={{ 
                    backgroundColor: statusBadge.color === 'var(--color-purple)' ? '#8b5cf6' : statusBadge.color,
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                >
                  {statusBadge.icon} {statusBadge.text[language]}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>
                <span style={{ color: 'var(--color-success)' }}>
                  +{pr.additions}
                </span>
                <span style={{ color: 'var(--color-error)' }}>
                  -{pr.deletions}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          {language === 'ko' ? 'GitHub에서 더 보기' : 'View More on GitHub'}
        </a>
      </div>
    </div>
  );
};

export default RecentPRs;
