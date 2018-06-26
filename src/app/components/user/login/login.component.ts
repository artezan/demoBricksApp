import { UserSession } from './../../../models/user-session.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import * as sha1 from 'js-sha1';


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
    const pass = sha1(this.passInput);
    this.userService
      .requestApiToken(
        this.emailInput,
        pass
      )
      .subscribe(res => {
        const userKey = JSON.stringify([
          {
            correo: this.emailInput,
            contra: pass,
            jwt: res.jwt
          }
        ]);
        localStorage.setItem('userKey', userKey);
        this.router.navigate(['list-condo']);
      });

  }
}
