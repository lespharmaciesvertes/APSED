import { defineField, defineType } from 'sanity';

export const member = defineType({
  name: 'member',
  title: 'Membre adhérent',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom complet', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'photo',
      title: 'Photo',
      description: 'Facultative : sans photo, les initiales sont affichées.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'role', title: 'Fonction', description: 'Ex. : Président, Trésorier… (facultatif)', type: 'string' }),
    defineField({ name: 'company', title: 'Entreprise', type: 'string' }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      description: 'Les plus petits nombres en premier ; à égalité, tri par nom.',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: 'Nom', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'company', media: 'photo' } },
});
