import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerMenuService {
public  hideMenu$ = new BehaviorSubject<boolean>(true);

  constructor() {}
  hideMenu(data: boolean ) {
    this.hideMenu$.next(data);
  }

}
