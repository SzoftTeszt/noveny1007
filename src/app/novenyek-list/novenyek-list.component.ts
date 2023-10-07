import { Component } from '@angular/core';
import { BaseService } from '../sevices/base.service';
import { ConfigService } from '../sevices/config.service';
import { map } from 'rxjs';
import { KosarService } from '../sevices/kosar.service';

@Component({
  selector: 'app-novenyek-list',
  templateUrl: './novenyek-list.component.html',
  styleUrls: ['./novenyek-list.component.css']
})
export class NovenyekListComponent {
  novenyek: any;
  oszlopok:any;
  tetelek:any;
  
  constructor(private base:BaseService, 
    private config:ConfigService,
    private kosar:KosarService){
    this.base.getNovenyek().snapshotChanges().pipe(
      map( (changes)=> changes.map(
        (c)=>({key:c.payload.key, ...c.payload.val()})
      ))
    ).subscribe(adatok=>this.novenyek=adatok)
  
    this.oszlopok=this.config.oszlopokNoveny
    this.tetelek=this.kosar.getTetelek()
  }

  ment(novenyKey:any, db:any){
    this.kosar.addTetel(novenyKey,Number(db))
    this.tetelek=this.kosar.getTetelek()
  }

  rendelunkE(novenyKey:any){
    let i  = this.tetelek.findIndex(
      (t:any)=> t.novenyKey==novenyKey
    )
    return (i==-1)
  }
}
