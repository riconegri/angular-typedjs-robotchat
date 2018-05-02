import {Component, Input, OnInit} from '@angular/core';
import * as Typed from 'typed.js';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})

export class RobotComponent implements OnInit {
  @Input() survey: any[];
  @Input() reply: any = {};
  currentStep: any;
  stepList: any[] = [];
  questionIsReady: boolean;
  inputValue: any;

  constructor() { }

  ngOnInit() {
    this.execute(1);
  }

  getById(id: number) {
    return this.survey.filter(o => {
      return o.id === id;
    })[0] || null;
  }

  execute(id: number) {
    this.currentStep = this.getById(id);

    this.process();
  }

  process() {
    this.stepList.push(this.currentStep);

    switch (this.currentStep.type) {
      case 'info':
        if (this.currentStep.variables) {
          this.currentStep.variables.forEach(v => {
            this.currentStep.print = this.currentStep.print
              .replace(`{{${v}}}`, this.reply[v]);
          });
        }
        this.typeWrite();
        break;
      case 'questionInput':
      case 'questionInputNumber':
      case 'questionChoose':
      default:
        this.typeWrite(true);
    }
  }

  typeWrite(isQuestion?: boolean) {
    const typedClass: any = Typed;
    const message: string[] = [this.currentStep.print];

    if (this.currentStep.erase) {
      message.push('Sorry :)!');
    }

    const cls = '.typed' + (this.stepList.length - 1);
    setTimeout(_ => {
      return new typedClass(cls, {
        strings: message,
        showCursor: false,
        smartBackspace: true, // Default value,
        onComplete: () => !isQuestion ? this.execute(this.currentStep.next) : this.setReady(true)
      });
    }, 100);
  }

  setReady(ready: boolean) {
    this.questionIsReady = ready ? ready : false;
  }

  processReply(isNext) {
    let next: number;
    // add reply to model
    this.reply[this.currentStep.saveIn] = this.inputValue;
    this.questionIsReady = false;
    if (this.currentStep.compare) {
      next = this.compare();
    }
    if (isNext) {
      next = isNext;
    }
    this.inputValue = null;
    console.log(this.reply);
    this.execute(next ? next : this.currentStep.next);
  }

  private compare() {
    return this.currentStep.compare.reduce((acc, v) => {
      if (v.type === '<>') {
        if (this.inputValue >= v.min && this.inputValue <= v.max) {
          return v.next;
        }
      }
      if (v.type === '>') {
        if (this.inputValue >= v.min) {
          return v.next;
        }
      }
      if (v.type === '<') {
        if (this.inputValue >= v.max) {
          return v.next;
        }
      }
      return acc;
    }, 0);
  }
}

