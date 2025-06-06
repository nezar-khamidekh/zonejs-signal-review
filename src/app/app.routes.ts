import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'zonejs',
    children: [
      {
        path: 'counter',
        loadComponent: () =>
          import('./zonejs/counter/counter.component').then(c => c.CounterComponent),
      },
      {
        path: 'table',
        loadComponent: () => import('./zonejs/table/table.component').then(c => c.TableComponent),
      },
      {
        path: 'tree',
        loadComponent: () => import('./zonejs/tree/tree.component').then(c => c.TreeComponent),
      },
    ],
  },
  {
    path: 'signals',
    children: [
      {
        path: 'counter',
        loadComponent: () =>
          import('./signals/counter/counter.component').then(c => c.CounterComponent),
      },
      {
        path: 'table',
        loadComponent: () => import('./signals/table/table.component').then(c => c.TableComponent),
      },
      {
        path: 'tree',
        loadComponent: () => import('./signals/tree/tree.component').then(c => c.TreeComponent),
      },
    ],
  },
];
