import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // news and pagination
  news: any;
  countPages: any = [];
  numberPage: number;

  // filter news
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
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    // SET number page
    if ( this.newsService.getNumberPage() ) {
      this.numberPage = this.newsService.getNumberPage();
    } else {
      this.numberPage = 1;
    }

    // FILTER news
    if (this.newsService.getFilterNews()) {
      this.searchCountry = this.newsService.getFilterNews().searchCountry;
      this.searchCategory = this.newsService.getFilterNews().searchCategory;
    } else {
      this.newsService.setFilterNews({searchCountry: this.searchCountry, searchCategory: this.searchCategory});
    }

    this.newsService.removeCurrentNew();
    this.changeSearch();
  }

  // GET news
  getNews(data) {
    this.newsService.getNews(data).subscribe(res => {
      // console.log('res ', res);
      this.news = res;
      this.news.articles.map( (obj, index) => {
        obj['id'] = obj.title.replace(/\s/g, "-");
        obj['id'] = obj['id'].toLowerCase();
      });

      // pagination
      this.pagination();
    }, error => { console.log(error); });
  }

  // SEARCH
  changeSearch() {
    let data = {};

    // SET filter
    this.newsService.setFilterNews({searchCountry: this.searchCountry, searchCategory: this.searchCategory});

    this.countries.map(obj => {
      if (obj.en === this.searchCountry) {
        data['code'] = obj.code;
      }
    });

    data['category'] = this.searchCategory;

    // console.log('data ', data);
    this.getNews(data);
  }

  // click on current new
  currentNew(obj) {
    // console.log('new ', obj);
    this.newsService.setCurrentNew(obj);
    this.router.navigate([`${this.router.url}/new/${obj.id}`]);
  }

  // Pagination
  pagination() {
    const maxNewsOnPage = 4;
    this.changePage(this.numberPage);
    this.countPages = [];
    let count = {
      pages: 0,
      news: []
    };
    let index = 1;
    this.news.articles.map((obj) => {
      count.news.push(index);
      count.pages = index;
      obj['page'] = index;
      if ( count.news.length === maxNewsOnPage ) {
        index++;
        count.news = [];
      }
    });
    for(let i =1; i <= count.pages; i++) {
      this.countPages.push(i);
    }
  }

  // change page
  changePage(page) {
    window.scrollTo(0, 0);
    if ( typeof page === 'string' ) {
      switch(page) {
        case '+1':
          ( this.numberPage === this.countPages.length ) ? this.numberPage = this.countPages.length : this.numberPage++;
          break;
        case '-1':
          ( this.numberPage === 1 ) ? this.numberPage = 1 : this.numberPage--;
          break;
        default:
          this.numberPage = 1;
          break;
      }
    } else if ( typeof page === 'number' ) {
      this.numberPage = +page;
    } else {
      console.error(`Page isn't a number type!!!`);
      this.numberPage = 1;
    }
    this.newsService.setNumberPage(this.numberPage);
  }

}
