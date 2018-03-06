import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
  }

}
