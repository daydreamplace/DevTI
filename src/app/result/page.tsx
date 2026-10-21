import { pageMetadata } from '@/lib/site';
import { ResultView } from './result-view';
export const metadata = {
  ...pageMetadata(
    '나의 개발자 성향 결과',
    '나의 네 가지 개발 성향과 성장 힌트를 확인해보세요.',
    '/result/',
  ),
  robots: { index: false, follow: true },
};
export default function ResultPage() {
  return (
    <main id="main" className="test-page container result-wrap">
      <ResultView />
    </main>
  );
}
