import { NgModule } from '@angular/core';
import { ProgramsListComponent } from './components/programs-list/programs-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramsListPage } from './pages/programs-list-page/programs-list.page';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProgramsListComponent,
    ProgramsListPage,
    AddProgramComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ProgramsListComponent,
    AddProgramComponent
  ],
})
export class ProgramsModule {}
