import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import Socials from '@/components/Socials';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez l\u2019APSED : formulaire, e-mail, WhatsApp, Google Maps et réseaux sociaux.',
};

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@apsed.dj';
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Une question, un projet d'événement, un partenariat ? Écrivez-nous, nous revenons vers vous rapidement."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              <div className="card p-6">
                <h3 className="font-display text-lg uppercase">Coordonnées</h3>
                <ul className="mt-4 space-y-3 text-sm text-ink/70">
                  <li>
                    <span className="font-semibold text-ink">E-mail : </span>
                    <a href={`mailto:${email}`} className="text-emerald hover:underline">{email}</a>
                  </li>
                  {whatsapp && (
                    <li>
                      <span className="font-semibold text-ink">WhatsApp : </span>
                      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">+{whatsapp}</a>
                    </li>
                  )}
                  <li><span className="font-semibold text-ink">Zone : </span>Djibouti, République de Djibouti</li>
                </ul>
                <div className="mt-5 border-t border-ink/10 pt-5">
                  <p className="mb-3 text-sm font-semibold text-ink">Suivez-nous</p>
                  <div className="[&_a]:bg-ink/5 [&_a]:text-ink">
                    <Socials />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <MapEmbed />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
