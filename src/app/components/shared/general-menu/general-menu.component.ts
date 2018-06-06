import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ControllerMenuService } from './controller-menu.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-general-menu',
  templateUrl: './general-menu.component.html',
  styleUrls: ['./general-menu.component.css']
})
export class GeneralMenuComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  isHide: boolean;
  isHideExit: boolean;
  menuSelect = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public controllerMenu: ControllerMenuService,
    private router: Router,
    public userService: UserService
  ) {
    controllerMenu.menuSettings$.subscribe(data => {
      this.isHide = data.hideMenu;
      this.isHideExit = data.hideExit;
      this.menuSelect = data.selectSection;
    });
  }
  logout() {
    this.router.navigate(['login']);
  }
}
