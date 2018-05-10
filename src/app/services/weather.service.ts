import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(
    private http: Http
  ) { }

  // GET current day weather
  currentDayWeather(obj: any) {
    switch(obj.lang.toLowerCase()) {
      case 'uk':
        obj.lang = 'ua';
        break;
      default:
        obj.lang;
        break;
    }
    const city = obj.searchCity;
    const countryCode = obj.countryCode;
    const units = 'units=metric';
    const lang = `lang=${obj.lang.toLowerCase()}`;
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&${units}&${lang}&${appid}`)
        .map(res => {
            {
              return res.json();
            }
        })
        .catch(error => Observable.throw(error.json()));
  }

  // GET some days weather
  fiveDaysWeather(obj: any) {

    switch(obj.lang.toLowerCase()){
      case 'uk':
        obj.lang = 'ua';
        break;
      default:
        break;
    }

    const city = obj.searchCity;
    const countryCode = obj.countryCode;
    const units = 'units=metric';
    const lang = `lang=${obj.lang.toLowerCase()}`;
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&${units}&${lang}&${appid}`)
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

  // SET weather to SessionStorage 
  setWeather(data) {
    sessionStorage.setItem('weather', JSON.stringify(data));
  }

  // GET weather with SessionStorage 
  getWeather() {
    return JSON.parse(sessionStorage.getItem('weather'));
  }

}
