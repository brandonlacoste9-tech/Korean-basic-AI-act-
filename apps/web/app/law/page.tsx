import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export default function LawPage() {
  return (
    <div className="space-y-6">
      <div className="accent-bar-top pt-6">
        <h1 className="text-3xl font-bold text-obangsaek-black korean-text mb-2">
          법률
        </h1>
        <p className="text-gray-600 korean-text">
          AI 기본법 조항 및 해석 (PR 4에서 구현 예정)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚧 준비 중</CardTitle>
          <CardDescription className="korean-text">
            이 페이지는 PR 4 - /law 스캐폴드 (한국어 + 영어)에서 구현될 예정입니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
