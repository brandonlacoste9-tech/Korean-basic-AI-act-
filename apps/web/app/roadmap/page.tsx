import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div className="accent-bar-top pt-6">
        <h1 className="text-3xl font-bold text-obangsaek-blue korean-text mb-2">
          로드맵
        </h1>
        <p className="text-gray-600 korean-text">
          개발 로드맵 및 진행 상황 (PR 2에서 구현 예정)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚧 준비 중</CardTitle>
          <CardDescription className="korean-text">
            이 페이지는 PR 2 - 로드맵 UI에서 구현될 예정입니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
