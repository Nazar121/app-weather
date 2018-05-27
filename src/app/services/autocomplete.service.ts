import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AutocompleteService {

  constructor(
    private http: HttpClient
  ) { }

  // SET settings map to lacalStorage
  setSettingsMap(settings) {
    localStorage.setItem('settingsMap', JSON.stringify(settings));
  }

  // GET settings map with lacalStorage
  getSettingsMap() {
    return JSON.parse(localStorage.getItem('settingsMap'));
  }

}
