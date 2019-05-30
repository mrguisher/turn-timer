import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './../player';
import { Settings } from './../settings'
import { Pipe, PipeTransform } from '@angular/core';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {

  tableName = sessionStorage.getItem('tableName');
  playerName = sessionStorage.getItem('playerName');
  isAdmin = sessionStorage.getItem('isAdmin');
  
  players: Player[] = [];
  settings: Settings[] = [];

  orderedPlayers: any;
  countdownStart: any;

  tableReference: any = this.db.collection('TURN_TIMER').doc('TURN_TIMER').collection(`${this.tableName}`);

  constructor(public db: AngularFirestore) {

  }

  ngOnInit() {
    this.tableReference.doc('players').collection('players').valueChanges().subscribe((players: Player[]) => this.players = players);
    this.tableReference.valueChanges().subscribe((settings: Settings[]) => this.settings = settings);
  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Input() countdownProps;


  changeWidget(widget) {
    this.toggleWidgets.emit(widget);
  }

  // order players
  order(playerID) {
      const message = prompt("Wpisz numer:");
      const num = parseFloat(message);
      const ifValid = [1,2,3,4,5,6,7,8].find((el) => el === num);
      const ifAvailable = [...this.players].find((el) => el.order === num);
  
      if (ifValid && ifAvailable === undefined) {
        this.tableReference.doc('players').collection('players').doc(playerID).update({
          order: num,
        });
      } else {
        alert('Wprowadź inną wartość')
      }
  }

  sorting() {
    this.orderedPlayers = [...this.players].sort((a,b) => a.order - b.order).map((el) => el.playerName);
  }

  // start game
  nextPlayerOrder(num: number) {
      if (num === this.orderedPlayers.length - 1) {
        return this.orderedPlayers[0]
      } else {
        return this.orderedPlayers[num + 1]
      }
  }

  startGame(random: boolean) {
    this.sorting();
    const rand = Math.floor(Math.random() * this.orderedPlayers.length);
    this.tableReference.doc('settings').update({
      activePlayer: `${random === true ? this.orderedPlayers[rand] : this.orderedPlayers[0]}`,
      nextPlayer: `${random === true ? this.nextPlayerOrder(rand) : this.orderedPlayers[1]}`,
      gameStatus: 'started'
    });
  }

  // shift players
  shiftPlayers($event) {

    if ($event.outOfTime === true) {

      this.sorting();
      const nextPlayerIndex = this.orderedPlayers.indexOf(this.settings[0].nextPlayer);

      this.tableReference.doc('settings').update({
        activePlayer: `${this.settings[0].nextPlayer}`,
        nextPlayer: `${this.nextPlayerOrder(nextPlayerIndex)}`,
      });
    }
  }

  tezt() {


  }

  leaveTable() {
    if (confirm("Do you really want to leave??")) {
      this.tableReference.doc('players').collection('players').doc(`${this.playerName}`).delete();
      if (this.isAdmin) {
        this.tableReference.doc('settings').delete();
        [...this.players].map((pl) => this.tableReference.doc('players').collection('players').doc(pl.playerName).delete())

      }
      sessionStorage.removeItem('tableName');
      sessionStorage.removeItem('playerName');
      sessionStorage.removeItem('isAdmin');

      this.changeWidget('main-widget')
    }
  }
}