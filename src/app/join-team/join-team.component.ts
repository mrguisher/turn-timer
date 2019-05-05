import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent implements OnInit {

  inputValue: string;



  constructor() { }

  ngOnInit() {
  }

  @Output() toggleWidgets = new EventEmitter<string>();
  @Output() passInput = new EventEmitter<string>();

  moveBack(widget) {
    this.toggleWidgets.emit(widget);
  }

}
