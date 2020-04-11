import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerBackgroundComponent } from './spinner-background/spinner-background.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    SpinnerBackgroundComponent
  ],
  exports: [
    SpinnerBackgroundComponent
  ],
})
export class SharedModule { }
