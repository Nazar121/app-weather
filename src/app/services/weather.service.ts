import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(
    private http: HttpClient
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
    const formatted_address = obj.formatted_address;
    const units = 'units=metric';
    const lang = `lang=${obj.lang.toLowerCase()}`;
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${formatted_address}&${units}&${lang}&${appid}`)
        .map(res => res)
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
    const formatted_address = obj.formatted_address;
    const units = 'units=metric';
    const lang = `lang=${obj.lang.toLowerCase()}`;
    const appid = 'APPID=6b16f4a9bc410f8962909f0dbd2b6649';
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${formatted_address}&${units}&${lang}&${appid}`)
        .map(res => res)
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

  // geocode(data) {
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&location_type=APPROXIMATE&result_type=locality&language=en-US&key=AIzaSyBYCMDQc5Jtow1QUVUgdxSchuxjw7m-PuY`)
  //       .map(res => res)
  //       .catch(error => Observable.throw(error.json()));
  // }

}
