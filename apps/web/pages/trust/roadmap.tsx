import React, { useState } from 'react';
import DeploymentFeed from './components/DeploymentFeed';
import RecentPRs from './components/RecentPRs';
import LiveStatus from './components/LiveStatus';
import { sampleRoadmapItems } from '../../data/roadmap';

const TrustCenterPage: React.FC = () => {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  // Calculate roadmap progress
  const totalItems = sampleRoadmapItems.length;
  const completedItems = sampleRoadmapItems.filter(item => item.status === 'Launched').length;
  const inProgressItems = sampleRoadmapItems.filter(item => item.status === 'In Progress').length;
  const plannedItems = sampleRoadmapItems.filter(item => item.status === 'Planned').length;

  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>
          🔒 신뢰센터
        </h1>
        <p className="en-text" style={{ fontSize: '1rem', color: 'var(--color-gray-600)' }}>
          Trust Center
        </p>
        <p style={{ marginTop: '1rem' }}>
          시스템 상태, 배포 현황, 개발 진행 상황을 실시간으로 확인하세요.
        </p>
        <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          Monitor system status, deployment activity, and development progress in real-time.
        </p>
      </div>

      {/* System Status Overview */}
      <div className="card" style={{ backgroundColor: 'var(--color-blue)', color: 'white', marginBottom: '2rem' }}>
        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>
          📊 {language === 'ko' ? '시스템 현황' : 'System Overview'}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              {completionPercentage}%
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              {language === 'ko' ? '로드맵 완료율' : 'Roadmap Completion'}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              99.97%
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              {language === 'ko' ? '가동 시간' : 'Uptime'}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              72
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              {language === 'ko' ? '준수 점수' : 'Compliance Score'}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              🟢
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              {language === 'ko' ? '시스템 상태' : 'System Status'}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Progress Visualization */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>
          📈 {language === 'ko' ? '로드맵 진행 상황' : 'Roadmap Progress'}
        </h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>
              {language === 'ko' ? '전체 진행률' : 'Overall Progress'}
            </span>
            <span style={{ fontWeight: '600' }}>
              {completedItems} / {totalItems}
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '30px', 
            backgroundColor: 'var(--color-gray-200)', 
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex'
          }}>
            <div 
              style={{ 
                width: `${(completedItems / totalItems) * 100}%`, 
                backgroundColor: 'var(--color-success)',
                transition: 'width 0.3s ease'
              }}
            />
            <div 
              style={{ 
                width: `${(inProgressItems / totalItems) * 100}%`, 
                backgroundColor: 'var(--color-blue)',
                transition: 'width 0.3s ease'
              }}
            />
            <div 
              style={{ 
                width: `${(plannedItems / totalItems) * 100}%`, 
                backgroundColor: 'var(--color-yellow)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-success)', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.875rem' }}>
              {language === 'ko' ? '완료' : 'Completed'}: {completedItems}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-blue)', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.875rem' }}>
              {language === 'ko' ? '진행 중' : 'In Progress'}: {inProgressItems}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-yellow)', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.875rem' }}>
              {language === 'ko' ? '계획됨' : 'Planned'}: {plannedItems}
            </span>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <LiveStatus language={language} />
        <DeploymentFeed language={language} />
        <RecentPRs language={language} />
      </div>

      {/* Commit Feed */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>
          💻 {language === 'ko' ? '최근 커밋' : 'Recent Commits'}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { 
              hash: '3f2a1b9', 
              message: { ko: '준수 체크리스트 UI 개선', en: 'Improve compliance checklist UI' }, 
              author: 'brandon-dev', 
              time: '2시간 전' 
            },
            { 
              hash: '9c4e8d2', 
              message: { ko: '위험 평가 알고리즘 최적화', en: 'Optimize risk assessment algorithm' }, 
              author: 'ai-team', 
              time: '5시간 전' 
            },
            { 
              hash: 'a1d7f3e', 
              message: { ko: '한국어 번역 업데이트', en: 'Update Korean translations' }, 
              author: 'localization-team', 
              time: '1일 전' 
            },
            { 
              hash: '7b9c2e1', 
              message: { ko: 'API 문서 추가', en: 'Add API documentation' }, 
              author: 'docs-bot', 
              time: '1일 전' 
            },
            { 
              hash: '5f8d4a3', 
              message: { ko: '보안 패치 적용', en: 'Apply security patches' }, 
              author: 'security-team', 
              time: '2일 전' 
            }
          ].map((commit, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              <code style={{ 
                padding: '0.25rem 0.5rem', 
                backgroundColor: 'var(--color-gray-200)', 
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'monospace',
                fontSize: '0.75rem'
              }}>
                {commit.hash}
              </code>
              <span style={{ flex: 1 }}>
                {commit.message[language]}
              </span>
              <span style={{ color: 'var(--color-gray-600)' }}>
                {commit.author}
              </span>
              <span style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                {commit.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustCenterPage;
