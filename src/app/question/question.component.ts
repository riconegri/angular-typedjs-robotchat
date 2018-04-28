import {Component, Input} from '@angular/core';
import {RobotService} from '../robot.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-question-component',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
  @Input() question: any;
  @Input() messages: any [];

  reply = '';
  answer = {
    'id': null,
    'answers': {},
    context: 'suitability'
  };

  constructor(private robotService: RobotService, private messageService: MessageService) {}

  replyQuestion(dataFromButton) {
    console.log(this.answer);
    const isFinal = this.question.id === 'final';
    if (this.question.responses[0]) {
      const message = this.question.responses[0]
        .replace(`{{answers.${this.question.id}}}`, this.reply);
      this.messages.push({type: 'reply', value: message, alignRight: true});
      this.messageService.totalMessages = this.messages.length;
    }

    this.answer.id = this.question.id;
    this.answer.answers[this.question.id] = dataFromButton ?
      dataFromButton : this.reply;

    this.robotService.updateRobot(this.answer, isFinal)
      .subscribe(result => {
        this.messages.push(...result.messages);
        this.messageService.totalMessages = this.messages.length;
        this.question = result;
        this.reply = '';
      });
    // delete this.question.inputs;
  }

}
