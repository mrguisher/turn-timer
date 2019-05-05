import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-widget',
  template: `
    <div class="main-container">
      <p>
        TURN TIMER
      </p>
      <button 
        class="btn"
        (click)="newGame('create')"
      >STWÓRZ STÓŁ</button>
      <br><br>
      <button 
        class="btn"
        (click)="newGame('join')"
      >DOŁĄCZ DO STOŁU</button>
    </div>

  `,
  styles: ['']
})
export class MainWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


  @Output() toggleWidgets = new EventEmitter<string>();

  newGame(widget) {
    this.toggleWidgets.emit(widget);
  }

}
