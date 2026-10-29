'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Décor animé en arrière-plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full brand-gradient opacity-20 blur-3xl animate-float-slow"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-magenta opacity-10 blur-3xl animate-float"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-sky opacity-10 blur-3xl animate-pulse-soft"
      />

      <div className="container-x relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">

        {/* Partie texte */}
        <div>
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
            <span className="h-2 w-2 rounded-full bg-magenta animate-pulse-soft" />
            Sport corporatif · Djibouti
          </span>

          <h1 className="display-title animate-rise mt-6 text-5xl sm:text-6xl lg:text-7xl">
            L&apos;esprit sportif,
            <br />
            <span className="text-brand-gradient">
              la force des entreprises
            </span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-ink/70"
            style={{ animationDelay: '0.1s' }}
          >
            L&apos;APSED œuvre pour la promotion du sport en entreprise à
            Djibouti : cohésion, santé, dépassement de soi et rencontres
            entre acteurs économiques, institutionnels et sociaux.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/evenements" className="btn-accent">
              Nos projets & événements
            </Link>

            <Link href="/partenaires" className="btn-ghost">
              Nos partenaires
            </Link>
          </div>

          <dl
            className="animate-rise mt-12 grid max-w-md grid-cols-3 gap-6"
            style={{ animationDelay: '0.3s' }}
          >
            {[
              {
                k: 'Cohésion',
                v: 'Équipes soudées',
              },
              {
                k: 'Santé',
                v: 'Bien-être au travail',
              },
              {
                k: 'Performance',
                v: 'Dépassement de soi',
              },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-xl text-ink">
                  {s.k}
                </dt>

                <dd className="text-sm text-ink/60">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bloc visuel */}
        <div
          className="animate-rise relative"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="card card-hover shimmer overflow-hidden p-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
              <img
                src="/photo-joueur.webp"
                alt="Joueur APSED sur le terrain"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-4 backdrop-blur">
                <p className="font-display text-lg uppercase">
                  Cap sur Antalya 2026
                </p>

                <p className="text-sm text-ink/60">
                  Le projet phare de la délégation APSED.
                </p>
              </div>
            </div>
          </div>

          {/* Pastille trophée */}
          <div
            aria-hidden
            className="absolute -left-5 top-8 hidden rounded-2xl bg-white p-3 shadow-lg animate-float sm:block"
          >
            <span className="font-display text-2xl text-brand-gradient">
              🏆
            </span>
          </div>

          {/* Pastille ballon */}
          <div
            aria-hidden
            className="absolute -right-4 bottom-24 hidden rounded-2xl bg-white p-3 shadow-lg animate-float-slow sm:block"
          >
            <span className="font-display text-2xl">
              ⚽
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
