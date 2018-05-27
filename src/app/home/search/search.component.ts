import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { retry } from 'rxjs/operator/retry';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ChangeLan } from '../../redux/lang.action';

// services
import { WeatherService } from '../../services/weather.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  // data
  lang: string;

  constructor(
    private store: Store<AppState>,
    private langService: LangService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
     // listening language
     this.store.select('language').subscribe(res => {
      this.lang = res.lang;
    });
  }

}
