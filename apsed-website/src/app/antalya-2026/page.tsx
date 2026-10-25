import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Antalya 2026',
  description:
    'Le projet phare de l\u2019APSED : la participation de la délégation djiboutienne à l\u2019événement sportif corporatif d\u2019Antalya 2026.',
};

const objectifs = [
  { t: 'Représenter Djibouti', d: 'Porter haut les couleurs du sport corporatif djiboutien sur la scène internationale.' },
  { t: 'Fédérer les entreprises', d: 'Constituer une délégation rassemblant plusieurs entreprises partenaires.' },
  { t: 'Créer des liens', d: 'Rencontrer des acteurs internationaux et nouer de nouveaux partenariats.' },
];

export default function AntalyaPage() {
  return (
    <>
      {/* Bannière immersive */}
      <section className="relative overflow-hidden brand-gradient-anim">
        <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-2xl animate-float" />
        <div aria-hidden className="pointer-events-none absolute left-10 bottom-0 h-56 w-56 rounded-full bg-magenta/30 blur-3xl animate-float-slow" />
        <div className="container-x relative py-20 md:py-28">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse-soft" />
            Projet phare
          </span>
          <h1 className="display-title animate-rise mt-6 text-5xl text-white sm:text-6xl lg:text-7xl">
            Cap sur Antalya 2026
          </h1>
          <p className="animate-rise mt-5 max-w-2xl text-lg text-white/90" style={{ animationDelay: '0.1s' }}>
            L&apos;APSED prépare la participation d&apos;une délégation djiboutienne à ce
            rendez-vous international du sport corporatif. Un projet fédérateur qui
            incarne notre ambition.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.2s' }}>
            <Link href="/rejoindre" className="btn bg-white text-ink hover:bg-white/90">
              Rejoindre la délégation
            </Link>
            <Link href="/partenaires" className="btn border border-white/40 text-white hover:bg-white/10">
              Devenir partenaire du projet
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">Nos objectifs</p>
          <h2 className="display-title mt-3 text-3xl sm:text-4xl">Pourquoi Antalya 2026 ?</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {objectifs.map((o, i) => (
            <Reveal key={o.t} delay={i * 100}>
              <div className="card card-hover h-full p-6">
                <span className="font-display text-3xl text-brand-gradient">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl uppercase">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-2xl border border-ink/10 bg-white p-8 text-center sm:p-12">
            <h2 className="display-title text-2xl sm:text-3xl">Soutenez la délégation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink/70">
              Entreprises, sponsors et institutions : associez votre image à ce projet
              porteur de valeurs et de visibilité internationale.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/rejoindre" className="btn-accent">Soutenir l&apos;APSED</Link>
              <Link href="/contact" className="btn-ghost">Nous contacter</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
