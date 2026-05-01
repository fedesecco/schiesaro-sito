export type MediaOrientation = 'landscape' | 'portrait';

export interface ProjectMedia {
  id: string;
  src: string;
  alt: string;
  caption: string;
  orientation: MediaOrientation;
}

export interface ProjectCoordinates {
  latitude: string;
  longitude: string;
}

export interface ProjectContent {
  slug: string;
  title: string;
  location: string;
  country: string;
  type: string;
  area: string;
  year: string;
  coordinates: ProjectCoordinates;
  teaser: string;
  body: string;
  details: string[];
  images: ProjectMedia[];
}
