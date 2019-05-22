import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-widget',
  template: `
    <div class="main-container main-widget">

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
  styles: [`
    .main-widget {
      justify-content: center;
    }
    p {
      font-size: 3rem;
      position: absolute;
      top: 8rem;
      font-weight: 300;
    }
  `]
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
