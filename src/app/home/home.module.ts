import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ng2-chars
import { ChartsModule } from 'ng2-charts';

// components
import { HomeComponent } from './home.component';
import { FiveDaysComponent } from './five-days/five-days.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { SearchComponent } from './search/search.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ChartsModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    HomeComponent,
    FiveDaysComponent,
    CurrentDayComponent,
    SearchComponent
  ]
})
export class HomeModule { }
