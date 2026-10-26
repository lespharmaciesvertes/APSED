'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { DOCUMENTS_PAGE_ID } from './sanity/lib/documentSlots';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'APSED — Administration',
  schema: {
    types: schemaTypes,
    // « Page Documents » est unique : pas de bouton « créer » pour ce type.
    templates: (prev) => prev.filter((t) => t.schemaType !== DOCUMENTS_PAGE_ID),
  },
  document: {
    // Ni dupliquer ni supprimer la Page Documents.
    actions: (prev, { schemaType }) =>
      schemaType === DOCUMENTS_PAGE_ID
        ? prev.filter((a) => !['duplicate', 'delete', 'unpublish'].includes(a.action ?? ''))
        : prev,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            // Accès direct aux 6 emplacements de la page Documents.
            S.listItem()
              .title('Page Documents (6 fichiers)')
              .id(DOCUMENTS_PAGE_ID)
              .child(S.document().schemaType(DOCUMENTS_PAGE_ID).documentId(DOCUMENTS_PAGE_ID)),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== DOCUMENTS_PAGE_ID),
          ]),
    }),
    // Vision : outil d'exploration GROQ (utile en admin).
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
