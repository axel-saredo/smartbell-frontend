import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { ProgramsListComponent } from "./programs/programs-list/programs-list.component";
import { PROGRAMS_ROUTES } from "./programs/router";
import { ProgramDetailComponent } from "./programs/program-detail/program-detail.component";

const routes: Routes = [
  { path: "", component: ProgramsListComponent },
  {
    path: "program/:id",
    component: ProgramDetailComponent,
    children: PROGRAMS_ROUTES
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
