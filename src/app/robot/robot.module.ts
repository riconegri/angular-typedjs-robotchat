import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RobotComponent} from './robot.component';
import {RobotService} from './robot.service';
import {SurveyService} from './survey.service';
import { QuestionFormComponent } from './question-form/question-form.component';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
  declarations: [ RobotComponent, QuestionFormComponent, MessageListComponent ],
  exports: [ RobotComponent ],
  imports: [ CommonModule, FormsModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ RobotService, SurveyService ]
})
export class RobotModule { }
