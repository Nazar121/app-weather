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
  countries: any = [
    { code: 'us', en: 'United States', ua: 'Сполучені Штати' },
    { code: 'gb', en: 'United Kingdom', ua: 'Об"єднане Королівство' },
    { code: 'de', en: 'Germany', ua: 'Німеччина' },
    { code: 'ua', en: 'Ukraine', ua: 'Україна' },
    { code: 'ru', en: 'Russia', ua: 'Росія' }
  ];
  categories: any = [
    { en: 'Business', ua: 'Бізнес' },
    { en: 'Technology', ua: 'Технології' },
    { en: 'Science', ua: 'Наука' },
    { en: 'Health', ua: 'Здоров"я' },
    { en: 'Sports', ua: 'Спорт' },
    { en: 'Entertainment', ua: 'Розваги' }
  ];
  searchCountry: string = 'Ukraine';
  searchCategory: string = 'Business';

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.changeSearch();
  }

  // GET news
  getNews(data) {
    this.newsService.getNews(data).subscribe(res => {
      console.log('res ', res);
      this.news = res;
    }, error => { console.log(error); });
  }

  // SEARCH
  changeSearch() {
    let data = {};

    this.countries.map(obj => {
      if (obj.en === this.searchCountry) {
        data['code'] = obj.code;
      }
    });

    data['category'] = this.searchCategory;

    console.log('data ', data);
    this.getNews(data);
  }

}
