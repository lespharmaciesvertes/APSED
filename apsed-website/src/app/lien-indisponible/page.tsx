import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lien indisponible',
  robots: { index: false, follow: false },
};

// Réseaux acceptés dans l'adresse (?reseau=...), pour ne pas afficher n'importe quel texte.
const networks = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube'];

export default function LienIndisponiblePage({
  searchParams,
}: {
  searchParams: { reseau?: string };
}) {
  const reseau = networks.find((n) => n === searchParams.reseau);

  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-7xl text-brand-gradient">Oups</p>
        <h1 className="display-title mt-4 text-3xl">Lien indisponible</h1>
        <p className="mt-3 text-ink/65">
          {reseau
            ? <>La page {reseau} de l&apos;APSED n&apos;est pas encore disponible.</>
            : <>Ce lien n&apos;est pas encore disponible.</>}
          {' '}Revenez bientôt !
        </p>
        <Link href="/" className="btn-accent mt-8">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
