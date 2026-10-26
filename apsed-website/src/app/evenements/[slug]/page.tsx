import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PortableTextBody from '@/components/PortableTextBody';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { eventBySlugQuery, eventSlugsQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(eventSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await client.fetch(eventBySlugQuery, { slug: params.slug });
  if (!event) return { title: 'Événement introuvable' };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const event = await client.fetch(eventBySlugQuery, { slug: params.slug });
  if (!event) notFound();

  const formatted = event.date
    ? new Date(event.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <article className="container-x py-16 md:py-24">
      <Link href="/evenements" className="text-sm font-semibold text-emerald">
        ← Tous les événements
      </Link>

      <header className="mt-6 max-w-3xl">
        {formatted && (
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
            {formatted}
            {event.location ? ` · ${event.location}` : ''}
          </p>
        )}
        <h1 className="display-title mt-3 text-4xl sm:text-5xl">{event.title}</h1>
        {event.excerpt && (
          <p className="mt-4 text-lg text-ink/70">{event.excerpt}</p>
        )}
      </header>

      {event.coverImage && (
        <div className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src={urlForImage(event.coverImage).width(1400).height(800).url()}
            alt={event.coverImage?.alt || event.title}
            width={1400}
            height={800}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-10 max-w-3xl">
        <PortableTextBody value={event.body} />
      </div>

      <div className="mt-12">
        <Link href="/contact" className="btn-accent">
          Participer / nous contacter
        </Link>
      </div>
    </article>
  );
}
