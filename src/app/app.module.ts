import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// services
import { WeatherService } from './_services/weather.service';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { HeaderComponent } from './header/header.component';
import { FiveDaysComponent } from './five-days/five-days.component';
import { SearchComponent } from './search/search.component';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng2-chars
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CurrentDayComponent,
    HeaderComponent,
    FiveDaysComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
