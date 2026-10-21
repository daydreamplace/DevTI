import { pageMetadata } from '@/lib/site';
import { TypeDirectory } from './type-directory';
import { StartCTA } from '@/components/shell';
export const metadata = pageMetadata(
  '16가지 개발자 성향 유형',
  '탐색형·구조형, 실행형·통찰형, 협업형·독립형, 디테일형·혁신형이 만나는 16가지 개발 스타일. 유형별 강점과 성장 힌트를 읽어보세요.',
  '/types/',
);
export default function TypesPage() {
  return (
    <main id="main">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">16 WAYS TO BUILD SOMETHING BETTER</span>
          <h1>
            개발자의 모습은,
            <br />
            하나가 아니니까<span className="coral">.</span>
          </h1>
          <p>
            다른 방식으로 생각하고, 각자의 속도로 만들어요.
            <br />네 가지 성향이 만나는 16가지 개발 스타일을 만나보세요.
          </p>
        </div>
        <TypeDirectory />
      </div>
      <StartCTA />
    </main>
  );
}
