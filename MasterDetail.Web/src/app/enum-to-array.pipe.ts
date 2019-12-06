import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    debugger;
    for (let key in value) {
      if (isNaN(<any>key))
      {
        continue; 
      }
      keys.push({ key: key, value: value[key] });
    }
    return keys;
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //console.log(value);
    //console.log(Object.keys(value).filter(k => !isNaN(Number(k))));
    //return Object.keys(value).filter(k => !isNaN(Number(k)));
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //console.log(value);
    //console.log(Object.keys(value).filter((type) => isNaN(<any>type) && type !== 'values'));
    //return Object.keys(value).filter((type) => isNaN(<any>type) && type !== 'values');
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    //console.log(Object.keys(value).filter(k => !isNaN(Number(k))));
    //return Object.keys(value).filter(k => !isNaN(Number(k)));
  }
}
