import { SiteContent } from '../models/site-content.model';

export const siteData = {
  siteTitle: 'KOPIO OFFICE',
  landing: {
    latitude: '33.428956',
    longitude: '6.870023',
    tagline: 'Architecture, interiors, and measured spatial research.',
  },
  home: {
    coordinates: {
      latitude: '45.793591',
      longitude: '12.391915',
    },
    heroPoster: '/mock/media/home-video-still.svg',
    heroLabel: 'Mock hero still for the fullscreen video area',
    heroEyebrow: 'Mock video loop',
  },
  // Add new projects here. Every new item appears automatically in home and detail pages.
  projects: [
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
          src: '/mock/projects/mock-portrait-amber.svg',
          alt: 'Mock portrait composition with warm architectural planes',
          caption: 'Entry elevation and textile threshold.',
          orientation: 'portrait',
        },
        {
          id: 'glam-pavilion-02',
          src: '/mock/projects/mock-portrait-sage.svg',
          alt: 'Mock portrait composition with green architectural blocks',
          caption: 'Timber frame under soft light.',
          orientation: 'portrait',
        },
        {
          id: 'glam-pavilion-03',
          src: '/mock/projects/mock-portrait-graphite.svg',
          alt: 'Mock portrait composition with dark architectural layers',
          caption: 'Interior depth and shadow play.',
          orientation: 'portrait',
        },
        {
          id: 'glam-pavilion-04',
          src: '/mock/projects/mock-landscape-stone.svg',
          alt: 'Mock landscape composition with stone grey volumes',
          caption: 'Civic facade facing the square.',
          orientation: 'landscape',
        },
        {
          id: 'glam-pavilion-05',
          src: '/mock/projects/mock-portrait-amber.svg',
          alt: 'Mock portrait composition reused for circulation view',
          caption: 'Circulation spine and edge condition.',
          orientation: 'portrait',
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
          src: '/mock/projects/mock-landscape-midnight.svg',
          alt: 'Mock landscape composition with dark gabled volumes',
          caption: 'Overall view across the field.',
          orientation: 'landscape',
        },
        {
          id: 'field-house-02',
          src: '/mock/projects/mock-portrait-sage.svg',
          alt: 'Mock portrait composition with sage structural frame',
          caption: 'Threshold between changing rooms and hall.',
          orientation: 'portrait',
        },
        {
          id: 'field-house-03',
          src: '/mock/projects/mock-landscape-amber.svg',
          alt: 'Mock landscape composition with amber light and facade',
          caption: 'West facade in late afternoon light.',
          orientation: 'landscape',
        },
        {
          id: 'field-house-04',
          src: '/mock/projects/mock-portrait-graphite.svg',
          alt: 'Mock portrait composition with graphite massing study',
          caption: 'Circulation tower and service strip.',
          orientation: 'portrait',
        },
        {
          id: 'field-house-05',
          src: '/mock/projects/mock-landscape-stone.svg',
          alt: 'Mock landscape composition with pale stone seating terrace',
          caption: 'Terrace edge and public seating.',
          orientation: 'landscape',
        },
      ],
    },
  ],
  about: {
    coordinates: {
      latitude: '00.000000',
      longitude: '00.000000',
    },
    introduction:
      'Kopio Office is a multidisciplinary studio based in Italy, moving between architecture, interiors, temporary installations, and research-led spatial direction.',
    body:
      'This about page uses mock copy to reproduce the rhythm of the reference layout: a compact block of contacts, then a denser editorial paragraph set in a serif voice. The aim is not to finalize the content today, but to lock the structure and proportions of the page so the final writing can be swapped in later by editing this TypeScript object. The studio description can therefore grow, shrink, or change language without touching templates or component logic.',
    email: 'info@kopiooffice.com',
    cities: ['Milano', 'Vicenza'],
    countryCode: 'IT',
    contacts: [
      {
        name: 'Arch. Riccardo Modolo',
        email: 'riccardo@kopiooffice.com',
        phone: '+39 346 713 6711',
      },
      {
        name: 'Arch. Giacomo Schiesaro',
        email: 'giacomo@kopiooffice.com',
        phone: '+39 351 610 6882',
      },
    ],
  },
} satisfies SiteContent;

export const projectsData = siteData.projects;

export function getProjectBySlug(slug: string | null) {
  if (!slug) {
    return null;
  }

  return projectsData.find((project) => project.slug === slug) ?? null;
}
