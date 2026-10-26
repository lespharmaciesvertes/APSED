import { groq } from 'next-sanity';

/* ------------------------- ÉVÉNEMENTS ------------------------- */

export const allEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    excerpt,
    coverImage,
    status
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    excerpt,
    coverImage
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    excerpt,
    coverImage,
    body,
    status
  }
`;

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`;

/* ------------------------- ACTUALITÉS ------------------------- */

export const allNewsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage
  }
`;

export const latestNewsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage,
    body
  }
`;

export const newsSlugsQuery = groq`
  *[_type == "newsPost" && defined(slug.current)][].slug.current
`;

/* ------------------------- PARTENAIRES ------------------------- */

export const allPartnersQuery = groq`
  *[_type == "partner"] | order(order asc, name asc) {
    _id, name, logo, level, website, description
  }
`;

/* ------------------------- GALERIE ------------------------- */

export const allAlbumsQuery = groq`
  *[_type == "galleryAlbum"] | order(date desc) {
    _id, title, "slug": slug.current, date, coverImage,
    "imageCount": count(images)
  }
`;

export const albumBySlugQuery = groq`
  *[_type == "galleryAlbum" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, date, coverImage, images, videos
  }
`;

export const albumSlugsQuery = groq`
  *[_type == "galleryAlbum" && defined(slug.current)][].slug.current
`;

/* ------------------------- DOCUMENTS ------------------------- */

export const allResourcesQuery = groq`
  *[_type == "resource"] | order(order asc, title asc) {
    _id, title, description,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }
`;
