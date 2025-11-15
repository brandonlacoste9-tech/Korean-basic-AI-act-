import React, { useState } from 'react';

const ApiExplorerPage: React.FC = () => {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/roadmap',
      description: {
        ko: '전체 로드맵 데이터 조회',
        en: 'Retrieve full roadmap data'
      }
    },
    {
      method: 'GET',
      path: '/api/roadmap/Q3-2025',
      description: {
        ko: '특정 분기 로드맵 조회',
        en: 'Retrieve roadmap for specific quarter'
      }
    },
    {
      method: 'POST',
      path: '/api/roadmap/sync',
      description: {
        ko: 'GitHub 동기화 (비활성화)',
        en: 'GitHub sync (disabled)'
      }
    },
    {
      method: 'GET',
      path: '/api/compliance/check',
      description: {
        ko: 'AI 기본법 준수 점검',
        en: 'Check AI Basic Act compliance'
      }
    },
    {
      method: 'GET',
      path: '/api/risk/score',
      description: {
        ko: '위험 점수 평가',
        en: 'Assess risk score'
      }
    }
  ];

  const handleTestEndpoint = async (endpoint: string, method: string) => {
    setSelectedEndpoint(endpoint);
    setResponse('Loading...');
    
    try {
      const res = await fetch(endpoint, { method });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>
          🔌 API Explorer
        </h1>
        <p style={{ marginTop: '1rem' }}>
          준수 API 문서 및 테스트 도구
        </p>
        <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          Compliance API documentation and testing tools
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Endpoints List */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>
            {language === 'ko' ? '사용 가능한 엔드포인트' : 'Available Endpoints'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {apiEndpoints.map((endpoint, index) => (
              <div 
                key={index}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedEndpoint === endpoint.path ? 'var(--color-gray-100)' : 'var(--color-gray-50)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-gray-200)',
                  cursor: 'pointer'
                }}
                onClick={() => handleTestEndpoint(endpoint.path, endpoint.method)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span 
                    className="badge" 
                    style={{ 
                      backgroundColor: endpoint.method === 'GET' ? 'var(--color-success)' : 'var(--color-blue)',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    {endpoint.method}
                  </span>
                  <code style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem',
                    color: 'var(--color-primary)'
                  }}>
                    {endpoint.path}
                  </code>
                </div>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>
                  {endpoint.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Response Panel */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>
            {language === 'ko' ? '응답' : 'Response'}
          </h3>

          {response ? (
            <pre style={{
              backgroundColor: 'var(--color-black)',
              color: '#00ff00',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              maxHeight: '600px'
            }}>
              {response}
            </pre>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: 'var(--color-gray-500)',
              backgroundColor: 'var(--color-gray-50)',
              borderRadius: 'var(--radius-md)'
            }}>
              <p>
                {language === 'ko' 
                  ? '엔드포인트를 선택하여 테스트하세요.' 
                  : 'Select an endpoint to test.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* API Documentation */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>
          {language === 'ko' ? 'API 문서' : 'API Documentation'}
        </h3>

        <div style={{ marginBottom: '2rem' }}>
          <h4>GET /api/roadmap</h4>
          <p style={{ color: 'var(--color-gray-600)' }}>
            {language === 'ko' 
              ? '전체 로드맵 데이터를 반환합니다. 모든 분기의 항목, 작업 스트림, 상태 정보를 포함합니다.'
              : 'Returns full roadmap data including all quarters, workstreams, and status information.'}
          </p>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
            <strong>{language === 'ko' ? '응답 예시:' : 'Example Response:'}</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
{`{
  "success": true,
  "data": {
    "quarters": { ... },
    "workstreams": [...],
    "statuses": [...],
    "totalItems": 3
  }
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4>GET /api/compliance/check</h4>
          <p style={{ color: 'var(--color-gray-600)' }}>
            {language === 'ko' 
              ? 'AI 기본법 준수 점수와 문제점을 반환합니다.'
              : 'Returns AI Basic Act compliance score and issues.'}
          </p>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
            <strong>{language === 'ko' ? '응답 예시:' : 'Example Response:'}</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
{`{
  "compliance_score": 72,
  "issues": [
    {
      "id": "A-120",
      "severity": "medium",
      "message": "Dataset provenance incomplete"
    }
  ],
  "status": "ok"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4>GET /api/risk/score</h4>
          <p style={{ color: 'var(--color-gray-600)' }}>
            {language === 'ko' 
              ? 'AI 시스템의 위험 수준과 주요 요인을 평가합니다.'
              : 'Assesses AI system risk level and key factors.'}
          </p>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
            <strong>{language === 'ko' ? '응답 예시:' : 'Example Response:'}</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
{`{
  "risk_level": "moderate",
  "confidence": 0.62,
  "factors": [
    "model transparency",
    "training dataset clarity"
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiExplorerPage;
