import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Kopio Office',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'home',
    title: 'Kopio Office | Home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'projects/:slug',
    title: 'Kopio Office | Project',
    loadComponent: () =>
      import('./pages/project-detail-page/project-detail-page.component').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
  {
    path: 'about',
    title: 'Kopio Office | About',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
