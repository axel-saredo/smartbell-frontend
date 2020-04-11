import { Routes } from '@angular/router';
import { CoachProfilePage } from './pages/coach-profile/coach-profile.page';
import { AddProgramPage } from './pages/add-program-page/add-program.page';

export const COACHES_ROUTES: Routes = [
  {
    path     : ':id',
    component: CoachProfilePage,
  },
  {
    path     : ':id/add-program',
    component: AddProgramPage,
  }
];

