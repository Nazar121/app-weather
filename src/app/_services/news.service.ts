import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {

  constructor(
    private http: Http
  ) { }

  getNews() {
    const endpoints = 'top-headlines';
    const country = 'ua';
    const category = 'business';
    const apiKey = '34c2d6a3a7f24018ba488d4bbbe0f7d1';
    // 
      return this.http.get(`https://newsapi.org/v2/${endpoints}?country=${country}&category=${category}&apiKey=${apiKey}`)
          .map(res => {
              {
                return res.json();
              }
          })
          .catch(error => Observable.throw(error.json()));
    }

}
