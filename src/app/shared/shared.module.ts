import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
  ]
})
export class SharedModule { }
