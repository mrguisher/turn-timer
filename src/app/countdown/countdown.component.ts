import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  countdownStart: any;
  playerCurrentTime: number = 20;

  constructor() { }

  ngOnInit() {
    this.countdownStart = setInterval(() => {
      this.playerCurrentTime !== 0 ? this.playerCurrentTime = this.playerCurrentTime - 1 : this.clearCountdown();
    }, 1000);
  }

  @Output() countdownProps = new EventEmitter<any>();

  // countdown


  clearCountdown() {
    clearInterval(this.countdownStart);

    this.countdownProps.emit({
      time: this.playerCurrentTime,
      outOfTime: true,
    })

  }

}
