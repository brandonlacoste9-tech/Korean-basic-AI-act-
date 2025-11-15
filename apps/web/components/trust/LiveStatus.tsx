import React from 'react';

interface LiveStatusProps {
  language?: 'ko' | 'en';
}

const LiveStatus: React.FC<LiveStatusProps> = ({ language = 'ko' }) => {
  const services = [
    { 
      name: { ko: 'API 서비스', en: 'API Service' }, 
      status: 'operational',
      uptime: '99.97%'
    },
    { 
      name: { ko: '웹 대시보드', en: 'Web Dashboard' }, 
      status: 'operational',
      uptime: '99.95%'
    },
    { 
      name: { ko: '데이터베이스', en: 'Database' }, 
      status: 'operational',
      uptime: '99.99%'
    },
    { 
      name: { ko: '인증 서비스', en: 'Authentication' }, 
      status: 'operational',
      uptime: '99.98%'
    }
  ];

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'operational':
        return {
          icon: '🟢',
          text: { ko: '정상 운영', en: 'Operational' },
          color: 'var(--color-success)'
        };
      case 'degraded':
        return {
          icon: '🟡',
          text: { ko: '성능 저하', en: 'Degraded' },
          color: 'var(--color-warning)'
        };
      case 'outage':
        return {
          icon: '🔴',
          text: { ko: '장애 발생', en: 'Outage' },
          color: 'var(--color-error)'
        };
      default:
        return {
          icon: '⚪',
          text: { ko: '알 수 없음', en: 'Unknown' },
          color: 'var(--color-gray-400)'
        };
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>
        ⚡ {language === 'ko' ? '실시간 상태' : 'Live Status'}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {services.map((service, index) => {
          const statusDisplay = getStatusDisplay(service.status);
          return (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-gray-200)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{statusDisplay.icon}</span>
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {service.name[language]}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: statusDisplay.color }}>
                    {statusDisplay.text[language]}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                  {language === 'ko' ? '가동률' : 'Uptime'}
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--color-success)' }}>
                  {service.uptime}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div 
        style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: 'var(--color-blue)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          {language === 'ko' ? '전체 시스템 상태' : 'Overall System Status'}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>
          🟢 {language === 'ko' ? '모든 시스템 정상' : 'All Systems Operational'}
        </div>
      </div>
    </div>
  );
};

export default LiveStatus;
