import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-widget',
  template: `
    <div class="main-container main-widget">

      <img src="./../../assets/icons/logo_transparent.png" alt="logo" class="logo navigation__logo">
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
