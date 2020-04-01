import { NgModule } from "@angular/core";
import { ProgramsListComponent } from "./programs-list/programs-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ProgramsListComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ProgramsModule {}
