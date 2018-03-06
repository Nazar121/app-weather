import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from './_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) {
  }

  ngOnInit() {
  }

}
