import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
interface MenuSettings {
  hideMenu: boolean;
  hideExit: boolean;
  selectSection: string;
}

@Injectable({
  providedIn: 'root'
})
export class ControllerMenuService {
  public menuSettings$ = new BehaviorSubject<MenuSettings>({
    hideMenu: true,
    hideExit: true,
    selectSection: ''
  });

  constructor() {}
  menuSettings(hideMenu: boolean, hideExit: boolean, selectSection: string) {
    this.menuSettings$.next({
      hideMenu: hideMenu,
      hideExit: hideExit,
      selectSection: selectSection
    });
  }
}
