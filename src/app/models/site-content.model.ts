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

export interface LandingContent {
  latitude: string;
  longitude: string;
  tagline: string;
}

export interface HomeContent {
  coordinates: ProjectCoordinates;
  heroPoster: string;
  heroLabel: string;
  heroEyebrow: string;
}

export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

export interface AboutContent {
  coordinates: ProjectCoordinates;
  introduction: string;
  body: string;
  email: string;
  cities: string[];
  countryCode: string;
  contacts: ContactPerson[];
}

export interface SiteContent {
  siteTitle: string;
  landing: LandingContent;
  home: HomeContent;
  projects: ProjectContent[];
  about: AboutContent;
}
