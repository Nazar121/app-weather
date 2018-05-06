import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { min } from 'rxjs/operator/min';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { ChangeLan } from '../redux/lang.action';

// services
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  // date
  lang: string;
  header: object;

  constructor(
    private langService: LangService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // listening language
    this.store.select('language').subscribe(res => {
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.header = res.header;
      });
    });
  }

  // Change lang
  changeLang(lang) {
    lang = lang.toUpperCase();
    switch(lang) {
      case 'EN':
        this.lang = lang;
        break;
      case 'UKR':
        this.lang = lang;
        break;
      case 'RU':
        this.lang = lang;
        break;
      default:
        this.lang = 'EN';
        break;
    }
    this.store.dispatch(new ChangeLan(lang.toUpperCase()));
  }

}
