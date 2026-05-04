import { ProjectContent } from '../models/site-content.model';

// Add new projects here. Every new item appears automatically in home and detail pages.
export const projectsData: ProjectContent[] = [
  {
    slug: 'glam-pavilion',
    title: 'Glam Pavilion',
    location: 'San Polo di Piave',
    country: 'IT',
    type: 'Pavilion',
    area: '50 m2',
    year: '2019',
    coordinates: {
      latitude: '23.111111',
      longitude: '13.393467',
    },
    teaser: 'Temporary timber structure for performances, shade, and slow public rituals.',
    body:
      'Glam Pavilion is a mock project entry used to shape the editorial rhythm of the site. The pavilion is imagined as a lightweight timber frame wrapped by translucent drapery, able to work as an open-air room by day and a luminous marker by night. The text is intentionally provisional, but the structure of the content already mirrors the final schema: title, coordinates, factual data, a short introduction, a longer body, and a linear gallery with fixed proportions.',
    details: [
      'Modular timber bays assembled on site.',
      'Textile enclosure calibrated for shade and glare.',
      'Temporary footprint designed for civic reuse.',
    ],
    images: [
      {
        id: 'glam-pavilion-01',
        src: '/mock/images/yellow.svg',
        alt: 'Yellow portrait mock image',
        caption: 'Entry elevation and textile threshold.',
        orientation: 'portrait',
      },
      {
        id: 'glam-pavilion-02',
        src: '/mock/images/green.svg',
        alt: 'Green portrait mock image',
        caption: 'Timber frame under soft light.',
        orientation: 'portrait',
      },
      {
        id: 'glam-pavilion-03',
        src: '/mock/images/stone.svg',
        alt: 'Stone landscape mock image',
        caption: 'Interior depth and shadow play.',
        orientation: 'landscape',
      },
      {
        id: 'glam-pavilion-04',
        src: '/mock/images/blue.svg',
        alt: 'Blue landscape mock image',
        caption: 'Civic facade facing the square.',
        orientation: 'landscape',
      },
      {
        id: 'glam-pavilion-05',
        src: '/mock/images/graphite.svg',
        alt: 'Graphite portrait mock image',
        caption: 'Circulation spine and edge condition.',
        orientation: 'portrait',
      },
      {
        id: 'glam-pavilion-06',
        src: '/mock/images/amber.svg',
        alt: 'Amber landscape mock image',
        caption: 'Perimeter view and evening glow.',
        orientation: 'landscape',
      },
    ],
  },
  {
    slug: 'field-house',
    title: 'Field House',
    location: 'Vicenza',
    country: 'IT',
    type: 'Sports Building',
    area: '420 m2',
    year: '2026',
    coordinates: {
      latitude: '44.908115',
      longitude: '11.872404',
    },
    teaser:
      'Compact sports facility imagined as a sequence of dark volumes facing the landscape.',
    body:
      'Field House is a second mock project introduced to test the sticky coordinates, looping scroll, and desktop-to-mobile transitions of the layout. The architecture is described as a cluster of clear rooflines wrapped in dark cladding, with a community hall and changing rooms opening toward a playing field. The narrative here is also placeholder copy, but it demonstrates how long-form editorial text can sit beside an image carousel without changing the schema.',
    details: [
      'Clustered roof geometry toward the pitch.',
      'Glazed hall opening onto public space.',
      'Robust materials for daily civic use.',
    ],
    images: [
      {
        id: 'field-house-01',
        src: '/mock/images/blue.svg',
        alt: 'Blue landscape mock image',
        caption: 'Overall view across the field.',
        orientation: 'landscape',
      },
      {
        id: 'field-house-02',
        src: '/mock/images/graphite.svg',
        alt: 'Graphite portrait mock image',
        caption: 'Threshold between changing rooms and hall.',
        orientation: 'portrait',
      },
      {
        id: 'field-house-03',
        src: '/mock/images/amber.svg',
        alt: 'Amber landscape mock image',
        caption: 'West facade in late afternoon light.',
        orientation: 'landscape',
      },
      {
        id: 'field-house-04',
        src: '/mock/images/yellow.svg',
        alt: 'Yellow portrait mock image',
        caption: 'Circulation tower and service strip.',
        orientation: 'portrait',
      },
      {
        id: 'field-house-05',
        src: '/mock/images/stone.svg',
        alt: 'Stone landscape mock image',
        caption: 'Terrace edge and public seating.',
        orientation: 'landscape',
      },
      {
        id: 'field-house-06',
        src: '/mock/images/green.svg',
        alt: 'Green portrait mock image',
        caption: 'Vertical circulation and storage edge.',
        orientation: 'portrait',
      },
    ],
  },
];

export function getProjectBySlug(slug: string | null) {
  if (!slug) {
    return null;
  }

  return projectsData.find((project) => project.slug === slug) ?? null;
}
