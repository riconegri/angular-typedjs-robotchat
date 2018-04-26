import {Component, OnInit, Input, AfterViewChecked} from '@angular/core';
// import * as Typed from 'typed.js';

@Component({
  selector: 'app-message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {
  typed = null;
  @Input() message: string;
  @Input() idx: number;
  @Input() isRight: boolean;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.idx, 'IDX');
  }

  ngAfterViewChecked() {
    // console.log(this.message);
    /*if (this.message && this.idx === 0) {
      this.typed = new Typed(`.typed${this.idx}`, {
        strings: [this.message],
        smartBackspace: true // Default value
      });
    }*/
    /*this.typed = new Typed('.typed2', {
      strings: [this.message],
      smartBackspace: true // Default value
    });*/
  }
}
