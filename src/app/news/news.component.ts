import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// SEO
import { Title, Meta } from '@angular/platform-browser';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { ChangeLan } from '../redux/lang.action';

// services
import { NewsService } from '../services/news.service';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // dictionary data
  lang: string;
  form: any;
  newsWords: any;
  noResponse: any;

  // Not res
  errorRes: boolean = false;

  // news and pagination
  news: any;
  countPages: any = [];
  numberPage: number;

  // filter news
  countries: any = [
    { code: 'us', en: 'United States', uk: 'Сполучені Штати', ru: 'Соединенные Штаты' },
    { code: 'gb', en: 'United Kingdom', uk: 'Об"єднане Королівство', ru: 'Объединенное Королевство' },
    { code: 'de', en: 'Germany', uk: 'Німеччина', ru: 'Германия' },
    { code: 'ua', en: 'Ukraine', uk: 'Україна', ru: 'Украина' },
    { code: 'ru', en: 'Russia', uk: 'Росія', ru: 'Россия' }
  ];
  categories: any = [
    { en: 'Business', uk: 'Бізнес', ru: 'Бизнес' },
    { en: 'Technology', uk: 'Технології', ru: 'Технологии' },
    { en: 'Science', uk: 'Наука', ru: 'Наука' },
    { en: 'Health', uk: 'Здоров"я', ru: 'Здоровье' },
    { en: 'Sports', uk: 'Спорт', ru: 'Спорт' },
    { en: 'Entertainment', uk: 'Розваги', ru: 'Развлечения' }
  ];
  searchCountry: string = 'Ukraine';
  searchCategory: string = 'Business';

  constructor(
    private title: Title,
    private meta: Meta,
    private langService: LangService,
    private store: Store<AppState>,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    // SEO
    this.seo();

    // listening language
    this.store.select('language').subscribe(res => {
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.form = res.pages.news.form;
        this.newsWords = res.pages.news;
        this.noResponse = res.noResponse;
      });
    });

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
  
  // SEO
  seo() {
    // title
    this.title.setTitle(`News ${this.searchCountry}, ${this.searchCategory}`);
    // meta
    this.meta.addTags([
      { name: 'description', content: `News in ${this.searchCountry} for a day. Top headline news a day in ${this.searchCountry}.` },
      { name: 'keywords', content: `news in ${this.searchCountry}, top headline news a day in ${this.searchCountry}, news ${this.searchCountry}, news a day, ${this.searchCountry}, ${this.searchCategory},news, https://weather-com.firebaseapp.com` }
    ]);
  }

  // GET news
  getNews(data) {
    this.newsService.getNews(data).subscribe(res => {
      this.errorRes = false;
      // console.log('res ', res);
      this.news = res;
      this.news.articles.map( (obj, index) => {
        obj['id'] = obj.title.replace(/\s/g, "-");
        obj['id'] = obj['id'].toLowerCase();
      });

      // pagination
      this.pagination();
    }, error => {
      this.errorRes = true;
      console.log(error); 
    });
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
    this.seo();
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
