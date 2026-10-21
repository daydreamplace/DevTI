import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="DevTI 홈">
          <span className="brand-symbol" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          DevTI
        </Link>
        <nav aria-label="주 메뉴">
          <Link href="/types/">유형 탐색</Link>
          <Link href="/methodology/">테스트 가이드</Link>
          <Link href="/about/">프로젝트 소개</Link>
        </nav>
        <Link href="/test/" className="button button-dark header-cta">
          테스트 시작 <ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              DevTI
            </Link>
            <p>Developer Type Indicator</p>
          </div>
          <div className="footer-links">
            <Link href="/about/">프로젝트 소개</Link>
            <Link href="/methodology/">문항 및 계산 방식</Link>
            <Link href="/privacy/">개인정보 안내</Link>
            <a href="https://github.com/daydreamplace/DevTI" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DevTI</span>
          <span>유형은 당신을 정의하는 답이 아닌, 이해하는 출발점입니다.</span>
        </div>
      </div>
    </footer>
  );
}
export function StartCTA() {
  return (
    <section className="start-banner container">
      <div>
        <span className="eyebrow">GET TO KNOW YOURSELF</span>
        <h2>이제, 나의 방식을 알아볼 차례.</h2>
        <p>평소의 나를 떠올리며 40개의 질문에 답해주세요.</p>
      </div>
      <Link href="/test/" className="button button-dark">
        무료로 테스트하기 <ArrowRight size={17} />
      </Link>
    </section>
  );
}
