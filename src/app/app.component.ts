import {Component, OnInit} from '@angular/core';
import {RobotService} from './robot.service';
// import * as Typed from 'typed.js';
// import * as Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  typed = null;
  messages = [];
  question = {};

  constructor(private robotService: RobotService) {
  }

  ngOnInit() {

    const answer = {id: null, 'answers': {}, context: 'suitability'};
    this.robotService.updateRobot(answer)
      .subscribe(result => {
        this.messages.push(...result.messages);
        this.question = result;

        console.log(this.messages);
        // this.typed = new Typed('.typed', {
        //   strings: this.messages.map(v => v.value ),
        //   smartBackspace: false, // Default value,
        //   // onComplete: (a) => console.log(a),
        //   // on: (a) => console.log(a),
        // });
        console.log(this.typed);
      });
  }

/*
  addToTyped(str) {
    // console.log(this.typed, str);
    this.typed.strings.push('filho da policia');
  }
*/
}
