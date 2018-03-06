import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(
    private http: Http
  ) { }

  getMonth() {
    return [
      'Січня',
      'Лютого',
      'Березня',
      'Квітня',
      'Травня',
      'Червня',
      'Липня',
      'Серпня',
      'Вересня',
      'Жовтня',
      'Листопада',
      'Грудня'
    ];
  }

  getDays() {
    return [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'Пятниця',
      'Субота',
    ];
  }

  currentDayWeather(searchCity) {
    const city = searchCity;
    const units = 'units=metric';
    const lang = 'lang=ua';
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&${units}&${lang}&${appid}`)
        .map(res => {
            {
              return res.json();
            }
        })
        .catch(error => Observable.throw(error.json()));
  }

  fiveDaysWeather(nameCity: string) {
    const city = nameCity;
    const units = 'units=metric';
    const lang = 'lang=ua';
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&${units}&${lang}&${appid}`)
        .map(res => {
            {
              return res.json();
            }
        })
        .catch(error => Observable.throw(error.json()));
  }

  // GET all list countries
  getCountryList() {
    return this.http.get('../../json/country.list.json')
      .map(res => {
        {
          return res.json();
        }
      })
      .catch(error => Observable.throw(error.json()));
  }

  // GET all list cities
  getCityList(searchCountry) {
    let allCities: any;
    let cityList: any = [];
    return this.http.get('../../json/city.list.json')
      .map(res => {
        {
          allCities = res.json();
          allCities.map(obj => {
            if ( obj.country === searchCountry.code ) {
              cityList.push(obj);
            }
          });
          return cityList;
        }
      })
      .catch(error => Observable.throw(error.json()));
  }

}
