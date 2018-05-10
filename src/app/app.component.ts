import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // setInterval(() => {console.clear()}, 0);
  }

}
