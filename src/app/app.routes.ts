import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Kopio Office',
    loadComponent: () =>
      import('./pages/hero/hero').then((m) => m.HeroComponent),
  },
  {
    path: 'home',
    title: 'Kopio Office | Home',
    loadComponent: () =>
      import('./pages/projects/projects').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projects/:slug',
    title: 'Kopio Office | Project',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then(
        (m) => m.ProjectDetailComponent,
      ),
  },
  {
    path: 'about',
    title: 'Kopio Office | About',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
