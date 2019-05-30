import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  countdownStart: any;
  playerCurrentTime: string = '00:02:30';

  constructor() { }

  ngOnInit() {
    // this.countdownStart = setInterval(() => {
    //   if (this.playerCurrentTime !== '00:00:00') {



    //   }
    // }, 1000);
  }

  @Output() countdownProps = new EventEmitter<any>();

  // countdown


  clearCountdown() {
    this.countdownProps.emit({
      time: this.playerCurrentTime,
      outOfTime: true,
    })
    clearInterval(this.countdownStart);
  }

  formatTime(time: string, n: number) {
   const timeSplit = this.playerCurrentTime.split(':');
   const hours = parseFloat(timeSplit[0]);
   const minutes = timeSplit[1];
   const seconds = timeSplit[2];


   console.log(hours)
  }
}
// this.playerCurrentTime = this.playerCurrentTime - 1 : this.clearCountdown();