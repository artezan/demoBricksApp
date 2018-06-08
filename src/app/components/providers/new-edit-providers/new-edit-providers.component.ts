import { Providers } from './../../../models/provider.model';
import { ApartmentService } from './../../../services/apartment.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-new-edit-providers',
  templateUrl: './new-edit-providers.component.html',
  styleUrls: ['./new-edit-providers.component.scss']
})
export class NewEditProvidersComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  provider: Providers = {};
  isNew: boolean;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private providersService: ProvidersService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
    });
    if (this.providersService.providerSelect.length !== 0) {
      this.provider = this.providersService.providerSelect[0];
      this.isNew = false;
      this.providersService.providerSelect.length = 0;
    } else {
      this.isNew = true;
    }
  }
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
  newCondo() {
    this.provider.Id_Condominio = this.id;
    this.providersService.newProvider(this.provider).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-providers'], toast);
    });
  }
  editCondo() {
    this.provider.Id_Condominio = this.id;
    this.providersService.editProvider(this.provider).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-providers'], toast);
    });
  }

}
