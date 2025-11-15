import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="accent-bar-top pt-6">
        <h1 className="text-3xl font-bold text-obangsaek-blue korean-text mb-2">
          대시보드
        </h1>
        <p className="text-gray-600 korean-text">
          규정 준수 대시보드 (PR 6에서 구현 예정)
        </p>
      </div>

      <Card accent="blue">
        <CardHeader>
          <CardTitle>🚧 준비 중</CardTitle>
          <CardDescription className="korean-text">
            이 페이지는 PR 6 - 대시보드 프레임워크에서 구현될 예정입니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
