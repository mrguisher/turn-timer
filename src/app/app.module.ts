import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { MainWidgetComponent } from './main-widget/main-widget.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { CountdownComponent } from './countdown/countdown.component';
import { TimeFormatPipe } from './time-format.pipe';

const config = {
// 
};


@NgModule({
  declarations: [
    AppComponent,
    MainWidgetComponent,
    CreateTeamComponent,
    PlayerBoardComponent,
    CountdownComponent,
    TimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AngularSvgIconModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
