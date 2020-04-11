import { Routes } from '@angular/router';

import { ProgramsListPage } from './programs/pages/programs-list-page/programs-list.page';
import { PROGRAM_ROUTES } from './programs/router';
import { COACHES_ROUTES } from './coaches/router';
import { AUTH_ROUTES } from './auth/routes';

export const ROUTES: Routes = [
  {
    path     : '',
    component: ProgramsListPage,
  },
  {
    path     : 'program',
    children: PROGRAM_ROUTES,
  },
  {
    path    : 'coach',
    children: COACHES_ROUTES,
  },
  {
    path    : 'auth',
    children: AUTH_ROUTES,
  }
];
