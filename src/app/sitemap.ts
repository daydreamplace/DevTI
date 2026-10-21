import type { MetadataRoute } from 'next';
import { devTypes } from '@/lib/types';
import { siteUrl, updatedAt } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/types/', '/about/', '/methodology/', '/privacy/'].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: updatedAt,
    })),
    ...devTypes.map((t) => ({
      url: `${siteUrl}/types/${t.code.toLowerCase()}/`,
      lastModified: updatedAt,
    })),
  ];
}
