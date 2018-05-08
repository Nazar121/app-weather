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
  header: any;

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
    lang = lang.toLowerCase();
    switch(lang) {
      case 'en':
        this.lang = lang;
        break;
      case 'uk':
        this.lang = lang;
        break;
      case 'ru':
        this.lang = lang;
        break;
      default:
        this.lang = 'en';
        break;
    }
    this.lang = this.lang.toLowerCase();
    this.langService.setLang(this.lang);
    this.store.dispatch(new ChangeLan(lang.toLowerCase()));
  }

}
