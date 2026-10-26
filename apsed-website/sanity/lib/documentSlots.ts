/**
 * Les 6 documents fixes de la page « Documents utiles » (titres et textes du site).
 * Fichier sans dépendance au Studio : importable par le site et par le schéma.
 * Emplacement sans fichier => la carte affiche « Sur demande ».
 */
export const documentSlots = [
  { key: 'plaquette', title: 'Plaquette de présentation', description: 'Présentation générale de l’APSED et de ses missions.' },
  { key: 'sponsoring', title: 'Dossier de sponsoring', description: 'Offres et formules pour les sponsors et partenaires.' },
  { key: 'note', title: 'Note conceptuelle', description: 'Le projet du sport corporatif à Djibouti expliqué.' },
  { key: 'reglement', title: 'Règlement des compétitions', description: 'Règles applicables aux tournois interentreprises.' },
  { key: 'charte', title: 'Charte de conduite', description: 'Fair-play, respect et valeurs de l’association.' },
  { key: 'adhesion', title: 'Formulaire d’adhésion', description: 'Pour les entreprises souhaitant rejoindre l’APSED.' },
] as const;

export const DOCUMENTS_PAGE_ID = 'documentsPage';
