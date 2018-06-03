import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string;

  constructor(private router: Router) {}

  ngOnInit() {}
  login() {
    const user: NavigationExtras = {
      queryParams: {
      'correo': 'asdf',
      'contra': '3da541559918a808c2402bba5012f6c60b27661c'
      }
    };
    this.router.navigate(['list-condo'], user);
  }
}
