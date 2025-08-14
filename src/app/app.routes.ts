import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Test',
    path: '',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
