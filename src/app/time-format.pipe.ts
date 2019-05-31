import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(number: number): any {
    return number < 10 ? `0${number}` : number;
  }

}
