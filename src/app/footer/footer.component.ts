import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';

// services
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  footer: object;

  constructor(
    private langService: LangService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // listening language
    this.store.select('language').subscribe(res => {
      const lang = res.lang;
      this.langService.getDictionary(lang.toLocaleLowerCase()).subscribe(res => {
        this.footer = res.footer;
      });
    });
  }

}
