import { defineField, defineType } from 'sanity';

/**
 * Document téléchargeable de la page « Documents utiles ».
 * Sans fichier joint, la carte affiche « Sur demande » (lien vers /contact).
 */
export const resource = defineType({
  name: 'resource',
  title: 'Document à télécharger',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Courte description', type: 'text', rows: 2 }),
    defineField({
      name: 'file',
      title: 'Fichier (PDF de préférence)',
      description: 'Laisser vide pour afficher « Sur demande ».',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx' },
    }),
    defineField({ name: 'order', title: 'Ordre d’affichage', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', file: 'file.asset.originalFilename' },
    prepare: ({ title, file }) => ({ title, subtitle: file || 'Sur demande (aucun fichier)' }),
  },
});
