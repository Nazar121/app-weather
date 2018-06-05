import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// SEO
import { Title, Meta } from '@angular/platform-browser';

// services
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  currentNew: any;
  paramNewId: string;

  constructor(
    private title: Title,
    private meta: Meta,
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    // url Get params
    this.route
    .params
    .subscribe(params => {
      this.paramNewId = params.new;
      // console.log('params = ', params);
    });

    // GET new
    this.getCurrentNew();
  }

  // SEO
  seo() {
    // title
    this.title.setTitle(`News: ${this.currentNew.title}`);
    // meta
    this.meta.addTags([
      { name: 'description', content: `News ${this.currentNew.title}.` },
      { name: 'keywords', content: `news ${this.currentNew.title}, news, news a day, ${this.currentNew.title}, https://weather-com.firebaseapp.com` }
    ]);
  }

  // Cerrwnt new
  getCurrentNew() {
    this.currentNew = this.newsService.getCurrentNew();
    if (this.currentNew && this.paramNewId === this.currentNew.id) {
      // SEO
      this.seo();
    } else {
      this.router.navigate([`/news`]);
    }
  }

}
