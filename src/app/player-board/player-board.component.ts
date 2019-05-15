import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './../player';
import { Settings } from './../settings'

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {


  @Input() tableName;
  
  players: Player[] = [];

  settings: Settings[] = [];

  constructor(public db: AngularFirestore) { 

  }

  ngOnInit() {
    this.db.collection(`${this.tableName}`).doc('players').collection('players').valueChanges().subscribe((players: Player[]) => this.players = players);
    this.db.collection(`${this.tableName}`).valueChanges().subscribe((settings: Settings[]) => this.settings = settings);

    
  }

  test() {

    console.log(
      this.players
    )
    console.log(
      this.tableName
    )
  }


  @Output() toggleWidgets = new EventEmitter<string>();


  changeWidget(widget) {
    this.toggleWidgets.emit(widget);
  }
}

