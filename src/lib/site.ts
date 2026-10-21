import type { Metadata } from 'next';
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://devti-your-type.you8inpark.chatgpt.site'
).replace(/\/$/, '');
export const updatedAt = '2026-10-21';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | DevTI`,
      description,
      url: `${siteUrl}${path}`,
      type: 'website',
      locale: 'ko_KR',
      siteName: 'DevTI',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'DevTI — 나답게 개발하는 방식을 발견하세요',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DevTI`,
      description,
      images: ['/og.png'],
    },
  };
}
