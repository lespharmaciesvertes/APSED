import { defineField, defineType } from 'sanity';
import { documentSlots, DOCUMENTS_PAGE_ID } from '../lib/documentSlots';

/** Document unique « Page Documents » : un fichier par emplacement. */
export const documentsPage = defineType({
  name: DOCUMENTS_PAGE_ID,
  title: 'Page Documents',
  type: 'document',
  fields: documentSlots.map((slot) =>
    defineField({
      name: slot.key,
      title: slot.title,
      description: 'Laisser vide pour afficher « Sur demande » sur le site.',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx' },
    }),
  ),
  preview: { prepare: () => ({ title: 'Page Documents (6 fichiers)' }) },
});
