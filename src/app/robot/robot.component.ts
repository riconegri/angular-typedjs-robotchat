import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {RobotService} from './robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})

export class RobotComponent implements OnInit {
  @ViewChild('inputText') inputEl: ElementRef;
  @Input() survey: any[];
  @Input() reply: any = {};

  constructor(public robotService: RobotService) {
// * 3. make css responsive
  }

  ngOnInit() {
    this.robotService.init(this.survey);
  }
}
