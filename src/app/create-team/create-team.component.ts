import { Component, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from './../player';
import { Settings } from './../settings'

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {

  playerName: string;
  tableName: string;

  numOfPlayers: number = 2;
  spinnerStatus: string = 'off';

  players: Player[] = [];
  settings: Settings[] = [];

  playerCurrentTime: string = '00:00:00';
  timePerRound: string;
  minutes: any = [
    '0:05','0:10','0:20','0:30','0:40','1:00',
    '1:20','1:40','2:00','3:00','4:00',
    '5:00','6:00','8:00','10:00',
  ]

  // validation
  ifTableExists: boolean;
  ifPlayerExists: boolean;
  ifNoRoom: boolean;

  tableReference: any = this.db.collection('TURN_TIMER').doc('TURN_TIMER');

  @Input() currentPage;

  constructor(public db: AngularFirestore) { 

  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Output() propsCreateTeam = new EventEmitter(); 

  changeWidget(widget) {
    this.toggleWidgets.emit(widget);
  }

  async createTeam() {
   
      // check if the collection exists
    await this.tableReference.collection(`${this.tableName}`).valueChanges().subscribe((settings: Settings[]) => this.settings = settings);  
    await  this.tableReference.collection(`${this.tableName}`).doc('players').collection('players').valueChanges().subscribe((players: Player[]) => this.players = players);

    this.spinnerStatus = 'on';

    setTimeout(() => {
      this.setData()
    }, 2200 ) 
  }

  async setData() {

      // ifTableExists
    this.settings.length === 0 ? this.ifTableExists = false : this.ifTableExists = true;
    
    if (this.ifTableExists === true) {
        // ifPlayerExists
      const nameIteration = this.players.map((obj) => obj.playerName).find((el) => el === this.playerName);
      nameIteration === undefined ? this.ifPlayerExists = false : this.ifPlayerExists = true;
        // ifNoRoom
      this.settings[0].numOfPlayers === this.players.length ? this.ifNoRoom = true : this.ifNoRoom = false;
    }
    
    // if 'create'

    if (this.currentPage === 'create') {
      if (this.ifTableExists) {
        alert('Table name is occupied');
        // this.changeWidget('error-table-name');
      }
      else {
        // add settings
        await this.tableReference.collection(`${this.tableName}`).doc('settings').set({
          admin: `${this.playerName}`,
          numOfPlayers: this.numOfPlayers,
          tableName: `${this.tableName}`,
          timePerRound: `${this.timePerRound}`,
          activePlayer: '',
          nextPlayer: '',
          popupText: 'Czkam na rozpoczęcie gry',
          gameStatus: 'ready'
        });
  
        // add player
        await this.tableReference.collection(`${this.tableName}`).doc('players').collection('players').doc(`${this.playerName}`).set({
          playerName: `${this.playerName}`,
          playerCurrentTime: `${this.playerCurrentTime}`,
          playerOverallTime: '00:00:00',
          isAdmin: true,
          order: 0,
        });

        // send data to session storage
        sessionStorage['tableName'] = this.tableName;
        sessionStorage['playerName'] = this.playerName;
        sessionStorage['isAdmin'] = true;

        // change widget
        this.changeWidget('player');
      }
    }

    // if 'join'

     if (this.currentPage === 'join') {

      if (this.ifTableExists === false) {
        alert("There's no such a table");
      } else {

        if (this.ifNoRoom === true) {
          alert('no room for any player')
        } else {

          if (this.ifPlayerExists === true) {
            alert("table exists, but player name is occupied")
          } else if (this.ifPlayerExists === false) {

            // add player
            await this.tableReference.collection(`${this.tableName}`).doc('players').collection('players').doc(`${this.playerName}`).set({
              playerName: `${this.playerName}`,
              playerCurrentTime: `${this.playerCurrentTime}`,
              isAdmin: false,
              order: 0,
            });

            // send data to session storage
            sessionStorage['tableName'] = this.tableName;
            sessionStorage['playerName'] = this.playerName;
            sessionStorage['isAdmin'] = false;

            this.changeWidget('player');
          }
        }
      }
    }
    this.spinnerStatus = 'off';
  }
}
