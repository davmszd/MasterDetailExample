import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      if (isNaN(<any>key))
      {
        continue; 
      }
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
