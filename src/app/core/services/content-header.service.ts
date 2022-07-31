import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ContentHeaderService {
  
  subject$: BehaviorSubject<string>= new BehaviorSubject("الصفحة الرئيسية");

  constructor() { }

  setMainHeaderTitle(title:string){
    this.subject$.next(title);
  }

  
}
