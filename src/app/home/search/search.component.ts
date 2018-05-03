import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { retry } from 'rxjs/operator/retry';

// services
import { WeatherService } from '../../services/weather.service';

// components
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

  // search deafault value
  searchCountry: string = 'Ukraine';
  searchCity: string = 'Lviv';
  countryCode: string = 'UA';

  // data
  countries: any = [];
  cities: any = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.getCountryList();
  }

  onSearch(event) {
    event.stopPropagation();
    event.preventDefault();
    this.cities.map(obj => {
      if ( obj.name.toLowerCase() === this.searchCity.toLowerCase() ) {
        this.searchCity = this.searchCity;
        this.countryCode = obj.country;
      }
    });
    this.FiveDaysComponent.fiveDaysWeather({searchCity: this.searchCity, countryCode: this.countryCode});
    this.FiveDaysComponent.changeCityCharts();
    this.CurrentDayComponent.onCurrentDayWeather({searchCity: this.searchCity, countryCode: this.countryCode});
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
        this.searchCity = this.searchCity;
        this.countryCode = country.code;
        return;
      } else {
        this.countryCode = '';
      }
    });
    this.weatherService.getCityList(country)
      .subscribe(
        res => {
          this.cities = res;
          // console.log('cities ', this.cities);
      },
      error => {});
  }

}
