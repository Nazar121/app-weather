import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class LangService {

    constructor(
    private http: Http
    ) {}

    // GET dictionary for language
    getDictionary(lang) {
        return this.http.get(`../../json/i18n/${lang}.json`)
        .map( res => {return res.json();} )
        .catch(error => Observable.throw(error.json()));
    }

}