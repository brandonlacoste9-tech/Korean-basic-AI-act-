import React from 'react';

interface DeploymentFeedProps {
  language?: 'ko' | 'en';
}

const DeploymentFeed: React.FC<DeploymentFeedProps> = ({ language = 'ko' }) => {
  const deployments = [
    {
      id: 'deploy-001',
      title: { ko: '준수 대시보드 v1.2.0', en: 'Compliance Dashboard v1.2.0' },
      status: 'success',
      timestamp: '2025-11-15T10:30:00Z',
      duration: '2m 34s',
      environment: 'production'
    },
    {
      id: 'deploy-002',
      title: { ko: 'API 서비스 v2.1.5', en: 'API Service v2.1.5' },
      status: 'success',
      timestamp: '2025-11-14T15:20:00Z',
      duration: '1m 45s',
      environment: 'production'
    },
    {
      id: 'deploy-003',
      title: { ko: '위험 평가 모듈 v1.0.3', en: 'Risk Assessment Module v1.0.3' },
      status: 'success',
      timestamp: '2025-11-13T09:15:00Z',
      duration: '3m 12s',
      environment: 'production'
    },
    {
      id: 'deploy-004',
      title: { ko: '문서 생성기 v0.9.2', en: 'Documentation Generator v0.9.2' },
      status: 'success',
      timestamp: '2025-11-12T14:00:00Z',
      duration: '2m 01s',
      environment: 'staging'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '⚪';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (language === 'ko') {
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>
        🚀 {language === 'ko' ? '최근 배포' : 'Recent Deployments'}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {deployments.map((deployment) => (
          <div 
            key={deployment.id}
            style={{
              padding: '1rem',
              backgroundColor: 'var(--color-gray-50)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `4px solid ${deployment.status === 'success' ? 'var(--color-success)' : 'var(--color-error)'}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{getStatusIcon(deployment.status)}</span>
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {deployment.title[language]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)', marginTop: '0.25rem' }}>
                    {formatTimestamp(deployment.timestamp)}
                  </div>
                </div>
              </div>
              <span 
                className="badge" 
                style={{ 
                  backgroundColor: deployment.environment === 'production' 
                    ? 'var(--color-primary)' 
                    : 'var(--color-gray-400)',
                  color: 'white',
                  fontSize: '0.75rem'
                }}
              >
                {deployment.environment}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              {language === 'ko' ? '배포 시간' : 'Duration'}: {deployment.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentFeed;
