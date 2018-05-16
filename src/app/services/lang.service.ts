import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class LangService {

    constructor(
    private http: HttpClient
    ) {}

    // GET dictionary for language
    getDictionary(lang) {
        return this.http.get(`../../assets/json/lang/${lang}.json`)
        .map( res => res )
        .catch(error => Observable.throw(error.json()));
    }

    // SET lang to LocalStorage
    setLang(lang) {
        localStorage.setItem('lang', lang.toLowerCase());
    }

    // GET lang to LocalStorage
    getLang() {
        return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    }

}