import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoachProfilePage } from './pages/coach-profile/coach-profile.page';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { ProgramsModule } from '../programs/programs.module';
import { AddProgramPage } from './pages/add-program-page/add-program.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoachProfileComponent,
    CoachProfilePage,
    AddProgramPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    ProgramsModule,
    SharedModule
  ],
})
export class CoachesModule {}
