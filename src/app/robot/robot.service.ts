import {Injectable, setTestabilityGetter} from '@angular/core';
import * as Typed from 'typed.js';
import {SurveyService} from './survey.service';

@Injectable()
export class RobotService {

  reply: any[] = [];
  currentStep: any;
  stepList: any[] = [];
  questionIsReady: boolean;
  inputValue: any;
  constructor(private ss: SurveyService) { }

  execute(id: string) {
    this.currentStep = this.ss.getById(id);
    this.process();
  }

  init(survey) {
    this.ss.setSurvey(survey);
    this.execute('start');
  }

  process() {
    this.stepList.push(this.currentStep);
    this.scrollToTop();
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
      message.push('Sorry !:)');
    }

    const cls = '.typed' + (this.stepList.length - 1);
    setTimeout(() => {
      this.stepList[this.stepList.length - 1].tws = new typedClass(cls, {
        strings: message,
        showCursor: false,
        smartBackspace: true, // Default value,
        onComplete: () => {
          if (!isQuestion) {
            this.execute(this.currentStep.next);
          } else {
            this.setReady(true);
            // setTimeout(() =>
            //   this.inputEl ?
            //     this.inputEl.nativeElement.focus() :
            //     false, 0);
          }
        },
        onStart: () => {
          this.scrollToTop();
        }
      });
    }, 300);
  }

  onlyWrite(text: string, next: string) {
    const typedClass: any = Typed;
    const current = this.currentStep;
    const responseModel: any = {
      reply: true,
      type: 'info'
    };

    if (current.type === 'questionChoose') {
      responseModel.print = current.options.filter(v => v.value === text)[0].label.title;
      responseModel.next = current.options.filter(v => v.value === text)[0].next;
    } else {
      responseModel.print = text;
    }

    if (current.response.style) {
      responseModel.style = current.response.style;
    }
    if (current.response.alignRight) {
      responseModel.alignRight = current.response.alignRight;
    }

    this.stepList.push(responseModel);
    this.scrollToTop();

    const cls = '.typed' + (this.stepList.length - 1);
    setTimeout(() => {
      return new typedClass(cls, {
        strings: [responseModel.print],
        showCursor: false,
        smartBackspace: true, // Default value,
        onComplete: () => {
          this.execute(next);
        }
      });
    }, 100);
  }

  restart() {
    this.stepList.forEach(v => {
      if (v.tws) {
        v.tws.destroy();
      }
    });
    this.stepList = [];
    this.questionIsReady = false;
    setTimeout(() => this.execute('start'), 300);
  }

  setReady(ready: boolean) {
    this.questionIsReady = ready ? ready : false;
  }

  processReply(isNext) {
    let next: number;
    const current = this.currentStep;
    const response = current.response || null;
    // add reply to model
    this.reply[current.saveIn] = this.inputValue;
    // show form
    this.questionIsReady = false;
    if (current.compare) {
      next = this.compare();
    }
    if (isNext) {
      next = isNext;
    }

    if (response) {

      if (response.print) {
        response.print = response.print
          .replace(`{{${current.saveIn}}}`, this.inputValue);
      }
      this.onlyWrite(
        response.print || this.inputValue + '',
        next ? next : response.next
      );
    } else {
      this.execute(next ? next : this.currentStep.next);
    }
    this.inputValue = null;

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

  public scrollToTop(id = 'scrollRef') {
    const top = document.getElementById(id);
    if (top != null) {
      // top.scrollTop = top.scrollHeight;
      document.documentElement.scrollTop = top.scrollHeight + 60;
    }
  }
}
