import { Component, OnInit } from '@angular/core';
import {RobotService} from '../robot.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  constructor(public robotService: RobotService) { }

  ngOnInit() {
  }

}
