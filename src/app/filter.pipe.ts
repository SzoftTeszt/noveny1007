import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tomb:any[], keresoSzo:string): any {
    if (!keresoSzo) return tomb;
    // console.log(tomb)
    if (tomb.length==0) return null;
    return tomb.filter(
      (e:any)=> e.megnevezes.toLowerCase().includes(keresoSzo.toLowerCase())
    )
  }

}
