import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  occupied = 0;
  idx = 0;
  totalMessages = 0;
  constructor() { }

  setState(on?: number) {
    this.occupied = on || 0;
  }
}
