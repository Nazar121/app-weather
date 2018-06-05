import { Component, OnInit } from '@angular/core';

// SEO
import { Title, Meta } from '@angular/platform-browser';

// store
import { Store } from '@ngrx/store';
import { AppState } from './../redux/app.state';
import { ChangeLan } from './../redux/lang.action';

// services
import { LangService } from './../services/lang.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta,
    private store: Store<AppState>,
    private langService: LangService,
  ) {}

  ngOnInit() {
    
    // listening location
    this.store.select('location').subscribe(res => {
      // title
      this.title.setTitle(`Weather: ${res.city}`);
      // meta
      this.meta.addTags([
        { name: 'description', content: `Weather in ${res.city} for a week. Weather forecast in ${res.city}. Detailed meteorological forecast at ${res.formatted_address}.` },
        { name: 'keywords', content: `weather in ${res.city}, weather forecast in ${res.city}, weather ${res.city}, weather in ${res.city} for a week, ${res.city}, weather, weather forecast, https://weather-com.firebaseapp.com` }
      ]);
    });

  }

}
