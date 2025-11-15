import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/components/ui';
import { ROADMAP_DATA, WORKSTREAMS } from '@/data/roadmap';

export default function Home() {
  const currentQuarter = ROADMAP_DATA[0];
  const inProgressItems = currentQuarter.items.filter(item => item.status === 'in-progress');
  const completedItems = currentQuarter.items.filter(item => item.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="accent-bar-top pt-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-obangsaek-blue korean-text mb-4">
            한국 AI 기본법 규정 준수 플랫폼
          </h1>
          <p className="text-xl text-gray-600 korean-text mb-8">
            인공지능 기본법 준수를 위한 투명하고 신뢰할 수 있는 플랫폼
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/roadmap">
              <Button size="lg">로드맵 보기</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">대시보드</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card accent="blue" hover>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-obangsaek-blue mb-2">
                {currentQuarter.items.length}
              </div>
              <div className="text-sm text-gray-600 korean-text">총 로드맵 항목</div>
            </div>
          </CardContent>
        </Card>
        <Card accent="yellow" hover>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-obangsaek-yellow-700 mb-2">
                {inProgressItems.length}
              </div>
              <div className="text-sm text-gray-600 korean-text">진행 중</div>
            </div>
          </CardContent>
        </Card>
        <Card accent="red" hover>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {completedItems.length}
              </div>
              <div className="text-sm text-gray-600 korean-text">완료됨</div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Workstreams Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 korean-text mb-6">작업 스트림</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSTREAMS.slice(0, 6).map((workstream) => (
            <Card key={workstream.id} hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: workstream.color }}
                  />
                  <CardTitle className="korean-text">{workstream.name.ko}</CardTitle>
                </div>
                <CardDescription className="korean-text mt-2">
                  {workstream.description.ko}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 korean-text mb-6">빠른 링크</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/roadmap">
            <Card hover accent="blue">
              <CardHeader>
                <CardTitle className="korean-text">📋 로드맵</CardTitle>
                <CardDescription className="korean-text">
                  전체 개발 로드맵 및 진행 상황 확인
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/trust">
            <Card hover accent="yellow">
              <CardHeader>
                <CardTitle className="korean-text">🔒 신뢰 센터</CardTitle>
                <CardDescription className="korean-text">
                  투명성 및 활동 모니터링
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/law">
            <Card hover>
              <CardHeader>
                <CardTitle className="korean-text">⚖️ 법률</CardTitle>
                <CardDescription className="korean-text">
                  AI 기본법 조항 및 요구사항
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/compliance">
            <Card hover accent="red">
              <CardHeader>
                <CardTitle className="korean-text">✓ 규정 준수</CardTitle>
                <CardDescription className="korean-text">
                  규정 준수 체크리스트 및 도구
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Obangsaek Info */}
      <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 via-yellow-50 to-red-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 korean-text mb-3">오방색 (五方色)</h3>
        <p className="text-sm text-gray-600 korean-text leading-relaxed">
          이 플랫폼은 전통적인 한국 오방색 팔레트를 사용합니다: 
          청색 (동쪽, 木), 적색 (남쪽, 火), 황색 (중앙, 土), 백색 (서쪽, 金), 흑색 (북쪽, 水).
          각 색상은 철학적 의미를 가지며 정부 스타일의 UI 디자인에 반영되었습니다.
        </p>
      </section>
    </div>
  );
}
