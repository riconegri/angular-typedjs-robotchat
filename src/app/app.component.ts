import {Component, OnInit} from '@angular/core';
import {Robot} from './robot';
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
  question: Robot;

  constructor(private robotService: RobotService) {}

  ngOnInit() {

    const answer = {id: null, 'answers': {}, context: 'suitability'};
    this.robotService.updateRobot(answer)
      .subscribe((result: Robot) => {
        this.messages.push(...result.messages);
        this.question = new Robot(
          result.id,
          result.messages,
          result.buttons,
          result.inputs,
          result.responses
        );

      });
  }

/*
  addToTyped(str) {
    // console.log(this.typed, str);
    this.typed.strings.push('filho da policia');
  }
*/
}
