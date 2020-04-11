import { Routes } from '@angular/router';
import { ProgramDetailComponent } from './components/program-detail/program-detail.component';

export const PROGRAM_ROUTES: Routes = [
  {
    path     : ':id',
    component: ProgramDetailComponent,
  }
];
