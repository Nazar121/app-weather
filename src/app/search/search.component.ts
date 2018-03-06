import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { FiveDaysComponent } from '../five-days/five-days.component';
import { CurrentDayComponent } from '../current-day/current-day.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @ViewChild(FiveDaysComponent) FiveDaysComponent: FiveDaysComponent;
  @ViewChild(CurrentDayComponent) CurrentDayComponent: CurrentDayComponent;

  // search
  searchCountry: string = 'Ukraine';
  searchCity: string = 'lviv';

  // data
  countries: any = [];
  cities: any = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.getCountryList();
  }

  onSearch() {
    this.FiveDaysComponent.fiveDaysWeather(this.searchCity);
    this.FiveDaysComponent.changeCityCharts();
    this.CurrentDayComponent.onCurrentDayWeather(this.searchCity);
  }

  getCountryList() {
    this.weatherService.getCountryList()
      .subscribe(
        res => {
          this.countries = res;
          this.getCityList();
          // console.log('country ', this.countries);
      },
      error => {});
  }

  getCityList() {
    let country = {
      name: '',
      code: ''
    };
    this.countries.map(obj => {
      if ( obj.name === this.searchCountry ) {
        country.name = obj.name;
        country.code = obj.code;
      }
    });
    this.weatherService.getCityList(country)
      .subscribe(
        res => {
          this.cities = res;
          console.log('cities ', this.cities);
      },
      error => {});
  }

}
