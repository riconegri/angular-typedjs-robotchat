import {Component, OnInit, Input, AfterContentChecked} from '@angular/core';

import * as Typed from 'typed.js';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],

})
export class MessageComponent implements OnInit, AfterContentChecked {
  typed = null;
  start = false;
  @Input() message: string;
  @Input() idx: number;
  @Input() isRight: boolean;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    // console.log(this.idx, 'IDX');
  }

  ngAfterContentChecked() {
    if (!this.start) {
      this.start = true;
      if (!this.messageService.occupied) {
        this.messageService.setState(1);
        this.messageService.idx = this.idx;
        setTimeout(() => {
          this.typeWrite();
        }, 200);
      } else {
        const interval = setInterval(() => {
          if (!this.messageService.occupied) {
            clearInterval(interval);
            this.typeWrite();
            this.messageService.setState(1);
          }
        }, 100);
      }
    }
  }

  typeWrite() {
    const typedClass: any = Typed;

    const cls = '.typed' + this.idx;
    if (this.idx !== this.messageService.idx) {
      return false;
    }
    this.messageService.idx += 1;
    console.log(this.messageService.totalMessages, this.idx);

    return new typedClass(cls, {
      strings: [this.message],
      showCursor: false,
      smartBackspace: false, // Default value,
      onComplete: () => this.messageService.setState(0)
      // on: (a) => console.log(a),
    });
  }
}
