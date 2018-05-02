import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RobotComponent} from './robot.component';

@NgModule({
  declarations: [ RobotComponent ],
  exports: [ RobotComponent ],
  imports: [ CommonModule, FormsModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RobotModule { }
