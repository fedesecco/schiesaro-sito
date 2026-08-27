import { ProjectContent } from '../models/site-content.model';

export const projectsData: ProjectContent[] = [
  {
    slug: 'lff',
    title: 'LFF',
    images: [
      {
        id: 'lff-front-view',
        src: '/projects/04_LFF/lff-front-view.jpg',
        alt: 'LFF installation seen from the front in a dark interior',
        orientation: 'landscape',
        width: 1771,
        height: 1181,
      },
      {
        id: 'lff-overhead-view',
        src: '/projects/04_LFF/lff-overhead-view.jpg',
        alt: 'LFF installation seen from above in a dark interior',
        orientation: 'landscape',
        width: 1772,
        height: 1181,
      },
      {
        id: 'lff-structural-drawing',
        src: '/projects/04_LFF/lff-structural-drawing.jpg',
        alt: 'LFF drawing showing the folded roof structure and modular frame',
        orientation: 'landscape',
        width: 1772,
        height: 1180,
      },
    ],
  },
  {
    slug: 'velo',
    title: 'VELO',
    location: 'Milan',
    country: 'IT',
    type: 'Office',
    area: '135 m²',
    year: '2024',
    coordinates: {
      latitude: '45.446972',
      longitude: '9.155444',
    },
    teaser:
      'A device that reshapes space, shifting from the flow of daily work to the atmosphere of an event.',
    body: [
      'Velo is a device that reshapes space, shifting from the flow of daily work to the atmosphere of an event. A composition of ice-grey curtains evokes a setting suspended between stage and laboratory, a subtle gesture that refines complexity into a clinical surface, where the content becomes the actor.',
      'The three curtains can either cancel or reveal the space, fully or partially, allowing its original articulation and domestic scale to re-emerge. When completely closed, they build a new volume on a different scale, a double height that evokes the atmosphere of an exposition space.',
      'The curtain system is modular, removable, and adaptable to other contexts. This flexibility adds a layer of sustainability and reusability, allowing the installation to evolve with different spaces and needs over time.',
    ],
    images: [
      {
        id: 'velo-curtain-room',
        src: '/projects/08_VELO/velo-curtain-room.jpg',
        alt: 'Ice-grey curtains forming an interior room with a window and suspended ceiling panels',
        orientation: 'landscape',
        width: 6235,
        height: 4157,
      },
      {
        id: 'velo-stair-partition',
        src: '/projects/08_VELO/velo-stair-partition.jpg',
        alt: 'Ice-grey curtain wall opening onto a stair inside the office',
        orientation: 'landscape',
        width: 6235,
        height: 4157,
      },
      {
        id: 'velo-partition-stair',
        src: '/projects/08_VELO/velo-partition-stair.jpg',
        alt: 'Curtain partition and stair seen from the office floor',
        orientation: 'landscape',
        width: 6235,
        height: 4157,
      },
      {
        id: 'velo-office-revealed',
        src: '/projects/08_VELO/velo-office-revealed.jpg',
        alt: 'Open office and meeting area revealed behind the curtain installation',
        orientation: 'landscape',
        width: 6235,
        height: 4157,
      },
      {
        id: 'velo-mobile-table',
        src: '/projects/08_VELO/velo-mobile-table.jpg',
        alt: 'Ice-grey curtains beside a mobile aluminium table',
        orientation: 'portrait',
        width: 4159,
        height: 5822,
      },
      {
        id: 'velo-modular-floor',
        src: '/projects/08_VELO/velo-modular-floor.jpg',
        alt: 'Detail of the modular floor and curtain installation',
        orientation: 'portrait',
        width: 4160,
        height: 5824,
      },
      {
        id: 'velo-aluminium-structure',
        src: '/projects/08_VELO/velo-aluminium-structure.jpg',
        alt: 'Aluminium shelving structure set against the ice-grey curtains',
        orientation: 'portrait',
        width: 4160,
        height: 5824,
      },
      {
        id: 'velo-garden-edge',
        src: '/projects/08_VELO/velo-garden-edge.jpg',
        alt: 'Vines growing beside the curtain installation at the edge of the office',
        orientation: 'portrait',
        width: 4160,
        height: 6240,
      },
      {
        id: 'velo-plan',
        src: '/projects/08_VELO/velo-plan.jpg',
        alt: 'Velo plan drawing showing the office layout and stair',
        orientation: 'landscape',
        width: 1772,
        height: 1182,
      },
      {
        id: 'velo-curtain-layout',
        src: '/projects/08_VELO/velo-curtain-layout.jpg',
        alt: 'Velo drawing showing the curtain layout in elevation',
        orientation: 'landscape',
        width: 1772,
        height: 1182,
      },
    ],
  },
];

export function getProjectBySlug(slug: string | null): ProjectContent | null {
  if (!slug) {
    return null;
  }

  return projectsData.find((project) => project.slug === slug) ?? null;
}
