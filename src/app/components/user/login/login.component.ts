import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['list-condo', /*data._id*/]);
  }
}
