import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrentDayComponent implements OnInit {

  @Input() searchCity: string;

  // current day
  currentDay: any = {};
  currentDay_day: string;
  currentDay_date: number;
  currentDay_month: string;
  currentDay_year: number;
  currentDay_img: string;
  currentDay_temp: string;
  currentDay_min_temp: string;
  currentDay_max_temp: string;
  currentDay_city: string;
  currentDay_desc: string;
  currentDay_pressure: number;
  currentDay_humidity: number;
  currentDay_wind: number;

  // select
  select: string = 'info1';

  // Not res
  errorRes: boolean = false;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.onCurrentDayWeather(this.searchCity);
  }

  onSelect(value) {
    this.select = value;
  }

  onCurrentDayWeather(searchCity) {
    this.weatherService.currentDayWeather(searchCity).
    subscribe(
      data => {
        this.errorRes = false;

        const d = new Date();
        this.currentDay = data;
        this.currentDay_day = this.weatherService.getDays()[d.getDay()];
        this.currentDay_date = d.getDate();
        this.currentDay_month = this.weatherService.getMonth()[d.getMonth()];
        this.currentDay_year = d.getFullYear();
        this.currentDay_img = `http://openweathermap.org/img/w/${this.currentDay.weather[0].icon}.png`;
        // tslint:disable-next-line:max-line-length
        this.currentDay_temp = this.currentDay.main.temp > 0 ? `+${Math.round(this.currentDay.main.temp)}` : `${Math.round(this.currentDay.main.temp)}`;
        // tslint:disable-next-line:max-line-length
        this.currentDay_max_temp = this.currentDay.main.temp_max > 0 ? `+${this.currentDay.main.temp_max}` : `${this.currentDay.main.temp_max}`;
        this.currentDay_min_temp = this.currentDay.main.temp_min > 0 ? `+${this.currentDay.main.temp_min}` : `${this.currentDay.main.temp_min}`;
        this.currentDay_city = this.currentDay.name;
        this.currentDay_desc = this.currentDay.weather[0].description;
        this.currentDay_pressure = this.currentDay.main.pressure;
        this.currentDay_humidity = this.currentDay.main.humidity;
        this.currentDay_wind = this.currentDay.wind.speed;

        console.log('current day weather ', this.currentDay);
      },
      error => {
        this.errorRes = true;
      });
  }

}
