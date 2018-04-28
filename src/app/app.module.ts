import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {RobotService} from './robot.service';


import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { QuestionComponent } from './question/question.component';
import { ButtonsComponent } from './buttons/buttons.component';
import {MessageService} from './message.service';
import {MatButtonModule} from '@angular/material';



@NgModule({
  exports: [MatButtonModule],
  declarations: [
    AppComponent,
    MessageComponent,
    QuestionComponent,
    ButtonsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RobotService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
