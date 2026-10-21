import Link from 'next/link';
import { pageMetadata } from '@/lib/site';
import { StartCTA } from '@/components/shell';
export const metadata = pageMetadata(
  'DevTI 소개 · IT’s Your Type',
  'DevTI는 같은 문제를 다른 방식으로 푸는 개발자들의 차이를 이해하기 위해 시작했습니다. 나만의 개발 스타일과 협업 방식을 발견하세요.',
  '/about/',
);
export default function AboutPage() {
  return (
    <main id="main">
      <div className="container reading">
        <div className="page-intro">
          <span className="eyebrow">IT’S YOUR TYPE. IT’S YOUR WAY.</span>
          <h1>
            내가 어떤 개발자인지,
            <br />
            궁금한 당신에게<span className="coral">.</span>
          </h1>
          <p>
            좋아하는 기술이 달라도, 문제를 푸는 방식이 달라도.
            <br />
            우리 모두 각자의 방식으로 무언가를 만들어가고 있으니까요.
          </p>
        </div>
        <article>
          <h2>다름에서 시작한 작은 질문</h2>
          <p>
            누군가는 새로운 도구를 실험하며 배우고, 누군가는 탄탄한 구조를 세우며 완성도를 높입니다.
            함께 아이디어를 나눌 때 에너지를 얻는 사람도, 혼자 깊이 몰입할 때 편안한 사람도 있어요.
          </p>
          <p>
            DevTI는 이런 차이를 이야기하는 작은 도구입니다. Developer Type Indicator라는 이름처럼,
            네 가지 성향 축을 통해 지금 내가 선호하는 개발 방식과 협업 스타일을 살펴봅니다.
          </p>
        </article>
        <article>
          <h2>개발자의 가능성을 넓히고 싶어서</h2>
          <p>
            ‘나는 개발에 안 맞는 걸까?’, ‘어떤 프로젝트부터 해보면 좋을까?’라는 질문에 단 하나의
            답을 정해주기보다, 직접 시도해볼 작은 힌트를 건네고 싶었습니다.
          </p>
          <p>
            DevTI는 박유빈이 기획한 프로젝트로, 2025년 11월 4일 GDG on Campus Hongik University
            발표에서 소개되었습니다. 이번 리뉴얼은 40개 문항과 네 가지 성향 축이라는 출발점을
            이어갑니다.
          </p>
          <p className="callout">
            당신의 가능성은 네 글자보다 큽니다. 결과는 오늘의 나를 돌아보는 대화의 시작으로
            읽어주세요.
          </p>
        </article>
        <article>
          <h2>솔직하고 투명한 테스트</h2>
          <p>
            모든 문항과 채점 방식을 공개합니다. 회원가입 없이 참여할 수 있고, 답변은 브라우저에만
            저장합니다. 통계나 참여자 수, 연구 근거를 만들어 표시하지 않습니다.
          </p>
          <p>
            <Link href="/methodology/">40문항과 점수 계산 방식</Link> ·{' '}
            <Link href="/privacy/">개인정보 안내</Link> ·{' '}
            <a href="https://github.com/daydreamplace/DevTI">프로젝트 GitHub</a>
          </p>
        </article>
      </div>
      <StartCTA />
    </main>
  );
}
