import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material';
import { RobotComponent } from './robot/robot.component';



@NgModule({
  exports: [MatButtonModule],
  declarations: [
    AppComponent,
    RobotComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
