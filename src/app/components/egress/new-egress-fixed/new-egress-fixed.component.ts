import { EgressService } from './../../../services/egress.service';
import { Service } from './../../../models/service.model';
import { ServicesCondoService } from './../../../services/services-condo.service';
import { Egress } from './../../../models/egress.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-new-egress-fixed',
  templateUrl: './new-egress-fixed.component.html',
  styleUrls: ['./new-egress-fixed.component.scss']
})
export class NewEgressFixedComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  egressFixed: Egress = {};
  serviceSelect: Service = {};
  isNew: boolean;
  id;
  condoBalance = 0;
  extra2;
  constructor(
    private router: Router,
    private userService: UserService,
    private serviceCondoServices: ServicesCondoService,
    private egressService: EgressService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
      this.condoBalance = data['Saldo'];
    });
    if (this.serviceCondoServices.serviceSelect.length !== 0) {
      this.serviceSelect = this.serviceCondoServices.serviceSelect[0];
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
    this.egressFixed.Id_Condominio = this.id;
    this.egressFixed.Id_Servicio = this.serviceSelect.Id_Servicio;
    this.egressFixed.Saldo = (
      +this.condoBalance - +this.egressFixed.Monto
    ).toString();
    this.egressService
      .newEgressFixed(this.egressFixed)
      .subscribe((res: any) => {
        const toast: NavigationExtras = {
          queryParams: {
            res: res.respuesta,
            monto: this.egressFixed.Monto,
            balanceBefore: this.condoBalance,
            balanceAfter: this.egressFixed.Saldo
          }
        };
        this.router.navigate(['list-services'], toast);
      });
  }
}
