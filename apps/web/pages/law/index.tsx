import React, { useState } from 'react';

const LawPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ko' | 'en'>('ko');

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>
          📜 법령
        </h1>
        <p className="en-text" style={{ fontSize: '1rem', color: 'var(--color-gray-600)' }}>
          Law
        </p>
        <p style={{ marginTop: '1rem' }}>
          대한민국 AI 기본법 전문 및 준수 요구사항
        </p>
        <p className="en-text" style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          Full text and compliance requirements of the Korean AI Basic Act
        </p>
      </div>

      {/* Language Tabs */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          borderBottom: '2px solid var(--color-gray-200)'
        }}>
          <button
            onClick={() => setActiveTab('ko')}
            className="btn"
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'ko' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'ko' ? 'white' : 'var(--color-black)',
              borderRadius: 0,
              fontWeight: activeTab === 'ko' ? '700' : '500',
              borderBottom: activeTab === 'ko' ? '3px solid var(--color-secondary)' : 'none',
              fontSize: '1.125rem'
            }}
          >
            🇰🇷 한국어 (Korean)
          </button>
          <button
            onClick={() => setActiveTab('en')}
            className="btn"
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'en' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'en' ? 'white' : 'var(--color-black)',
              borderRadius: 0,
              fontWeight: activeTab === 'en' ? '700' : '500',
              borderBottom: activeTab === 'en' ? '3px solid var(--color-secondary)' : 'none',
              fontSize: '1.125rem'
            }}
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      {/* Korean Content */}
      {activeTab === 'ko' && (
        <div>
          <div className="card">
            <h2>인공지능 기본법</h2>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: '1rem' }}>
              시행: 2026년 1월 1일 | 제정: 2024년 12월 26일
            </p>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--color-gray-50)', 
              borderLeft: '4px solid var(--color-primary)',
              marginBottom: '2rem'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                법률 제20456호
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                인공지능의 개발과 활용을 촉진하고, 신뢰할 수 있는 인공지능 생태계를 조성하여 
                국민의 삶의 질 향상과 국가 경쟁력 강화에 이바지함을 목적으로 한다.
              </p>
            </div>

            <h3>제1장 총칙</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>제1조 (목적)</h4>
              <p>
                이 법은 인공지능의 개발과 활용을 촉진하고, 신뢰할 수 있는 인공지능 생태계를 조성함으로써 
                국민의 삶의 질을 향상하고 국가 경쟁력을 강화하며, 인류의 공동 번영에 이바지함을 목적으로 한다.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제2조 (정의)</h4>
              <p>이 법에서 사용하는 용어의 뜻은 다음과 같다.</p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  "인공지능"이란 데이터와 알고리즘을 기반으로 학습하고, 추론하며, 판단하는 등 
                  인간의 지능적 행위를 구현하는 기술 및 시스템을 말한다.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "고위험 인공지능"이란 생명·신체의 안전, 재산상 중대한 피해, 
                  기본권 침해 등의 위험이 상대적으로 높은 인공지능을 말한다.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "생성형 인공지능"이란 텍스트, 이미지, 음성, 영상 등의 콘텐츠를 
                  생성할 수 있는 인공지능을 말한다.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "인공지능 사업자"란 인공지능을 개발·제공·운영하는 자를 말한다.
                </li>
              </ol>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제3조 (기본 이념)</h4>
              <p>인공지능의 개발과 활용은 다음 각 호의 원칙을 따라야 한다.</p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  인간의 존엄성과 기본권을 존중할 것
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  투명성과 설명 가능성을 확보할 것
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  공정성과 비차별성을 보장할 것
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  안전성과 견고성을 유지할 것
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  책임성과 책무성을 명확히 할 것
                </li>
              </ol>
            </div>
          </div>

          <div className="card">
            <h3>제2장 준수 요구사항</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>제10조 (위험 평가 의무)</h4>
              <p>
                고위험 인공지능을 개발·제공하는 사업자는 다음 각 호의 사항을 포함한 
                위험 평가를 실시하여야 한다.
              </p>
              <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>인공지능의 예상 사용 목적 및 범위</li>
                <li style={{ marginBottom: '0.5rem' }}>잠재적 위험 요소의 식별 및 분석</li>
                <li style={{ marginBottom: '0.5rem' }}>위험 완화 조치 및 안전장치</li>
                <li style={{ marginBottom: '0.5rem' }}>사후 모니터링 계획</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제11조 (투명성 확보)</h4>
              <p>
                인공지능 사업자는 이용자가 인공지능과 상호작용하고 있음을 명확히 알 수 있도록 
                하여야 하며, 의사결정 과정의 주요 원리를 설명할 수 있어야 한다.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제12조 (데이터 거버넌스)</h4>
              <p>
                인공지능 사업자는 학습 데이터의 품질, 출처, 편향성 등을 관리하고, 
                개인정보 보호 및 보안 조치를 이행하여야 한다.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제13조 (문서화 의무)</h4>
              <p>
                고위험 인공지능 사업자는 개발 과정, 위험 평가 결과, 성능 지표 등을 
                상세히 문서화하고 최신 상태로 유지하여야 한다.
              </p>
            </div>
          </div>

          <div className="card">
            <h3>제3장 집행 및 제재</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>제20조 (감독 기관)</h4>
              <p>
                과학기술정보통신부 장관은 이 법의 시행에 관한 사항을 총괄하며, 
                필요한 경우 관계 중앙행정기관의 장과 협의하여야 한다.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제21조 (과태료)</h4>
              <p>
                다음 각 호의 어느 하나에 해당하는 자에게는 5천만원 이하의 과태료를 부과한다.
              </p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>위험 평가를 실시하지 아니한 자</li>
                <li style={{ marginBottom: '0.5rem' }}>투명성 확보 의무를 이행하지 아니한 자</li>
                <li style={{ marginBottom: '0.5rem' }}>문서화 의무를 이행하지 아니한 자</li>
              </ol>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>제22조 (벌칙)</h4>
              <p>
                고의로 허위 정보를 제공하거나 중대한 안전 사고를 야기한 자에게는 
                3년 이하의 징역 또는 3천만원 이하의 벌금에 처한다.
              </p>
            </div>
          </div>

          <div className="card">
            <h3>시행 일정</h3>
            
            <table>
              <thead>
                <tr>
                  <th>일정</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024년 12월 26일</td>
                  <td>법률 제정 및 공포</td>
                </tr>
                <tr>
                  <td>2025년 6월</td>
                  <td>시행령 제정</td>
                </tr>
                <tr>
                  <td>2025년 9월</td>
                  <td>가이드라인 발표</td>
                </tr>
                <tr>
                  <td>2026년 1월 1일</td>
                  <td>법 시행</td>
                </tr>
                <tr>
                  <td>2026년 상반기</td>
                  <td>고위험 AI 분류 체계 확정</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* English Content */}
      {activeTab === 'en' && (
        <div>
          <div className="card">
            <h2>Korean AI Basic Act</h2>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: '1rem' }}>
              Effective: January 1, 2026 | Enacted: December 26, 2024
            </p>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--color-gray-50)', 
              borderLeft: '4px solid var(--color-primary)',
              marginBottom: '2rem'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                Act No. 20456
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                This Act aims to promote the development and utilization of artificial intelligence, 
                establish a trustworthy AI ecosystem, and contribute to improving the quality of life 
                for citizens and strengthening national competitiveness.
              </p>
            </div>

            <h3>Chapter 1: General Provisions</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 1 (Purpose)</h4>
              <p>
                The purpose of this Act is to promote the development and utilization of artificial intelligence, 
                establish a trustworthy AI ecosystem, improve the quality of life for citizens, strengthen 
                national competitiveness, and contribute to the common prosperity of humanity.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 2 (Definitions)</h4>
              <p>The terms used in this Act are defined as follows:</p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  "Artificial Intelligence" means technology and systems that implement intelligent human 
                  behavior such as learning, reasoning, and judgment based on data and algorithms.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "High-Risk AI" means artificial intelligence with relatively high risks of harm to 
                  life, physical safety, significant property damage, or infringement of fundamental rights.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "Generative AI" means artificial intelligence capable of generating content such as 
                  text, images, voice, and video.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  "AI Provider" means a person who develops, provides, or operates artificial intelligence.
                </li>
              </ol>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 3 (Basic Principles)</h4>
              <p>The development and utilization of AI shall follow these principles:</p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Respect for human dignity and fundamental rights
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Ensuring transparency and explainability
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Guaranteeing fairness and non-discrimination
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Maintaining safety and robustness
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Clarifying responsibility and accountability
                </li>
              </ol>
            </div>
          </div>

          <div className="card">
            <h3>Chapter 2: Compliance Requirements</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 10 (Risk Assessment Obligation)</h4>
              <p>
                Providers of high-risk AI must conduct risk assessments including:
              </p>
              <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Expected purpose and scope of use</li>
                <li style={{ marginBottom: '0.5rem' }}>Identification and analysis of potential risks</li>
                <li style={{ marginBottom: '0.5rem' }}>Risk mitigation measures and safeguards</li>
                <li style={{ marginBottom: '0.5rem' }}>Post-market monitoring plans</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 11 (Transparency)</h4>
              <p>
                AI providers must ensure that users can clearly recognize when they are interacting 
                with AI and must be able to explain the main principles of the decision-making process.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 12 (Data Governance)</h4>
              <p>
                AI providers must manage the quality, sources, and bias of training data, and 
                implement personal information protection and security measures.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 13 (Documentation Obligation)</h4>
              <p>
                High-risk AI providers must document in detail the development process, risk assessment 
                results, performance indicators, and keep them up to date.
              </p>
            </div>
          </div>

          <div className="card">
            <h3>Chapter 3: Enforcement and Penalties</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 20 (Supervisory Authority)</h4>
              <p>
                The Minister of Science and ICT oversees matters related to the implementation of this Act 
                and shall consult with the heads of related central administrative agencies when necessary.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 21 (Administrative Fines)</h4>
              <p>
                Administrative fines of up to 50 million KRW shall be imposed on those who:
              </p>
              <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Fail to conduct risk assessments</li>
                <li style={{ marginBottom: '0.5rem' }}>Fail to comply with transparency obligations</li>
                <li style={{ marginBottom: '0.5rem' }}>Fail to comply with documentation obligations</li>
              </ol>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Article 22 (Penalties)</h4>
              <p>
                Those who intentionally provide false information or cause serious safety incidents 
                shall be punished by imprisonment for up to 3 years or a fine of up to 30 million KRW.
              </p>
            </div>
          </div>

          <div className="card">
            <h3>Implementation Schedule</h3>
            
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Milestone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>December 26, 2024</td>
                  <td>Act enacted and promulgated</td>
                </tr>
                <tr>
                  <td>June 2025</td>
                  <td>Enforcement decree enacted</td>
                </tr>
                <tr>
                  <td>September 2025</td>
                  <td>Guidelines published</td>
                </tr>
                <tr>
                  <td>January 1, 2026</td>
                  <td>Act comes into effect</td>
                </tr>
                <tr>
                  <td>First Half 2026</td>
                  <td>High-risk AI classification system finalized</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawPage;
