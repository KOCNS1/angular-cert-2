import { Routes } from '@angular/router';

export const APP_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async () => await import('./feature/home/home.component'),
  },
  {
    path: 'results/:teamCode',
    loadComponent: async () =>
      await import('./feature/results/result.component'),
  },
];
