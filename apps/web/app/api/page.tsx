import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export default function APIPage() {
  return (
    <div className="space-y-6">
      <div className="accent-bar-top pt-6">
        <h1 className="text-3xl font-bold text-obangsaek-black korean-text mb-2">
          API 문서
        </h1>
        <p className="text-gray-600 korean-text">
          API 엔드포인트 및 문서 (PR 5에서 구현 예정)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚧 준비 중</CardTitle>
          <CardDescription className="korean-text">
            이 페이지는 PR 5 - API 스텁에서 구현될 예정입니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
