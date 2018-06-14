import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  errorToShow = '';
  telApartInput;
  telCelInput;
  telOficInput;
  passwordInput;
  passwor2dInput;
  nameInput;
  lastNameInput;
  lastName2Input;
  emailInput;
  companyInput;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
  newUser() {}
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
}
