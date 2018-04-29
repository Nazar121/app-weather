import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { min } from 'rxjs/operator/min';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  lang: string;

  constructor() { }

  ngOnInit() {
    this.lang = 'EN';
  }

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
  }

}
