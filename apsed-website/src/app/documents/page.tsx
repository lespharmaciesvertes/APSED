import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { client } from '@/sanity/lib/client';
import { allResourcesQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Documents utiles',
  description:
    'Plaquette de présentation, dossier de sponsoring, règlements, charte et formulaires de l’APSED.',
};

type Doc = {
  _id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
};

// Liste affichée tant qu'aucun document n'a été créé dans le Studio.
const fallbackDocs: Doc[] = [
  { _id: 'plaquette', title: 'Plaquette de présentation', description: 'Présentation générale de l’APSED et de ses missions.' },
  { _id: 'sponsoring', title: 'Dossier de sponsoring', description: 'Offres et formules pour les sponsors et partenaires.' },
  { _id: 'note', title: 'Note conceptuelle', description: 'Le projet du sport corporatif à Djibouti expliqué.' },
  { _id: 'reglement', title: 'Règlement des compétitions', description: 'Règles applicables aux tournois interentreprises.' },
  { _id: 'charte', title: 'Charte de conduite', description: 'Fair-play, respect et valeurs de l’association.' },
  { _id: 'adhesion', title: 'Formulaire d’adhésion', description: 'Pour les entreprises souhaitant rejoindre l’APSED.' },
];

export default async function DocumentsPage() {
  let docs: Doc[] = [];
  try {
    docs = await client.fetch(allResourcesQuery);
  } catch {
    docs = [];
  }
  if (docs.length === 0) docs = fallbackDocs;

  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Documents utiles"
        subtitle="Les documents à disposition des entreprises, partenaires, sponsors et membres."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d, i) => (
            <Reveal key={d._id} delay={i * 70}>
              <div className="card card-hover flex h-full flex-col p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-2xl">
                  <span aria-hidden>📄</span>
                </div>
                <h3 className="mt-5 font-display text-lg uppercase">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{d.description}</p>
                <div className="mt-4">
                  {d.fileUrl ? (
                    <a
                      // « ?dl= » force le téléchargement avec le nom d'origine du fichier.
                      href={`${d.fileUrl}?dl=${encodeURIComponent(d.fileName || '')}`}
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
          ))}
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
