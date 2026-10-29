import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Reveal from '@/components/Reveal';
import EventCard from '@/components/EventCard';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import {
  upcomingEventsQuery,
  latestNewsQuery,
  allPartnersQuery,
  allAlbumsQuery,
} from '@/sanity/lib/queries';

export const revalidate = 60;

async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try { return await p; } catch { return fallback; }
}

export default async function HomePage() {
  const [events, news, partners, albums] = await Promise.all([
    safe(client.fetch(upcomingEventsQuery), [] as any[]),
    safe(client.fetch(latestNewsQuery), [] as any[]),
    safe(client.fetch(allPartnersQuery), [] as any[]),
    safe(client.fetch(allAlbumsQuery), [] as any[]),
  ]);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Intro APSED */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="eyebrow">Qui sommes-nous ?</p>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">
              Le sport au service des entreprises
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              L&apos;APSED accompagne les entreprises de Djibouti dans l&apos;organisation
              d&apos;activités sportives porteuses de sens : cohésion, santé et performance
              collective, au cœur d&apos;un projet durable et fédérateur.
            </p>
            <Link href="/apsed" className="btn-ghost mt-6">Découvrir l&apos;APSED</Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="card card-hover shimmer overflow-hidden p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src="/photo-equipe.webp" alt="Équipe APSED" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sport corporatif */}
      <section className="bg-white">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <div className="overflow-hidden rounded-2xl brand-gradient-anim p-8 sm:p-12">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Le concept</p>
                <h2 className="display-title mt-3 text-3xl text-white sm:text-4xl">
                  Le sport corporatif, un levier stratégique
                </h2>
                <p className="mt-4 text-white/90">
                  Bien plus qu&apos;une discipline : un projet institutionnel qui renforce la
                  marque employeur, la santé des salariés et le lien entre acteurs économiques.
                </p>
                <Link href="/sport-corporatif" className="btn mt-6 bg-white text-ink hover:bg-white/90">
                  En savoir plus
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />

      {/* Événements */}
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow">Projets & événements</p>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">Nos prochains rendez-vous</h2>
          </Reveal>
          <Link href="/evenements" className="btn-ghost">Tout voir</Link>
        </div>
        {events.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e: any, i: number) => (
              <Reveal key={e._id} delay={i * 80}>
                <EventCard item={e} basePath="/evenements" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="card mt-10 p-10 text-center text-ink/60">
            Les prochains événements seront publiés ici très bientôt.
          </div>
        )}
      </section>

      {/* Actualités */}
      {news.length > 0 && (
        <section className="bg-white">
          <div className="container-x py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <p className="eyebrow">Actualités</p>
                <h2 className="display-title mt-3 text-3xl sm:text-4xl">Les dernières nouvelles</h2>
              </Reveal>
              <Link href="/actualites" className="btn-ghost">Toutes les actualités</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n: any, i: number) => (
                <Reveal key={n._id} delay={i * 80}>
                  <EventCard item={n} basePath="/actualites" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partenaires */}
      {partners.length > 0 && (
        <section className="container-x py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-center">Ils nous soutiennent</p>
            <h2 className="display-title mt-3 text-center text-3xl sm:text-4xl">Nos partenaires</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {partners.slice(0, 10).map((p: any, i: number) => (
              <Reveal key={p._id} delay={i * 50}>
                <div className="card flex h-24 items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
                  {p.logo ? (
                    <Image
                      src={urlForImage(p.logo).width(200).height(120).url()}
                      alt={p.name}
                      width={200}
                      height={120}
                      className="max-h-14 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-display text-lg text-ink/70">{p.name}</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/partenaires" className="btn-ghost">Tous nos partenaires</Link>
          </div>
        </section>
      )}

      {/* Galerie teaser */}
      {albums.length > 0 && (
        <section className="bg-white">
          <div className="container-x py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <p className="eyebrow">En images</p>
                <h2 className="display-title mt-3 text-3xl sm:text-4xl">Galerie</h2>
              </Reveal>
              <Link href="/galerie" className="btn-ghost">Voir la galerie</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.slice(0, 3).map((a: any, i: number) => (
                <Reveal key={a._id} delay={i * 80}>
                  <Link href={`/galerie/${a.slug}`} className="card card-hover shimmer group block overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                      {a.coverImage ? (
                        <Image
                          src={urlForImage(a.coverImage).width(800).height(500).url()}
                          alt={a.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center brand-gradient">
                          <span className="font-display text-3xl text-white/90">APSED</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5"><h3 className="font-display text-lg uppercase">{a.title}</h3></div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bannière Antalya 2026 */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl brand-gradient-anim p-10 sm:p-16">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl animate-float" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Projet phare</p>
              <h2 className="display-title mt-3 text-4xl text-white sm:text-5xl">Cap sur Antalya 2026</h2>
              <p className="mt-4 text-white/90">
                Soutenez la délégation djiboutienne pour ce rendez-vous international du sport corporatif.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/antalya-2026" className="btn bg-white text-ink hover:bg-white/90">Découvrir le projet</Link>
                <Link href="/rejoindre" className="btn border border-white/40 text-white hover:bg-white/10">Soutenir l&apos;APSED</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Appel final */}
      <section className="bg-white">
        <div className="container-x py-16 text-center md:py-24">
          <Reveal>
            <h2 className="display-title text-3xl sm:text-4xl">Prêt à faire bouger votre entreprise ?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              Rejoignez le mouvement du sport corporatif à Djibouti.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/rejoindre" className="btn-accent">Inscrire une équipe</Link>
              <Link href="/contact" className="btn-ghost">Nous contacter</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
