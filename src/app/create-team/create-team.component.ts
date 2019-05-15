import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './../player';
import { Settings } from './../settings'

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  playerName: string;
  tableName: string;

  // validate
  ifTableExists: boolean;
  ifPlayerExists: boolean;
  ifNoRoom: boolean;

  isActive: boolean = false;
  playerCurrentTime: string = '00:57:58';
  numOfPlayers: number = 1;
  currentNumOfPlayers: number = 1;
  spinnerStatus: string = 'off';

  players: Player[] = [];
  settings: Settings[] = [];

  @Input() currentPage;

  constructor(public db: AngularFirestore) { 

  }

  ngOnInit() {
   
  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Output() propsCreateTeam = new EventEmitter(); 

  changeWidget(widget) {
    this.toggleWidgets.emit(widget);
  }

  async createTeam() {
   
      // check if the collection exists
      
    await this.db.collection(`${this.tableName}`).valueChanges().subscribe((settings: Settings[]) => this.settings = settings);  
    await  this.db.collection(`${this.tableName}`).doc('players').collection('players').valueChanges().subscribe((players: Player[]) => this.players = players);

    this.spinnerStatus = 'on';

    console.log(this.players);
    console.log(this.currentPage);

    setTimeout(() => {
      this.setData()
    }, 800 ) 
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

    console.warn(this.settings[0].numOfPlayers);
    console.warn(this.players.length)
    }
    
   
    
   

    // if create

    if (this.currentPage === 'create') {
      if (this.ifTableExists) {
        alert('Table name is occupied');
        this.changeWidget('error-table-name');
      }
      else {
        //  add settings
        await this.db.collection(`${this.tableName}`).doc('settings').set({
          admin: `${this.playerName}`,
          numOfPlayers: this.numOfPlayers, 
          tableName: `${this.tableName}`,
          currentNumOfPlayers: 1,
        });
  
        // add player
        await this.db.collection(`${this.tableName}`).doc('players').collection('players').doc(`${this.playerName}`).set({
          isActive: `${this.isActive}`,
          playerName: `${this.playerName}`,
          playerCurrentTime: `${this.playerCurrentTime}`,
          
        });
  
        // send props
        await this.propsCreateTeam.emit({
          playerName: this.playerName,
          tableName: this.tableName,
          });
  
        // change widget
        this.changeWidget('player');
        
      }
    }


    // if join

     if (this.currentPage === 'join') {

      if (this.ifTableExists === false) {
        alert("There's no such a table");
        
      } else {

        if (this.ifNoRoom === true) {
          alert('no room for any player')
        } else {

          if (this.ifPlayerExists === true) {
            alert("table exists, but player name is occupied")
          }
          else if (this.ifPlayerExists === false) {
            await this.db.collection(`${this.tableName}`).doc('players').collection('players').doc(`${this.playerName}`).set({
              isActive: `${this.isActive}`,
              playerName: `${this.playerName}`,
              playerCurrentTime: `${this.playerCurrentTime}`,
              
            });

             // send props
            await this.propsCreateTeam.emit({
              playerName: this.playerName,
              tableName: this.tableName,
              });

            this.changeWidget('player');
          }
        }

      }

    }


    this.spinnerStatus = 'off';

  }
}
