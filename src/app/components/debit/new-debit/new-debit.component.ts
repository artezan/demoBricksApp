import { ControllerMenuService } from './../../shared/general-menu/controller-menu.service';
import { Renter } from './../../../models/renter';
import { RenterService } from './../../../services/renter.service';
import { ApartmentService } from './../../../services/apartment.service';
import { Observable } from 'rxjs';
import { ProvidersService } from './../../../services/providers.service';
import { Providers } from './../../../models/provider.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Apartment } from '../../../models/apartment';
import { IngressService } from '../../../services/ingress.service';

@Component({
  selector: 'app-new-debit',
  templateUrl: './new-debit.component.html',
  styleUrls: ['./new-debit.component.scss']
})
export class NewDebitComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  providerId: string;
  id;
  condoBalance = 0;
  extra2;
  colonia: string;
  depaSelect: string;
  renterSelect: string;
  depaOptions$: Observable<Apartment[]>;
  renterOptions$: Observable<Renter[]>;
  newDebit = {
    Id_Depa: '',
    EsRenta: 1,
    correo: '',
    Total: '',
    Mes: '',
    Concepto: '',
    Periodo: '',
    contra: '',
    Year: '',
    Id_Condominio: '',
    Año: ''
  };
  conceptoArr = [];
  concepto;
  conceptoExtras = [
    {
      Total: 0,
      Concepto: 'Fondo de contingencia'
    },
    {
      Total: 0,
      Concepto: 'Pago adeudos'
    },
    {
      Total: 0,
      Concepto: 'Pago extraordinario'
    },
    {
      Total: 0,
      Concepto: 'Pago extemporaneo (multa)'
    },
    {
      Total: 0,
      Concepto: 'Pago tiempo'
    }
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private apartmentService: ApartmentService,
    private renterService: RenterService,
    private controllerMenu: ControllerMenuService,
    private ingressService: IngressService
  ) {}
  ngOnInit() {
    this.controllerMenu.menuSettings(false, false, 'adeudo');
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
      this.condoBalance = data['Saldo'];
      this.colonia = data.Colonia;
    });
    this.depaOptions$ = this.apartmentService.getData(this.id);
    this.renterOptions$ = this.renterService.getData(this.id);
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
    if (this.concepto === 'def') {
      this.newDebit.Concepto = this.extra2;
    } else {
      this.newDebit.Concepto = this.concepto.Concepto;
    }
    this.newDebit.Año = this.newDebit.Year;
    this.newDebit.Id_Depa = this.depaSelect;
    this.newDebit.Id_Condominio = this.id;
    this.newDebit.Total = this.newDebit.Total.toString();
    this.newDebit.Periodo = this.concepto.Periodo;
    console.log(this.newDebit)
    this.ingressService.newDebit(this.newDebit).subscribe(res => {
      const toast: NavigationExtras = {
        queryParams: {
          res: res.respuesta
        }
      };
      this.router.navigate(['list-ingress'], toast);
    });
  }
  getConcepto(idDepa) {
    if (idDepa === 'def') {
      this.conceptoArr[0] = idDepa;
    } else {
      // tslint:disable-next-line:prefer-const
      let arrOptions = [];
      const selectConcept = [];
      this.ingressService.getData(this.id).subscribe(data => {
        data.forEach(item => {
          if (item.error !== '') {
            const pos = arrOptions.indexOf(item.Concepto);
            if (pos === -1 && item.Id_Depa === idDepa) {
              arrOptions.push(item.Concepto);
              selectConcept.push({
                Total: item.Total,
                Concepto: item.Concepto,
                Id_Pago: item.Id_Pago,
                Periodo: item.Periodo,
                No: item.NumeroRecibo
              });
            }
          }
        });
        this.conceptoExtras.forEach(c => {
          const pos = arrOptions.indexOf(c.Concepto);
          if (pos === -1 ) {
            const dateNowMonth = new Date(Date.now()).getMonth() + 1;
            const dateNowYear = new Date(Date.now()).getFullYear();
            arrOptions.push(c.Concepto);
            selectConcept.push({
              Total: 0,
              Concepto: c.Concepto,
              Periodo: dateNowMonth + '/' + dateNowYear
            });
          }
        });
      });
      this.conceptoArr = selectConcept;
    }
  }
  changeTotal(value) {
    if (value === 'def') {
      this.newDebit.Total = '0';
    } else {
      this.newDebit.Total = value.Total;
    }
  }
}
