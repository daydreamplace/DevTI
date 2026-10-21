import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Fingerprint,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { Illustration } from '@/components/illustration';
import { TypeCard } from '@/components/type-card';
import { StartCTA } from '@/components/shell';
import { devTypes } from '@/lib/types';
import { axes } from '@/lib/questions';
import { JsonLd } from '@/components/json-ld';
import { siteUrl } from '@/lib/site';

const featured = [devTypes[0], devTypes[1], devTypes[5], devTypes[12]];
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-badge">
            <span /> DEVELOPER TYPE INDICATOR <span className="badge-version">v2.0</span>
          </div>
          <h1>
            코드에도,
            <br />
            당신만의{' '}
            <span className="hero-highlight">
              성향
              <svg viewBox="0 0 230 20" aria-hidden="true">
                <path
                  d="M4 13Q105-2 225 10M15 18Q110 5 212 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            이<br />
            있으니까<span className="coral">.</span>
          </h1>
          <p className="hero-description">
            같은 코드를 짜도, 문제를 푸는 방식은 다르니까.
            <br />
            40개의 질문으로 나다운 개발 스타일을 발견하세요.
          </p>
          <Link href="/test/" className="button button-coral hero-cta">
            내 개발자 성향 알아보기 <ArrowUpRight size={20} />
          </Link>
          <div className="hero-facts">
            <span>
              <Clock3 size={14} /> 약 5–7분
            </span>
            <span>
              <Check size={14} /> 무료 테스트
            </span>
            <span>
              <Fingerprint size={14} /> 회원가입 없이
            </span>
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="서로 다른 개발 스타일을 나타내는 네 가지 캐릭터 카드"
        >
          <span className="visual-caption">DIFFERENT MINDS. BETTER TOGETHER.</span>
          <span className="visual-spark spark-one" aria-hidden="true">
            ✳
          </span>
          <span className="visual-spark spark-two" aria-hidden="true">
            +
          </span>
          <div className="hero-card hero-card-explorer mint">
            <div className="hero-card-label">
              <span>01 / EXPLORER</span>
              <Code2 size={17} />
            </div>
            <Illustration kind={0} />
            <div className="hero-card-bottom">
              <strong>호기심은 나의 원동력.</strong>
              <span>EACD</span>
            </div>
          </div>
          <div className="hero-card hero-card-maker peach">
            <div className="hero-card-label">
              <span>02 / MAKER</span>
              <Sparkles size={17} />
            </div>
            <Illustration kind={1} />
            <div className="hero-card-bottom">
              <strong>일단, 만들어보자!</strong>
              <span>EACV</span>
            </div>
          </div>
          <div className="hero-card hero-card-thinker lavender">
            <div className="hero-card-label">
              <span>03 / VISIONARY</span>
              <Layers3 size={17} />
            </div>
            <Illustration kind={2} />
            <div className="hero-card-bottom">
              <strong>다음의 가능성을 그려요.</strong>
              <span>EICV</span>
            </div>
          </div>
          <div className="hero-card hero-card-builder blue">
            <div className="hero-card-label">
              <span>04 / ARCHITECT</span>
              <Code2 size={17} />
            </div>
            <Illustration kind={3} />
            <div className="hero-card-bottom">
              <strong>단단하게, 차곡차곡.</strong>
              <span>BICD</span>
            </div>
          </div>
          <div className="visual-sticker">
            <span>IT’s</span>
            <strong>Your Type.</strong>
            <svg width="38" height="18" viewBox="0 0 38 18" aria-hidden="true">
              <path
                d="M2 4q17 16 33-1m-8 0h8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="visual-bottom">&lt; a little more about you /&gt;</span>
        </div>
      </section>
      <section className="intro-strip">
        <div className="container">
          <p>
            잘하는 기술 너머,
            <br className="mobile-only" /> <strong>좋아하는 방식</strong>을 알아가는 시간.
          </p>
          <div className="strip-stats">
            <div>
              <b>
                40<span>개</span>
              </b>
              <span>나를 알아보는 질문</span>
            </div>
            <div>
              <b>
                4<span>가지</span>
              </b>
              <span>개발 성향의 축</span>
            </div>
            <div>
              <b>
                16<span>가지</span>
              </b>
              <span>서로 다른 개발 스타일</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section container axes-section" id="discover">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="mini-plus">+</span> THE WAY YOU WORK
            </span>
            <h2>
              네 가지 시선으로,
              <br />
              나의 개발 DNA를 읽어요.
            </h2>
          </div>
          <p>
            무엇을 만드는지만큼, 어떻게 만드는지도 중요하니까.
            <br />
            문제를 만나고 해결하는 나만의 방식을 살펴보세요.
          </p>
        </div>
        <div className="axes-grid">
          {axes.map((axis, i) => (
            <article className="axis-card" key={axis.name}>
              <div className="axis-card-top">
                <span className={`axis-number ${axis.color}`}>0{i + 1}</span>
                <span className="eyebrow">{axis.english}</span>
              </div>
              <h3>
                {axis.left} <span>vs</span> {axis.right}
              </h3>
              <p>{axis.description}</p>
              <div className={`axis-mini ${axis.color}`} aria-hidden="true">
                <span>{axis.codes[0]}</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>{axis.codes[1]}</span>
              </div>
            </article>
          ))}
        </div>
        <Link href="/methodology/" className="text-link">
          어떻게 분석하나요? <ArrowRight size={15} />
        </Link>
      </section>
      <section className="types-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="mini-plus">+</span> MEET YOUR DEVELOPER TYPE
              </span>
              <h2>
                개발자의 모습은,
                <br />
                하나가 아니니까.
              </h2>
            </div>
            <Link href="/types/" className="text-link">
              16가지 유형 모두 보기 <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="featured-types">
            {featured.map((t) => (
              <TypeCard key={t.code} type={t} />
            ))}
          </div>
          <p className="section-note">
            어떤 유형이 더 좋은 건 없어요. 각자의 방식으로, 더 나은 것을 만들 뿐.
          </p>
        </div>
      </section>
      <section className="section container how-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="mini-plus">+</span> A SMALL STEP, A NEW PERSPECTIVE
            </span>
            <h2>
              나를 발견하는 건,
              <br />
              생각보다 간단해요.
            </h2>
          </div>
          <p>
            정답은 없어요.
            <br />
            평소의 나와 가장 가까운 답을 골라주세요.
          </p>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>솔직하게 답하기</h3>
            <p>
              40개의 질문에 1–7점으로 답해요.
              <br />
              이상적인 모습보다 평소의 나를 떠올려보세요.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>나의 스타일 발견하기</h3>
            <p>
              네 가지 성향 축과 유형별 해설로
              <br />
              나의 강점과 성장 힌트를 확인해요.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>서로의 다름 이해하기</h3>
            <p>
              친구, 동료와 유형을 나누고
              <br />
              우리에게 맞는 협업 방식을 찾아보세요.
            </p>
          </article>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <span className="eyebrow">A FEW THINGS TO KNOW</span>
          <h2>
            시작 전,
            <br />
            궁금할 수 있어요.
          </h2>
          <Link href="/about/" className="text-link">
            DevTI 더 알아보기 <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="faq-list">
          <details open>
            <summary>DevTI는 어떤 테스트인가요?</summary>
            <p>
              DevTI(Developer Type Indicator)는 40개 문항으로 문제 접근, 해결 방식, 협업, 완성
              지향을 살펴보는 무료 개발자 성향 테스트입니다. 네 가지 축의 조합으로 16가지 개발
              스타일과 성장 힌트를 안내합니다.
            </p>
          </details>
          <details>
            <summary>개발을 잘 몰라도 참여할 수 있나요?</summary>
            <p>
              물론이에요. 기술 지식을 평가하지 않습니다. 공부나 팀 프로젝트에서 평소 일하는 모습을
              떠올리며 답해보세요.
            </p>
          </details>
          <details>
            <summary>결과가 제 직업이나 적성을 정해주나요?</summary>
            <p>
              결과는 현재의 선호를 돌아보는 참고 자료입니다. 심리검사로 검증된 척도나 채용·직업
              적합성 평가가 아니며, 추천 활동은 직접 경험해볼 탐색의 출발점입니다.
            </p>
          </details>
          <details>
            <summary>제 답변은 어디에 저장되나요?</summary>
            <p>
              답변은 이 브라우저의 로컬 저장소에만 보관합니다. 별도 계정이나 서버 전송 없이 이어할
              수 있고, 테스트 화면에서 저장된 답변을 삭제할 수 있습니다.
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
            '40개 문항과 네 가지 업무 성향 축으로 16가지 개발 스타일을 탐색하는 무료 테스트.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
        }}
      />
    </main>
  );
}
