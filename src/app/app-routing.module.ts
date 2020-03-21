import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { CoachesListComponent } from './coaches/coaches-list/coaches-list.component';
import { COACHES_ROUTES } from './coaches/router';

const routes: Routes = [
  { path: '', component: CoachesListComponent, },
  {
    path    : 'coach',
    children: COACHES_ROUTES,
  },
  {
    path        : 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  }
];

@NgModule({
  imports  : [RouterModule.forRoot(routes)],
  exports  : [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
