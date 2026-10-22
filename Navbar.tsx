'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from './Logo';

/** Sous-menu « L'APSED » : tout ce qui présente l'association. */
const aboutLinks = [
  { href: '/apsed', label: 'Qui sommes-nous ?', desc: 'Notre mission et notre équipe' },
  { href: '/sport-corporatif', label: 'Sport corporatif', desc: 'Un levier pour les entreprises' },
  { href: '/activites', label: 'Activités', desc: 'Les disciplines proposées' },
  { href: '/antalya-2026', label: 'Cap sur Antalya 2026', desc: 'Notre projet phare' },
];

/** Liens principaux, affichés directement dans la barre. */
const mainLinks = [
  { href: '/evenements', label: 'Événements' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="currentColor"
    >
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false); // menu mobile
  const [aboutOpen, setAboutOpen] = useState(false); // sous-menu ordinateur
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Referme les menus à chaque changement de page.
  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Touche Échap : referme les menus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setAboutOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const aboutActive = aboutLinks.some((l) => isActive(pathname, l.href));

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
      active ? 'bg-white/15 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-black/10 bg-emerald-dark shadow-md'
          : 'border-white/10 bg-emerald'
      }`}
    >
      <nav className="container-x flex h-[76px] items-center justify-between gap-4">
        <Link href="/" aria-label="Accueil APSED" className="shrink-0">
          <Logo />
        </Link>

        {/* Menu ordinateur */}
        <ul className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          <li
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className={linkClass(aboutActive)}
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((v) => !v)}
            >
              L’APSED
              <Chevron open={aboutOpen} />
            </button>

            {aboutOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <ul className="w-72 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {aboutLinks.map((l) => {
                    const active = isActive(pathname, l.href);
                    return (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className={`block rounded-xl px-4 py-3 transition-colors ${
                            active ? 'bg-emerald/10' : 'hover:bg-sand'
                          }`}
                        >
                          <span className={`block text-sm font-semibold ${active ? 'text-emerald-dark' : 'text-ink'}`}>
                            {l.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink/60">{l.desc}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>

          {mainLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={linkClass(isActive(pathname, l.href))}
                aria-current={isActive(pathname, l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 xl:block">
          <Link href="/rejoindre" className="btn-accent whitespace-nowrap text-sm">
            Nous rejoindre
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/40 text-white xl:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl leading-none">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-emerald-dark xl:hidden">
          <div className="container-x py-4">
            <Link
              href="/"
              className={`block rounded-lg px-3 py-3 font-semibold ${
                pathname === '/' ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              Accueil
            </Link>

            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/60">
              L’APSED
            </p>
            <ul className="mt-1 flex flex-col gap-1">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-lg px-3 py-2.5 pl-6 font-semibold ${
                      isActive(pathname, l.href) ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t border-white/10" />

            <ul className="flex flex-col gap-1">
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-lg px-3 py-3 font-semibold ${
                      isActive(pathname, l.href) ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/rejoindre" className="btn-accent mt-4 w-full">
              Nous rejoindre
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
