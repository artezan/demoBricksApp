import { UserSession } from './../../../models/user-session.model';
import { UserService } from './../../../services/user.service';
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
  passInput: string;

  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.controllerMenu.menuSettings(true, true, '');
  }
  login() {
    this.userService
      .requestApiToken(
        this.emailInput,
        '3da541559918a808c2402bba5012f6c60b27661c'
      )
      .subscribe(res => {
        const userKey = JSON.stringify([
          {
            correo: this.emailInput,
            contra: '3da541559918a808c2402bba5012f6c60b27661c',
            jwt: res.jwt
          }
        ]);
        localStorage.setItem('userKey', userKey);
        this.router.navigate(['list-condo']);
      });

  }
}
