import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { ROUTES } from './router';

@NgModule({
  imports  : [RouterModule.forRoot(ROUTES)],
  exports  : [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
