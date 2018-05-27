import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// agm
import { AgmCoreModule } from '@agm/core';

// ng2-chars
import { ChartsModule } from 'ng2-charts';

// modules
import { SharedModule } from '../shared/shared.module';

// services
import { WeatherService } from '../services/weather.service';
import { AutocompleteService } from '../services/autocomplete.service'; 

// components
import { HomeComponent } from './home.component';
import { FiveDaysComponent } from './five-days/five-days.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { SearchComponent } from './search/search.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYCMDQc5Jtow1QUVUgdxSchuxjw7m-PuY',
      libraries: ["places"]
    }),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    HomeComponent,
    FiveDaysComponent,
    CurrentDayComponent,
    SearchComponent,
    AutocompleteComponent
  ],
  providers: [
    WeatherService,
    AutocompleteService
  ]
})
export class HomeModule { }
