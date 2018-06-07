import { Apartment } from './../../../models/apartment';
import { ApartmentService } from './../../../services/apartment.service';
import { IngressService } from './../../../services/ingress.service';
import { Ingress } from './../../../models/ingress.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-ingress',
  templateUrl: './list-ingress.component.html',
  styleUrls: ['./list-ingress.component.scss']
})
export class ListIngressComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  rows2;
  id: string;
  sub: any;
  ingressSelect: Ingress[];
  realData: Ingress[];
  panelOpenState = false;
  removable = true;
  selectable = true;
  apartment$: Observable<Apartment[]>;
  apartmentSelect: Apartment;
  state: string;
  monthInput;
  yearInput: string;
  yearOptions: string[] = [];
  apartmentNum: number;
  activeFilters = { Interior: '', Pagado: '', FechaPagado: '' };
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private ingressService: IngressService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public apartmentServices: ApartmentService
  ) {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
      }
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'Id_Pago',
        name: 'Id_Pago',
        width: '40'
      },
      {
        name: 'Numero Recibo',
        prop: 'NumeroRecibo',
        width: '80'
      },
      {
        prop: 'Interior',
        name: 'Departamento',
        width: '80'
      },
      {
        prop: 'NombreInquilino',
        name: 'Inquilino',
        width: '90'
      },
      {
        prop: 'ApellidoPaterno',
        name: 'Paterno',
        width: '90'
      },
      {
        prop: 'ApellidoMaterno',
        name: 'Materno',
        width: '90'
      },
      {
        prop: 'Concepto',
        name: 'Concepto',
        width: '80'
      },
      {
        prop: 'Total',
        name: 'Total',
        width: '40'
      },
      {
        prop: 'Periodo',
        name: 'Periodo',
        width: '80'
      },
      {
        prop: 'Pagado',
        name: 'Estado',
        width: '80'
      },
      {
        prop: 'FechaPagado',
        name: 'Fecha Pagado',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'ingresos');
    this.sub = this.userService.userDataSelect.subscribe((params: any) => {
      this.id = params['Id_Condominio'];
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
    });
    this.apartment$ = this.apartmentServices.getData(this.id);
    this.getData(this.id);
  }
  getData(id) {
    this.loadingIndicator = true;
    this.ingressService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Ingress[]) {
    let isPayment: string;
    this.realData = data;
    const arrRows: Ingress[] = [];
    data.forEach(item => {
      if (item.Pagado === '1') {
        isPayment = 'Pagado';
      } else {
        isPayment = 'Por pagar';
      }
      if (item.error !== '') {
        arrRows.push({
          Id_Pago: item.Id_Pago,
          NumeroRecibo: item.NumeroRecibo,
          Interior: item.Interior,
          NombreInquilino: item.NombreInquilino,
          ApellidoPaterno: item.ApellidoPaterno,
          ApellidoMaterno: item.ApellidoMaterno,
          Concepto: item.Concepto,
          Total: item.Total,
          Periodo: item.Periodo,
          Pagado: isPayment,
          FechaPagado: item.FechaPagado
        });
      }
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
    // set years
    arrRows.forEach(item => {
      const year = new Date(item.FechaPagado).getFullYear();
      if (!isNaN(year)) {
        if (this.yearOptions.indexOf(year.toString()) === -1) {
          this.yearOptions.push(year.toString());
        }
      }
    });
  }
  getPopMessage(event) {
    const isDisabledDetails = (<HTMLInputElement>(
      document.getElementById('details')
    )).disabled;
    if (isDisabledDetails) {
      this.errorToShow = 'Seleccione un Ingreso';
    } else {
      this.errorToShow = '';
    }
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un Ingreso';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-renter']);
    this.ingressService.ingressSelect = this.ingressSelect;
  }
  select(event: Ingress[]) {
    this.ingressSelect = this.realData.filter(item => {
      if (item.Id_Inquilino === event[0].Id_Inquilino) {
        return item;
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item: string) {
    if (item === 'apartmentSelect') {
      this.apartmentSelect = undefined;
      delete this.activeFilters.Interior;
    }
    if (item === 'state') {
      this.state = undefined;
      this.state = undefined;
      delete this.activeFilters.Pagado;
    }
    if (item === 'monthInput') {
      this.monthInput = undefined;
      if (this.yearInput) {
        this.activeFilters.FechaPagado = this.activeFilters.FechaPagado.substring(
          0,
          4
        );
      } else {
        delete this.activeFilters.FechaPagado;
      }
    }
    if (item === 'yearInput') {
      this.yearInput = undefined;

      if (this.monthInput) {
        this.activeFilters.FechaPagado = this.activeFilters.FechaPagado.substring(
          4
        );
      } else {
        delete this.activeFilters.FechaPagado;
      }
    }
    this.rows = this.rows2;
    Object.keys(this.activeFilters).forEach(key => {
      this.apartmentSet(this.activeFilters[key], key);
    });
  }
  setfilters(filter, param: string) {
    this.rows = this.rows2;
    if (param === 'month') {
      if (this.yearInput) {
        filter = this.yearInput + this.monthToString(filter);
      } else {
        filter = this.monthToString(filter);
      }
      param = 'FechaPagado';
    } else if (param === 'year') {
      if (this.monthInput) {
        filter = filter + '-' + this.monthInput.month + '-';
      }
      param = 'FechaPagado';
    }
    this.activeFilters[param] = filter;
    Object.keys(this.activeFilters).forEach(key => {
      this.apartmentSet(this.activeFilters[key], key);
    });
  }
  apartmentSet(filter, param: string) {
    const dataTemp = this.rows;
    const colName = param;
    // filter our data

    this.rows = dataTemp.filter(d => {
      if (d[colName] !== '') {
        return d[colName].toString().indexOf(filter) !== -1 || !filter;
      }
    });
  }
  monthToString(month): string {
    return '-' + month + '-';
  }
}
