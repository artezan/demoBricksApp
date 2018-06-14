import { Observable } from 'rxjs';
import { ProvidersService } from './../../../services/providers.service';
import { Providers } from './../../../models/provider.model';
import { EgressService } from './../../../services/egress.service';
import { Egress } from './../../../models/egress.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-new-egress-variable',
  templateUrl: './new-egress-variable.component.html',
  styleUrls: ['./new-egress-variable.component.scss']
})
export class NewEgressVariableComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  egressVarible: Egress = {};
  providerSelect$: Observable<Providers[]>;
  providerId: string;
  isNew: boolean;
  id;
  condoBalance = 0;
  extra2;
  colonia: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private providerService: ProvidersService,
    private egressService: EgressService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
      this.condoBalance = data['Saldo'];
      this.colonia = data.Colonia;
    });
    this.providerSelect$ = this.providerService.getData(this.id);
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
    this.egressVarible.Id_Condominio = this.id;
    this.egressVarible.Id_Proveedor = this.providerId;
    this.egressVarible.Saldo = (
      +this.condoBalance - +this.egressVarible.Monto
    ).toString();
    this.egressService
      .newEgressVariable(this.egressVarible)
      .subscribe((res: any) => {
        const toast: NavigationExtras = {
          queryParams: {
            res: res.respuesta,
            monto: this.egressVarible.Monto,
            balanceBefore: this.condoBalance,
            balanceAfter: this.egressVarible.Saldo
          }
        };
        this.userService.userDataSelect.next({
          Saldo: this.egressVarible.Saldo,
          Colonia: this.colonia,
          Id_Condominio: this.id
        });
        this.router.navigate(['list-egress'], toast);
      });
  }
}
