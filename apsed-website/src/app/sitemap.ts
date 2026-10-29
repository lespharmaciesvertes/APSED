import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { eventSlugsQuery, newsSlugsQuery, albumSlugsQuery } from '@/sanity/lib/queries';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.apsed.dj';

async function safe(p: Promise<string[]>): Promise<string[]> {
  try { return await p; } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventSlugs, newsSlugs, albumSlugs] = await Promise.all([
    safe(client.fetch(eventSlugsQuery)),
    safe(client.fetch(newsSlugsQuery)),
    safe(client.fetch(albumSlugsQuery)),
  ]);

  const routes = [
    '', 'apsed', 'membres', 'sport-corporatif', 'activites', 'evenements',
    'antalya-2026', 'partenaires', 'actualites', 'galerie',
    'documents', 'rejoindre', 'contact',
  ];

  const staticPages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}/${r}`,
    priority: r === '' ? 1 : 0.7,
  }));

  const dynamicPages: MetadataRoute.Sitemap = [
    ...eventSlugs.map((s) => ({ url: `${base}/evenements/${s}`, priority: 0.6 })),
    ...newsSlugs.map((s) => ({ url: `${base}/actualites/${s}`, priority: 0.5 })),
    ...albumSlugs.map((s) => ({ url: `${base}/galerie/${s}`, priority: 0.5 })),
  ];

  return [...staticPages, ...dynamicPages];
}
