import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  currentPage: string = 'main-widget';

  playerName: string;
  tableName: string;

  constructor() {
    sessionStorage.getItem('tableName') !== null && this.changeWidget('player');
  }

  ngOnInit() {
    
  }

  changeWidget($event): void {
      this.currentPage = $event;
  }

  reciveProps($event) {
    this.playerName = $event.playerName;
    this.tableName = $event.tableName;
  }

}