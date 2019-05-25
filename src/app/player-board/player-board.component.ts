import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './../player';
import { Settings } from './../settings'
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

  gameStatus: string = 'waiting';

  constructor(public db: AngularFirestore) {

  }

  ngOnInit() {
    this.db.collection(`${this.tableName}`).doc('players').collection('players').valueChanges().subscribe((players: Player[]) => this.players = players);
    this.db.collection(`${this.tableName}`).valueChanges().subscribe((settings: Settings[]) => this.settings = settings);
  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Input() countdownProps;

  changeWidget(widget) {
    this.toggleWidgets.emit(widget);
  }

  // order players

  order(playerID) {

    if (this.settings[0].numOfPlayers !== 1) {

      const message = prompt("Wpisz numer:");
      const num = parseFloat(message);
      const ifValid = [1,2,3,4,5,6,7,8].find((el) => el === num);
      const ifAvailable = [...this.players].find((el) => el.order === num);
  
      if (ifValid && ifAvailable === undefined) {
        this.db.collection(`${this.tableName}`).doc('players').collection('players').doc(playerID).update({
          order: num,
        });
        
      } else {
        alert('Wprowadź inną wartość')
      }
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
    // this.orderedPlayers.map(() => )

    if (random === true && this.settings[0].numOfPlayers !== 1) {
      const rand = Math.floor(Math.random() * this.orderedPlayers.length);
      console.log(this.orderedPlayers[rand] ,this.nextPlayerOrder(rand), this.orderedPlayers.length, rand)
      
      this.db.collection(`${this.tableName}`).doc('settings').update({
        activePlayer: `${this.orderedPlayers[rand]}`,
        nextPlayer: `${this.nextPlayerOrder(rand)}`,
        popup: false,
        
      });
    } else {

      this.db.collection(`${this.tableName}`).doc('settings').update({
        activePlayer: `${this.orderedPlayers[0]}`,
        nextPlayer: `${this.orderedPlayers[1]}`,
        popup: false,
      });
    }

    this.gameStatus = 'started';
  }

  // shift players
  shiftPlayers($event) {

    if ($event.outOfTime === true) {

      this.sorting();
      const nextPlayerIndex = this.orderedPlayers.indexOf(this.settings[0].nextPlayer);

      this.db.collection(`${this.tableName}`).doc('settings').update({
        activePlayer: `${this.settings[0].nextPlayer}`,
        nextPlayer: `${this.nextPlayerOrder(nextPlayerIndex)}`,
      });
    }
  }

  endGame() {
    this.db.collection(`${this.tableName}`).doc('settings').update({
      activePlayer: null,
      nextPlayer: null,
      popup: true,
      popupText: 'Koniec gry',
    });
    this.gameStatus = 'waiting'
  }

  leaveTable() {
    if (confirm("Do you really want to leave??")) {

      this.db.collection(`${this.tableName}`).doc('players').collection('players').doc(`${this.playerName}`).delete();
      // this.isAdmin ? this.db.collection(`${this.tableName}`)

      sessionStorage.removeItem('tableName');
      sessionStorage.removeItem('playerName');
      sessionStorage.removeItem('isAdmin');

      this.changeWidget('main-widget')
    }
  }
}