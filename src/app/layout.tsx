import type { Metadata, Viewport } from 'next';
import { Header, Footer } from '@/components/shell';
import { JsonLd } from '@/components/json-ld';
import { siteUrl } from '@/lib/site';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/noto-sans-kr';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'DevTI — 나의 개발자 성향 테스트, IT’s Your Type', template: '%s | DevTI' },
  description:
    '나는 어떤 스타일의 개발자일까요? 40개 문항과 4가지 성향 축으로 나의 개발 스타일, 협업 방식, 성장 힌트를 발견하세요. 무료 개발자 성향 테스트 DevTI.',
  applicationName: 'DevTI',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/icon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'DevTI',
    title: 'DevTI — 나답게 개발하는 방식을 발견하세요',
    description: '40개의 질문, 16가지 개발 스타일. 당신의 개발 DNA를 만나보세요.',
    url: siteUrl,
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTI — IT’s Your Type',
    description: '나답게 개발하는 방식을 발견하세요.',
    images: ['/og.png'],
  },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문 바로가기
        </a>
        <Header />
        {children}
        <Footer />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DevTI',
            alternateName: 'Developer Type Indicator',
            url: siteUrl,
            inLanguage: 'ko',
            description:
              '40개 자기보고 문항으로 네 가지 업무 성향 축과 16가지 개발 스타일을 탐색하는 무료 테스트.',
          }}
        />
      </body>
    </html>
  );
}
