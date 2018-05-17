import { Component, OnInit } from '@angular/core';
import {RobotService} from '../robot.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(public robotService: RobotService) { }

  ngOnInit() {}

}
