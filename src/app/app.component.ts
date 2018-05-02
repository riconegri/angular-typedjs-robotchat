import {Component, OnInit} from '@angular/core';
import * as data from './suitability.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  typed = null;
  survey: any[];
  reply: any;

  constructor() {}

  ngOnInit() {
    this.title = 'Discovery your profile';
    this.reply = {};
    // init survey data
    this.survey = <any>data;
  }
}
