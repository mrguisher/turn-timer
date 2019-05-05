import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MainWidgetComponent } from './main-widget/main-widget.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { SetNameComponent } from './set-name/set-name.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { PlayerBoardComponent } from './player-board/player-board.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: ':id',
    component: AppComponent
  }
];

const config = {
  apiKey: "",
  authDomain: "test-01-8638e.firebaseapp.com",
  databaseURL: "https://test-01-8638e.firebaseio.com",
  projectId: "test-01-8638e",
  storageBucket: "test-01-8638e.appspot.com",
  messagingSenderId: "1006566896787"
};


@NgModule({
  declarations: [
    AppComponent,
    MainWidgetComponent,
    CreateTeamComponent,
    JoinTeamComponent,
    SetNameComponent,
    AdminBoardComponent,
    PlayerBoardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatSliderModule,
    HttpClientModule,
    AngularSvgIconModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
