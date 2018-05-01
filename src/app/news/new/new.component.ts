import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../../_services/news.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  currentNew: any;
  paramNewId: string;

  constructor(
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

  // Cerrwnt new
  getCurrentNew() {
    this.currentNew = this.newsService.getCurrentNew();
    if (this.currentNew && this.paramNewId === this.currentNew.id) {
      // console.log('currentNew ', this.currentNew);
    } else {
      this.router.navigate([`/news`]);
    }
  }

}
