import {Component, OnInit} from '@angular/core';
import * as data from './suitability.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Descobrindo seu Perfil';
  typed = null;
  survey: any[];
  reply: any = {};

  constructor() {}

  ngOnInit() {
    // const word = (<any>data).name;
    this.survey = <any>data;
    this.updateReply();

    // const answer = {id: null, 'answers': {}, context: 'suitability'};
    // this.robotService.updateRobot(answer)
    //   .subscribe((result: Robot) => {
    //     this.messages.push(...result.messages);
    //     this.messageService.totalMessages = this.messages.length;
    //     this.question = new Robot(
    //       result.id,
    //       result.messages,
    //       result.buttons,
    //       result.inputs,
    //       result.responses
    //     );
    //
    //   });
  }

  private updateReply (attr?: any) {
    console.log('isso', attr, this);
  }
}
