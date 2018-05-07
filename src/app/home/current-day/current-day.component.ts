import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ChangeLan } from '../../redux/lang.action';

// services
import { WeatherService } from '../../services/weather.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrentDayComponent implements OnInit {

  @Input() search: any;

  // dictionary data
  dictionaryDay: any;
  days: any;
  months: any;
  noResponse: any;

  // search
  searchCity: string;
  countryCode: string;
  lang: string;

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

  // Not res
  errorRes: boolean = false;

  constructor(
    private store: Store<AppState>,
    private langService: LangService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.searchCity = this.search.searchCity;
    this.countryCode = this.search.countryCode;

    // listening language
    this.store.select('language').subscribe(res => {
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.dictionaryDay = res.pages.home.currentDay;
        this.days = res.date.days;
        this.months = res.date.months;
        this.noResponse = res.noResponse;
        // console.log(this.days);

        // GET weather on day
        this.search['lang'] = this.lang;
        this.onCurrentDayWeather(this.search);
      });
    });

  }

  onCurrentDayWeather(search) {
    this.weatherService.currentDayWeather(search).
    subscribe(
      data => {
        this.errorRes = false;

        const d = new Date();
        this.currentDay = data;
        this.currentDay_day = this.days[d.getDay()];
        this.currentDay_date = d.getDate();
        this.currentDay_month = this.months[d.getMonth()];
        this.currentDay_year = d.getFullYear();
        this.currentDay_img = `https://openweathermap.org/img/w/${this.currentDay.weather[0].icon}.png`;
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

        // console.log('current day weather ', this.currentDay);
      },
      error => {
        this.errorRes = true;
      });
  }

}
