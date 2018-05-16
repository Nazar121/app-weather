import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  // GET news
  getNews(data) {
    const endpoints = 'top-headlines';
    const country = data.code;
    const category = data.category;
    const apiKey = '34c2d6a3a7f24018ba488d4bbbe0f7d1';
      return this.http.get(`https://newsapi.org/v2/${endpoints}?country=${country}&category=${category}&apiKey=${apiKey}`)
          .map(res => res)
          .catch(error => Observable.throw(error.json()));
  }

  // SET current new to LS
  setCurrentNew(data) {
    localStorage.setItem('currentNew', JSON.stringify(data));
  }

  // GET current new with LS
  getCurrentNew() {
    return JSON.parse(localStorage.getItem('currentNew'));
  }

  // REMOVE current new
  removeCurrentNew() {
    localStorage.removeItem('currentNew');
  }

  // SET FILTER
  setFilterNews(data) {
    sessionStorage.setItem('filterNews', JSON.stringify(data));
  }

  // GET FILTER
  getFilterNews() {
    return JSON.parse(sessionStorage.getItem('filterNews'));
  }

  // SET NumberPage
  setNumberPage(data) {
    sessionStorage.setItem('numberPage', JSON.stringify(data));
  }

  // GET NumberPage
  getNumberPage() {
    return JSON.parse(sessionStorage.getItem('numberPage'));
  }

  // CLEAR
  clear() {
    sessionStorage.removeItem('filterNews');
    sessionStorage.removeItem('numberPage');
  }

}
