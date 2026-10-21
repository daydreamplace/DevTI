import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { devTypes, getType } from '@/lib/types';
import { axes } from '@/lib/questions';
import { pageMetadata, siteUrl, updatedAt } from '@/lib/site';
import { Illustration } from '@/components/illustration';
import { TypeCard } from '@/components/type-card';
import { JsonLd } from '@/components/json-ld';

export const dynamicParams = false;
export function generateStaticParams() {
  return devTypes.map((t) => ({ code: t.code.toLowerCase() }));
}
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getType(code);
  return type
    ? pageMetadata(
        `${type.code} ${type.name}`,
        `${type.description} ${type.code} 유형의 강점과 성장 힌트, 프로젝트 아이디어를 확인하세요.`,
        `/types/${code}/`,
      )
    : {};
}

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getType(code);
  if (!type) notFound();
  const related = devTypes
    .filter((t) => t.code !== type.code)
    .sort(
      (a, b) =>
        [...b.code].filter((c, i) => c === type.code[i]).length -
        [...a.code].filter((c, i) => c === type.code[i]).length,
    )
    .slice(0, 4);
  return (
    <main id="main" className="type-detail container">
      <nav className="breadcrumb" aria-label="현재 위치">
        <Link href="/">홈</Link>
        <ChevronRight size={11} />
        <Link href="/types/">16가지 유형</Link>
        <ChevronRight size={11} />
        <span>{type.code}</span>
      </nav>
      <section className={`type-detail-hero ${type.color}`}>
        <div>
          <span className="type-code">{type.code}</span>
          <h1>{type.name}</h1>
          <p className="tagline">{type.tagline}</p>
          <p className="description">{type.description}</p>
          <div className="type-tags">
            {axes.map((a, i) => (
              <span key={a.name}>{type.code[i] === a.codes[0] ? a.left : a.right}</span>
            ))}
          </div>
          <Link href="/test/" className="button button-dark">
            나는 어떤 유형일까요? <ArrowRight size={16} />
          </Link>
        </div>
        <Illustration kind={type.art} />
      </section>
      <div className="detail-grid">
        <section className="detail-panel">
          <h2>자연스럽게 발휘하는 강점</h2>
          <ul>
            {type.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="detail-panel">
          <h2>성장을 위한 작은 힌트</h2>
          <p>{type.growth}</p>
        </section>
        <section className="detail-panel">
          <h2>이런 프로젝트를 해보세요</h2>
          <p>{type.project}</p>
        </section>
        <section className="detail-panel">
          <h2>관심을 넓혀볼 분야</h2>
          <p>{type.roles.join(' · ')}</p>
          <p>실제 직무 적합성을 뜻하지 않아요. 흥미가 생기는 활동부터 작게 경험해보세요.</p>
        </section>
      </div>
      <section className="detail-panel">
        <h2>{type.code}, 네 글자에 담긴 의미</h2>
        <p>
          {axes
            .map(
              (axis, i) =>
                `${type.code[i]}는 ${type.code[i] === axis.codes[0] ? axis.left : axis.right}`,
            )
            .join(', ')}
          을 뜻합니다. 이 유형은 네 가지 축의 선호 조합을 설명하며, 개발 능력이나 성격 전체를
          판단하지 않습니다.
        </p>
        <p>
          같은 유형이라도 선호의 강도와 실제 경험은 다를 수 있어요. 개인별 점수는 테스트를 완료한
          브라우저의 결과 화면에서 확인할 수 있습니다.
        </p>
        <Link href="/methodology/" className="text-link">
          문항과 계산 방식 살펴보기 <ArrowRight size={14} />
        </Link>
      </section>
      <p className="detail-note">
        DevTI는 자기이해를 위한 콘텐츠입니다. 현재 선호는 경험과 상황에 따라 달라질 수 있습니다. ·
        업데이트 {updatedAt}
      </p>
      <h2 className="related-heading">한 끗 다른, 이런 스타일도 있어요.</h2>
      <div className="related-types">
        {related.map((t) => (
          <TypeCard key={t.code} type={t} />
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${type.code} ${type.name} — DevTI 개발자 성향`,
          description: type.description,
          inLanguage: 'ko',
          mainEntityOfPage: `${siteUrl}/types/${code}/`,
          dateModified: updatedAt,
          author: { '@type': 'Organization', name: 'DevTI', url: siteUrl },
          image: `${siteUrl}/og.png`,
          articleBody: `${type.description} 강점: ${type.strengths.join(' ')} 성장 힌트: ${type.growth} 프로젝트: ${type.project}`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: '16가지 유형', item: `${siteUrl}/types/` },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${type.code} ${type.name}`,
              item: `${siteUrl}/types/${code}/`,
            },
          ],
        }}
      />
    </main>
  );
}
