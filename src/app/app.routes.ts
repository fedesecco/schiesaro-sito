import { Routes } from '@angular/router';

export const routes: Routes = [
  /* {
    title: 'Test',
    path: '',
    component: HomePage,
  }, */
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
