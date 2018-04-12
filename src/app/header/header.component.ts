import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { min } from 'rxjs/operator/min';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  time: any;

  constructor() { }

  ngOnInit() {
    this.nowTime();
  }

  nowTime() {
    setInterval(() => {
      let seconds = new Date().getSeconds();
      let minutes = new Date().getMinutes();
      let hours = new Date().getHours();
      this.time = hours + ':' + minutes + ':' + seconds;
      // console.log(this.time);
    }, 1000);
  }

  reload() {
    window.location.reload();
  }

}
