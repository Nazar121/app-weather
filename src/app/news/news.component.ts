import { Component, OnInit } from '@angular/core';

// services
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: any;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getNews().subscribe(res => {
      console.log('res ', res);
      this.news = res;
    }, error => { console.log(error); });
  }

}
