import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Condo } from '../../../models/condo';
import { CondoService } from '../../../services/condo.service';

@Component({
  selector: 'app-nuevo-edit-condo',
  templateUrl: './nuevo-edit-condo.component.html',
  styleUrls: ['./nuevo-edit-condo.component.scss']
})
export class NuevoEditCondoComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  condo: Condo = {};
  isNew: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private condoService: CondoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Condo) => {
      if (Object.keys(params).length !== 0) {
        this.condo = {
          Id_Condominio: params.Id_Condominio,
          Direccion: params.Direccion,
          Ciudad: params.Ciudad,
          Colonia: params.Colonia,
          FechaRegistro: params.FechaRegistro,
          HoraRegistro: params.HoraRegistro,
          Saldo: params.Saldo,
          Banco: params.Banco,
          Cuenta: params.Cuenta,
          NumeroRecibo: params.NumeroRecibo
        };
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
    // if (Object.keys(this.condoService.selectCondo).length !== 0) {
    //   this.condo = this.condoService.selectCondo;
    //   this.condoService.selectCondo = {};
    //   this.isNew = false;
    // } else {
    //   this.isNew = true;
    // }
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
    this.condoService.newCondo(this.condo).subscribe((res: any) => {
      console.log(res)
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-condo'], toast);
    });
  }
  editCondo() {
    const condoEdit: Condo = {
      Id_Condominio: this.condo.Id_Condominio,
      Direccion: this.condo.Direccion,
      Ciudad: this.condo.Ciudad,
      Colonia: this.condo.Colonia,
      FechaRegistro: this.condo.FechaRegistro,
      HoraRegistro: this.condo.HoraRegistro,
      Saldo: this.condo.Saldo,
      Banco: this.condo.Banco,
      Cuenta: this.condo.Cuenta,
      NumeroRecibo: this.condo.NumeroRecibo.toString()
    };
    this.condoService.editCondo(condoEdit).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-condo'], toast);
    });
  }
}
