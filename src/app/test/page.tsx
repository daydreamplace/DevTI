import { pageMetadata } from '@/lib/site';
import { TestFlow } from './test-flow';
export const metadata = {
  ...pageMetadata(
    '개발자 성향 테스트 시작',
    '40개 문항에 7점 척도로 답하고 나의 개발 스타일과 협업 성향을 알아보세요. 무료, 회원가입 없이 약 5–7분.',
    '/test/',
  ),
  robots: { index: false, follow: true },
};
export default function TestPage() {
  return (
    <main id="main" className="test-page container">
      <TestFlow />
    </main>
  );
}
