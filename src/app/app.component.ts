import {Component, OnInit} from '@angular/core';
import * as data from './suitability.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discovery your profile';
  typed = null;
  survey: any[];
  reply: any = {};

  constructor() {}

  ngOnInit() {
    // init survey data
    this.survey = <any>data;
  }
}
