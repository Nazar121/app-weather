import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-five-days',
  templateUrl: './five-days.component.html',
  styleUrls: ['./five-days.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiveDaysComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Input() searchCity: string;

  // lineChart
  // public lineChartData: Array<any> = [[6, 10, 0, -0, -1]];
  public lineChartData: Array<any> = [];
  // public lineChartLabels: Array<any> = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
  public lineChartLabels: Array<any> = [];
  public lineChartType: string = 'line';

  // data weathe
  data: any = [];

  // days
  arrDays: any = [];
  indexDay: number;
  city: string;

  // chart on five - six days
  arrChartDays: any = [];
  test2: any = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.fiveDaysWeather(this.searchCity);
  }

  test() {
    console.log('test child');
  }

  // line charts
  public chartClicked(e: any): void {
    // console.log(e);
  }
  public chartHovered(e: any): void {
    // console.log(e);
  }

  // weather on 5 days
  fiveDaysWeather(searchCity) {
    this.arrDays = [];
    this.weatherService.fiveDaysWeather(searchCity).
      subscribe(
        data => {
          this.data = data;
          this.city = this.data.city.name;
          // console.log(this.data);
          let i = 0;
          let bool = false;
          this.arrDays.push({date: {}, list: []});
          this.data.list.map(obj => {
            let date =  new Date(obj.dt_txt);
            // if time = 00:00, then this is a new day
            if ( date.getHours() ===  0 ) {
              i++;
              this.arrDays.push({date: {}, list: []});
            }
            // set properties of the day
            this.arrDays[i].date = {
              id: i,
              day: this.weatherService.getDays()[date.getDay()],
              number: date.getDate(),
              month: this.weatherService.getMonth()[date.getMonth()]
            };
            // default active day
            console.log('i ', i);
            if ( i === 1 ) {
              if ( this.arrDays[i].date.id ) {
                this.arrDays[i].date.active = true;
                this.indexDay = i;
              } else {
                this.arrDays[i].date.active = false;
                bool = true;
              }
            } else {
              if ( bool ) {
                this.arrDays[i].date.active = true;
                this.indexDay = i;
                bool = false;
              } else {
                this.arrDays[i].date.active = false;
              }
            }
            // set property time
            obj.time = date.getHours() + ':00';
            // update properties
            obj.main.temp = Math.round(obj.main.temp) > 0 ? `+${Math.round(obj.main.temp)}` : `${Math.round(obj.main.temp)}`;
            obj.main.pressure = Math.round(obj.main.pressure);
            obj.wind.speed = Math.round(obj.wind.speed);
            // push object with the weather this day
            this.arrDays[i].list.push(obj);
          });
           console.log('arrDays ', this.arrDays);
          // functions
          this.chartOnFiveDays();
        },
        error => {});
  }

  // index day active? true : false
  onIndexDay(id) {
    this.indexDay = id;
    this.arrDays.map(obj => {
      if (obj.date.id === id) {
        obj.date.active = true;
      } else {
        obj.date.active = false;
      }
    });
  }

  // charts on 5 days
  chartOnFiveDays() {
    this.arrChartDays = [];
    this.lineChartLabels = [];
    // console.log('Days ', this.arrDays);
    this.arrDays.map(day => {
      let tempDay = 0;
      // console.log('day ', day);
      if ( day.list.length > 0 ) {
        // console.log('day ', day);
        day.list.map(hour => {
          let int = +hour.main.temp;
          tempDay = tempDay + int;
          // console.log(tempDay);
        });
        tempDay = tempDay / day.list.length;
        this.arrChartDays.push({temp: Math.round(tempDay), day: day.date.day});
      }
    });
    this.arrChartDays.map(obj => {
      this.test2.push(obj.temp);
      this.lineChartLabels.push(obj.day);
    });
    // this.lineChartData.push(this.test2);
    this.lineChartData = this.test2;
    // console.log('arrChartDays ', this.arrChartDays);
  }

  // vhange city charts on 5 days
  public changeCityCharts(): void {
    this.lineChartData.splice(0, 5);
  }

}
