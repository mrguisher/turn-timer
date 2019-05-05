import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  inputValue: string;
  numOfPlayers: number = 1;


  constructor() { 

  }

  ngOnInit() {
  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Output() propsCreate = new EventEmitter(); 

  moveBack(widget) {
    this.toggleWidgets.emit(widget);
  }


  createTeam() {
    this.propsCreate.emit([this.inputValue, this.numOfPlayers])
  }

}
