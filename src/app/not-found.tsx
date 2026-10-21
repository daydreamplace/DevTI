import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404 / A PATH NOT YET BUILT</span>
      <h1>아직 만들어지지 않은 길이에요.</h1>
      <p>주소를 확인하거나 새로운 개발 스타일을 만나보세요.</p>
      <Link href="/" className="button button-dark">
        DevTI 홈으로 돌아가기
      </Link>
    </main>
  );
}
