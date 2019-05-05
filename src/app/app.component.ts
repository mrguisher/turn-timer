import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  currentPage: string = 'main-widget';

  createTableName: string;
  createNumOfPlayers: number;


  constructor(public db: AngularFirestore) {




  }

  ngOnInit() {

  }

  async fetchData() {

    

  }

  changeWidget($event) {
      this.currentPage = $event;
  }
  reciveProps($event) {
    this.createNumOfPlayers = $event[0];
    this.createTableName = $event[1];
  }

}
