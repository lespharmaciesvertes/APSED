import Link from 'next/link';
import Logo from './Logo';
import Socials from './Socials';

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@apsed.dj';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            L&apos;esprit sportif, la force des entreprises. L&apos;APSED œuvre pour la
            promotion du sport en entreprise à Djibouti : cohésion, santé,
            dépassement de soi et rencontres entre acteurs économiques.
          </p>
          <Socials className="mt-6" />
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-lg uppercase tracking-wide text-white">Le site</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/apsed" className="hover:text-white">L&apos;APSED</Link></li>
            <li><Link href="/sport-corporatif" className="hover:text-white">Sport corporatif</Link></li>
            <li><Link href="/activites" className="hover:text-white">Activités</Link></li>
            <li><Link href="/evenements" className="hover:text-white">Projets & événements</Link></li>
            <li><Link href="/antalya-2026" className="hover:text-white">Antalya 2026</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display text-lg uppercase tracking-wide text-white">Ressources</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/partenaires" className="hover:text-white">Partenaires</Link></li>
            <li><Link href="/actualites" className="hover:text-white">Actualités</Link></li>
            <li><Link href="/galerie" className="hover:text-white">Galerie</Link></li>
            <li><Link href="/documents" className="hover:text-white">Documents</Link></li>
            <li><Link href="/rejoindre" className="hover:text-white">Rejoindre</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display text-lg uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Djibouti, République de Djibouti</li>
            <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
            <li><Link href="/contact" className="hover:text-white">Formulaire de contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {year} APSED. Tous droits réservés.</p>
          <p>Conçu et développé par <span className="font-semibold text-white/70">SAIDABDOUGHANEM</span></p>
        </div>
      </div>
    </footer>
  );
}
