import Link from 'next/link';
import { pageMetadata, updatedAt } from '@/lib/site';
import { axes, questions } from '@/lib/questions';
export const metadata = pageMetadata(
  '테스트 가이드 · 40문항과 점수 계산 방식',
  'DevTI의 40문항 원문, 7점 응답 척도, 정·역방향 채점, 네 가지 성향 점수와 동점 처리 방법을 공개합니다.',
  '/methodology/',
);
export default function MethodologyPage() {
  return (
    <main id="main" className="container reading">
      <div className="page-intro">
        <span className="eyebrow">NO BLACK BOX. JUST YOUR PREFERENCES.</span>
        <h1>
          무엇을 묻고,
          <br />
          어떻게 읽어낼까요<span className="coral">.</span>
        </h1>
        <p>
          나를 설명하는 결과라면, 만들어지는 과정도 알 수 있어야 하니까.
          <br />
          문항부터 계산 방식까지 투명하게 공개합니다.
        </p>
      </div>
      <article>
        <h2>DevTI가 살펴보는 것</h2>
        <p>
          DevTI(Developer Type Indicator)는 개발과 팀 프로젝트에서 드러나는 업무 선호를 돌아보는
          자기보고형 콘텐츠입니다. 네 가지 축에 각각 10문항, 총 40문항으로 구성됩니다. 코딩 실력이나
          기술 지식은 평가하지 않습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>성향 축</th>
              <th>왼쪽 선호</th>
              <th>오른쪽 선호</th>
            </tr>
          </thead>
          <tbody>
            {axes.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>
                  {a.left} ({a.codes[0]})
                </td>
                <td>
                  {a.right} ({a.codes[1]})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="callout">
          기존 DevTI 자료의 E/B, A/I, C/S, D/V 코드를 유지했습니다. 현재 문항의 ‘독립형’은
          S(Self-directed), ‘혁신형’은 V(Vision)로 표시합니다.
        </p>
      </article>
      <article>
        <h2>1부터 7까지, 평소의 나에 가까운 답</h2>
        <p>
          1점 전혀 아니다 · 2점 아니다 · 3점 조금 아니다 · 4점 보통이다 · 5점 조금 그렇다 · 6점
          그렇다 · 7점 매우 그렇다.
        </p>
        <p>
          최근의 공부, 업무, 팀 프로젝트를 떠올려 답해주세요. 바라는 모습이나 특정 하루의 감정보다
          반복해서 나타나는 패턴을 기준으로 선택하면 좋습니다. 문항은 원래 순서대로 제시하며 언제든
          이전 답변을 수정할 수 있습니다.
        </p>
      </article>
      <article>
        <h2>점수는 이렇게 계산합니다</h2>
        <p>
          각 답변에서 중립값 4를 뺀 뒤 문항 방향(+1 또는 −1)을 곱합니다. 왼쪽 선호를 묻는 문항은 +1,
          오른쪽 선호를 묻는 문항은 −1입니다. 축별 10개 값을 합하면 −30부터 +30 사이의 합산 점수가
          나옵니다.
        </p>
        <code className="formula">
          문항 점수 = 문항 방향 × (응답값 − 4){'\n'}왼쪽 선호 점수(%) = 반올림((합산 점수 + 30) ÷ 60
          × 100){'\n'}오른쪽 선호 점수(%) = 100 − 왼쪽 선호 점수
        </code>
        <p>
          예를 들어 ‘계획과 절차를 세우는 편이다’는 구조형 문항입니다. 7점 응답은 탐색형 기준
          −3점으로 계산합니다. ‘새로운 방법을 시도하며 배우는 것이 즐겁다’는 탐색형 문항으로 7점
          응답을 +3점으로 계산합니다.
        </p>
        <p>
          이 비율은 응답을 환산한 선호 점수입니다. 능력의 확률, 진단 확률, 전체 참여자 중 백분위를
          뜻하지 않습니다. 모든 문항은 같은 가중치를 사용하며, 탐색형 축에는 탐색 문항 6개와 구조
          문항 4개가 포함되어 있습니다. 이 문항 구성의 영향과 측정 타당성은 별도로 검증되지
          않았습니다.
        </p>
      </article>
      <article>
        <h2>유형 코드와 동점 처리</h2>
        <p>
          각 축의 합산 점수가 양수이면 왼쪽 코드, 음수이면 오른쪽 코드를 조합합니다. 합산 점수가
          정확히 0이면 결과 화면에 ‘균형’으로 안내하고 유형 코드에는 왼쪽 코드(E/A/C/D)를
          사용합니다. 반올림된 비율이 아니라 원래 합산 점수로 유형을 결정합니다.
        </p>
        <p>
          예를 들어 탐색형·실행형·협업형·디테일형 선호가 모이면 EACD입니다. 네 축의 두 가지 선호
          조합으로 총 16가지 유형이 만들어집니다. 가까운 점수라면 양쪽 유형의 해설을 함께
          읽어보세요.
        </p>
      </article>
      <article className="question-catalog">
        <h2>40개 문항과 채점 방향</h2>
        <p>
          아래에서 모든 문항을 확인할 수 있어요. 괄호의 코드는 높은 동의 점수에 대응하는 성향입니다.
        </p>
        {axes.map((a, axis) => (
          <details key={a.name}>
            <summary>
              0{axis + 1}. {a.left} vs {a.right} · 10문항
            </summary>
            <ol start={axis * 10 + 1}>
              {questions
                .filter((q) => q.axis === axis)
                .map((q) => (
                  <li key={q.id}>
                    {q.text} <strong>({a.codes[q.direction === 1 ? 0 : 1]})</strong>
                  </li>
                ))}
            </ol>
          </details>
        ))}
      </article>
      <article>
        <h2>결과를 더 잘 활용하려면</h2>
        <p>
          유형명과 해설은 DevTI에서 만든 설명 콘텐츠입니다. 심리측정학적 신뢰도·타당도 연구나 직업
          성과와의 상관관계는 검증하지 않았습니다. 채용, 인사 평가, 직업 선택의 판정 기준으로
          사용하지 말고, 자신과 동료가 선호하는 방식을 이야기하는 계기로 활용해주세요.
        </p>
        <p>
          이전 결과와 달라지는 것도 자연스럽습니다. 경험이나 역할, 환경에 따라 일하는 방식은 바뀔 수
          있어요. 결과에 제안된 프로젝트를 직접 시도하고 어떤 과정이 즐거웠는지 기록해보세요.
        </p>
        <p>
          <Link href="/types/">16가지 유형 해설 읽기</Link> ·{' '}
          <Link href="/test/">내 성향 알아보기</Link>
        </p>
      </article>
      <time dateTime={updatedAt}>문항 및 계산 방식 v1 · 업데이트 {updatedAt}</time>
    </main>
  );
}
