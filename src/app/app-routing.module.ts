import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostCreateComponent } from "./coaches/post-create/post-create.component";

import { AuthGuard } from "./auth/auth.guard";
import { CoachesListComponent } from "./coaches/coaches-list/coaches-list.component";

const routes: Routes = [
  { path: "", component: CoachesListComponent },
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard]
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
