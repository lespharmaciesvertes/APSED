import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { allMembersQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Nos membres',
  description:
    'Les membres adhérents de l’APSED, acteurs du sport corporatif à Djibouti.',
};

type Member = {
  _id: string;
  name: string;
  photo?: any;
  role?: string;
  company?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

export default async function MembersPage() {
  let members: Member[] = [];
  try {
    members = await client.fetch(allMembersQuery);
  } catch {
    members = [];
  }

  return (
    <>
      <PageHero
        eyebrow="L'APSED"
        title="Nos membres"
        subtitle="Les adhérents qui font vivre l'association et le sport corporatif à Djibouti."
      />

      <section className="container-x py-16 md:py-24">
        {members.length > 0 ? (
          <>
            <p className="mb-8 text-sm font-semibold text-ink/60">
              {members.length} membre{members.length > 1 ? 's' : ''}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m, i) => (
                // Délai d'apparition plafonné : la liste peut être longue.
                <Reveal key={m._id} delay={Math.min(i, 8) * 60}>
                  <div className="card card-hover flex h-full flex-col items-center p-6 text-center">
                    {m.photo ? (
                      <Image
                        src={urlForImage(m.photo).width(240).height(240).fit('crop').url()}
                        alt={m.name}
                        width={120}
                        height={120}
                        className="h-28 w-28 rounded-full object-cover"
                      />
                    ) : (
                      <div className="grid h-28 w-28 place-items-center rounded-full brand-gradient font-display text-3xl text-white">
                        {initials(m.name)}
                      </div>
                    )}
                    <h3 className="mt-4 font-semibold">{m.name}</h3>
                    {m.role && <p className="mt-1 text-sm font-semibold text-emerald">{m.role}</p>}
                    {m.company && <p className="mt-1 text-sm text-ink/60">{m.company}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <div className="card p-10 text-center">
              <p className="text-ink/60">
                Les membres seront affichés ici dès leur ajout dans l&apos;espace
                d&apos;administration.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl brand-gradient-anim p-8 sm:p-10">
            <div>
              <h2 className="font-display text-2xl uppercase text-white sm:text-3xl">
                Devenez membre
              </h2>
              <p className="mt-2 text-white/90">
                Rejoignez l&apos;APSED et participez au développement du sport corporatif.
              </p>
            </div>
            <Link href="/rejoindre" className="btn bg-white text-ink hover:bg-white/90">
              Adhérer à l&apos;APSED
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
