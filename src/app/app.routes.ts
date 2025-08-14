import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  {
    title: 'Test',
    path: '',
    component: HomePage,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
