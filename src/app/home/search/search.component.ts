import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { retry } from 'rxjs/operator/retry';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ChangeLan } from '../../redux/lang.action';

// services
import { WeatherService } from '../../services/weather.service';
import { LangService } from '../../services/lang.service';

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
  lang: string;

  // dictionary form
  form: any;

  constructor(
    private store: Store<AppState>,
    private langService: LangService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
     // listening language
     this.store.select('language').subscribe(res => {
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.form = res.pages.home.form;
      });
    });

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
    this.FiveDaysComponent.fiveDaysWeather({searchCity: this.searchCity, countryCode: this.countryCode, lang: this.lang});
    this.FiveDaysComponent.changeCityCharts();
    this.CurrentDayComponent.onCurrentDayWeather({searchCity: this.searchCity, countryCode: this.countryCode, lang: this.lang});
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
        // this.countryCode = '';
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
