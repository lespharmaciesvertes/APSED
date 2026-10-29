import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { client } from '@/sanity/lib/client';
import { documentsPageQuery } from '@/sanity/lib/queries';
import { documentSlots } from '@/sanity/lib/documentSlots';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Documents utiles',
  description:
    'Plaquette de présentation, dossier de sponsoring, règlements, charte et formulaires de l’APSED.',
};

type FileRef = { url: string; originalFilename?: string } | null;

export default async function DocumentsPage() {
  // Fichiers déposés dans le Studio (Page Documents), par emplacement.
  let files: Record<string, FileRef> = {};
  try {
    files = (await client.fetch(documentsPageQuery)) || {};
  } catch {
    files = {};
  }

  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Documents utiles"
        subtitle="Les documents à disposition des entreprises, partenaires, sponsors et membres."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {documentSlots.map((d, i) => {
            const file = files[d.key];
            return (
              <Reveal key={d.key} delay={i * 70}>
                <div className="card card-hover flex h-full flex-col p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-2xl">
                    <span aria-hidden>📄</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg uppercase">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{d.description}</p>
                  <div className="mt-4">
                    {file?.url ? (
                      <a
                        // « ?dl= » force le téléchargement avec le nom d'origine du fichier.
                        href={`${file.url}?dl=${encodeURIComponent(file.originalFilename || '')}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:underline"
                      >
                        Télécharger ↓
                      </a>
                    ) : (
                      <Link href="/contact" className="text-sm font-semibold text-magenta">
                        Sur demande →
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-sm text-ink/50">
            Certains documents sont téléchargeables directement, d&apos;autres sont
            communiqués uniquement sur demande.
          </p>
        </Reveal>
      </section>
    </>
  );
}
