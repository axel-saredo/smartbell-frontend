import { Routes } from "@angular/router";
import { ProgramsListComponent } from "./programs-list/programs-list.component";
import { ProgramDetailComponent } from "./program-detail/program-detail.component";

export const PROGRAMS_ROUTES: Routes = [
  {
    path: "",
    component: ProgramsListComponent
  },
  {
    path: "program/:id",
    component: ProgramDetailComponent
  }
];
