import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Settings } from './../settings';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  countdownStart: any;
  settings: Settings[] = [];
  currentMinutes: number;
  currentSeconds: number;

  @Output() countdownProps = new EventEmitter<any>();
  @Input() timePerRound: string;

  constructor() { }

  ngOnInit() {
    // countdown
    setTimeout(() => {
      const timeSplit = this.timePerRound.split(':');
      let minutes: number = parseFloat(timeSplit[0]);
      let seconds: number = parseFloat(timeSplit[1]);
  
      this.countdownStart = setInterval(() => {
        seconds !== 0 ? seconds-- : minutes !== 0 ? (seconds = 59, minutes--) : this.clearCountdown();
        this.currentMinutes = minutes;
        this.currentSeconds = seconds;
      }, 1000);
    }, 500)
 
  }
  clearCountdown() {
    this.countdownProps.emit({
      time: this.timePerRound,
      outOfTime: true,
    })
    clearInterval(this.countdownStart);
  }
}