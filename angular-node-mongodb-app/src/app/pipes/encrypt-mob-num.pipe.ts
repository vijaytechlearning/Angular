import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encryptMobNum'
})
export class EncryptMobNumPipe implements PipeTransform {

  transform(value: string): string {
    console.log("call encryptMobNum Pipe")
    let num = value.toString();
    if(num.length === 10){
      return num.substr(0,4)+"****"+num.substr(num.length-2);
    }
    return num;
  }

}
