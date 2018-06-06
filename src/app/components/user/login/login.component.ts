import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string;

  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService
  ) {}

  ngOnInit() {
    this.controllerMenu.menuSettings(true, true, '');
  }
  login() {
    // const user: NavigationExtras = {
    //   queryParams: {
    //   'correo': 'asdf',
    //   'contra': '3da541559918a808c2402bba5012f6c60b27661c'
    //   }
    // };
    const userKey = JSON.stringify([
      {
        correo: 'asdf',
        contra: '3da541559918a808c2402bba5012f6c60b27661c'
      }
    ]);
    localStorage.setItem('userKey', userKey);
    this.router.navigate(['list-condo']);
  }
}
