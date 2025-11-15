import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>한국 AI 기본법 준수 시스템</h1>
        <h2 className="en-text" style={{ fontSize: '1.5rem', color: 'var(--color-gray-600)', marginTop: '0' }}>
          Korean AI Basic Act Compliance System
        </h2>
        
        <p className="ko-text" style={{ fontSize: '1.125rem', marginTop: '2rem' }}>
          AI 기술의 윤리적 사용과 국가 경쟁력 강화를 위한 포괄적 법적 프레임워크
        </p>
        
        <p className="en-text" style={{ color: 'var(--color-gray-600)' }}>
          A comprehensive legal framework for ethical AI use and national competitiveness
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          <Link href="/roadmap" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
            <h3>로드맵</h3>
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              Roadmap
            </p>
            <p style={{ marginTop: '1rem' }}>
              AI 준수 개발 계획 및 일정 확인
            </p>
          </Link>

          <Link href="/trust/roadmap" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3>신뢰센터</h3>
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              Trust Center
            </p>
            <p style={{ marginTop: '1rem' }}>
              실시간 시스템 상태 및 배포 현황
            </p>
          </Link>

          <Link href="/law" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📜</div>
            <h3>법령</h3>
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              Law
            </p>
            <p style={{ marginTop: '1rem' }}>
              AI 기본법 전문 및 준수 요구사항
            </p>
          </Link>

          <Link href="/api-explorer" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔌</div>
            <h3>API Explorer</h3>
            <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
              API Explorer
            </p>
            <p style={{ marginTop: '1rem' }}>
              준수 API 문서 및 테스트
            </p>
          </Link>
        </div>

        <div className="card" style={{ marginTop: '3rem', backgroundColor: 'var(--color-gray-50)', border: '2px solid var(--color-primary)' }}>
          <h3>📊 시스템 현황</h3>
          <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>System Status</p>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div className="status-indicator">
                <span className="status-dot status-operational"></span>
                <span className="ko-text" style={{ fontWeight: '600' }}>운영 중</span>
              </div>
              <p className="en-text" style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)', marginTop: '0.25rem' }}>
                Operational
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                72%
              </div>
              <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                준수 점수
              </p>
              <p className="en-text" style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>
                Compliance Score
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-success)' }}>
                3
              </div>
              <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                활성 프로젝트
              </p>
              <p className="en-text" style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>
                Active Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
