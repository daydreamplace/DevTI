import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock3, LockKeyhole } from 'lucide-react';
import { TypeCard } from '@/components/type-card';
import { StyleExplorer } from '@/components/style-explorer';
import { StartCTA } from '@/components/shell';
import { getType } from '@/lib/types';
import { axes } from '@/lib/questions';
import { JsonLd } from '@/components/json-ld';
import { siteUrl } from '@/lib/site';

const featured = ['EACD', 'EISV', 'BASV', 'BICD'].map((code) => getType(code)!);
const axisExplanations = [
  ['새로운 시도에서 답을 찾는 편', '계획과 구조 안에서 답을 찾는 편'],
  ['직접 해보며 이해하는 편', '충분히 이해한 뒤 움직이는 편'],
  ['생각을 나누며 함께 나아가는 편', '자율적으로 깊이 몰입하는 편'],
  ['작은 완성도를 쌓아가는 편', '새로운 가능성과 방향을 그리는 편'],
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="status-dot" /> 나를 이해하는 개발자 성향 테스트
          </div>
          <h1>
            나는 어떻게
            <br />
            개발하는
            <br className="desktop-break" /> 사람일까?
          </h1>
          <p className="hero-description">
            기술 스택만으로는 설명할 수 없는 나의 일하는 방식.
            <br />네 가지 성향을 통해 강점과 협업 스타일을 발견하세요.
          </p>
          <div className="hero-actions">
            <Link href="/test/" className="button button-primary">
              내 성향 알아보기 <ArrowRight size={18} />
            </Link>
            <Link href="#dimensions" className="text-link">
              어떤 테스트인가요? <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <Clock3 size={14} />
              40문항 · 약 5–7분
            </span>
            <span>
              <LockKeyhole size={14} />
              무료 · 회원가입 없이
            </span>
          </div>
        </div>
        <StyleExplorer />
      </section>
      <section className="principle-bar">
        <div className="container">
          <span className="eyebrow">FOUR DIMENSIONS. EQUAL WEIGHT.</span>
          <p>
            나를 설명하는 네 가지 기준.
            <br className="mobile-only" /> <strong>네 가지 성향의 조합이 나의 스타일입니다.</strong>
          </p>
        </div>
      </section>
      <section className="section container dimensions-section" id="dimensions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / THE FRAMEWORK</span>
            <h2>
              네 가지 관점으로
              <br />
              일하는 방식을 살펴봐요.
            </h2>
          </div>
          <p>
            모든 축은 같은 비중으로 읽습니다.
            <br />
            어느 쪽이 더 좋거나, 더 개발자다운 건 없어요.
          </p>
        </div>
        <div className="dimension-list">
          {axes.map((axis, i) => (
            <article className="dimension-row" key={axis.name}>
              <div className="dimension-name">
                <span>0{i + 1}</span>
                <h3>{axis.name}</h3>
              </div>
              <div className="dimension-pole">
                <span>{axis.codes[0]}</span>
                <div>
                  <strong>{axis.left}</strong>
                  <p>{axisExplanations[i][0]}</p>
                </div>
              </div>
              <span className="dimension-divider" aria-hidden="true">
                ↔
              </span>
              <div className="dimension-pole">
                <span>{axis.codes[1]}</span>
                <div>
                  <strong>{axis.right}</strong>
                  <p>{axisExplanations[i][1]}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="section-bottom">
          <span>각 축 10문항 · 총 40문항 · 7점 척도</span>
          <Link href="/methodology/" className="text-link">
            문항과 계산 방식 <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <section className="types-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / EXPLORE THE COMBINATIONS</span>
              <h2>다른 조합, 다른 개발 스타일.</h2>
            </div>
            <Link href="/types/" className="text-link">
              16가지 조합 모두 보기 <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="featured-types">
            {featured.map((type) => (
              <TypeCard key={type.code} type={type} />
            ))}
          </div>
          <p className="section-note">
            네 글자는 네 가지 성향을 나란히 기록한 것. 순서는 중요도의 순위가 아닙니다.
          </p>
        </div>
      </section>
      <section className="section container process-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / YOUR NEXT STEP</span>
            <h2>
              짧은 질문에서,
              <br />
              구체적인 발견으로.
            </h2>
          </div>
          <p>
            결과를 읽는 데서 멈추지 않고,
            <br />
            다음 프로젝트에 적용할 힌트까지.
          </p>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>평소의 나를 떠올리기</h3>
            <p>지식이나 실력을 묻지 않아요. 공부, 업무, 팀 프로젝트에서의 내 모습에 답해주세요.</p>
          </article>
          <article>
            <span>02</span>
            <h3>네 가지 성향 함께 읽기</h3>
            <p>
              유형명과 함께 각 축의 비율을 확인해요. 한 글자보다 전체 조합과 선호의 정도가 중요해요.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>나의 방식으로 시도하기</h3>
            <p>
              강점, 성장 힌트, 프로젝트 아이디어를 참고해요. 동료와 서로의 방식을 이야기해도 좋아요.
            </p>
          </article>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <span className="eyebrow">BEFORE YOU START</span>
          <h2>자주 묻는 질문</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>DevTI는 어떤 테스트인가요?</summary>
            <p>
              DevTI(Developer Type Indicator)는 40개 문항으로 문제 접근, 해결 방식, 협업, 완성
              지향을 살펴보는 무료 개발자 성향 테스트입니다. 네 가지 축을 동등하게 조합해 16가지
              스타일과 성장 힌트를 안내합니다.
            </p>
          </details>
          <details>
            <summary>결과가 적성이나 직업을 정해주나요?</summary>
            <p>
              현재의 업무 선호를 돌아보는 참고 자료입니다. 검증된 심리검사나 적성 평가가 아니며,
              추천 활동은 직접 경험해볼 출발점으로 활용해주세요.
            </p>
          </details>
          <details>
            <summary>개발 경험이 없어도 참여할 수 있나요?</summary>
            <p>
              네. 기술 지식을 평가하지 않습니다. 공부나 팀 프로젝트에서 평소 일하는 모습을 떠올리며
              답해보세요.
            </p>
          </details>
          <details>
            <summary>답변과 결과는 어디에 저장되나요?</summary>
            <p>
              답변은 이 브라우저의 로컬 저장소에만 보관합니다. 회원가입과 서버 전송 없이 이어할 수
              있고, 테스트 화면에서 저장된 답변을 삭제할 수 있습니다.
            </p>
          </details>
        </div>
      </section>
      <StartCTA />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'DevTI',
          url: siteUrl,
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web browser',
          inLanguage: 'ko',
          isAccessibleForFree: true,
          description:
            '40개 문항과 동등한 네 가지 업무 성향 축의 조합으로 16가지 개발 스타일을 탐색하는 무료 테스트.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
        }}
      />
    </main>
  );
}
