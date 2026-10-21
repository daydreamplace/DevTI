import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="DevTI 홈">
          <span className="brand-mark">
            d<span>:</span>
          </span>
          <span>
            DevTI<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav aria-label="주 메뉴">
          <Link href="/about/">DevTI 소개</Link>
          <Link href="/types/">16가지 유형</Link>
          <Link href="/methodology/">테스트 가이드</Link>
        </nav>
        <Link href="/test/" className="button button-dark header-cta">
          내 유형 찾기 <ArrowUpRight size={15} />
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
              DevTI<span className="brand-dot">.</span>
            </Link>
            <p>다름을 이해하면, 함께 더 잘 만들 수 있으니까.</p>
          </div>
          <div className="footer-links">
            <Link href="/about/">DevTI 소개</Link>
            <Link href="/methodology/">문항 및 계산 방식</Link>
            <Link href="/privacy/">개인정보 안내</Link>
            <a href="https://github.com/daydreamplace/DevTI" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DevTI. IT’s Your Type.</span>
          <span>당신의 가능성은 네 글자보다 크니까요.</span>
        </div>
      </div>
    </footer>
  );
}
export function StartCTA() {
  return (
    <section className="start-banner container">
      <span className="eyebrow">YOUR NEXT COMMIT IS YOU.</span>
      <h2>
        나답게 개발하는 방법,
        <br />
        여기서 시작해요<span className="coral">.</span>
      </h2>
      <Link href="/test/" className="button button-coral">
        내 개발자 성향 알아보기 <ArrowRight size={18} />
      </Link>
      <p>무료 · 40문항 · 약 5–7분 · 회원가입 없이</p>
      <span className="banner-code" aria-hidden="true">
        &lt;you /&gt;
      </span>
    </section>
  );
}
