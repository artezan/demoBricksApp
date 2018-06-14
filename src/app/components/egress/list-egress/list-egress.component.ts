import { EgressService } from './../../../services/egress.service';
import { Egress } from './../../../models/egress.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { GeneralDialogComponent } from '../../shared/general-dialog/general-dialog.component';

@Component({
  selector: 'app-list-egress',
  templateUrl: './list-egress.component.html',
  styleUrls: ['./list-egress.component.scss']
})
export class ListEgressComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  egressSelect: Egress[];
  realData: Egress[];
  rows2;
  state: string;
  monthInput;
  yearInput: string;
  yearOptions: string[] = [];
  activeFilters = { Variable: '', Año: 0, Mes: 0 };
  removable = true;
  idCondo: string;
  isPay = true;
  isTransit = true;

  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private egressService: EgressService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        if (!params.balanceAfter) {
          this.openSnackBar(params.res.toString());
        } else {
          this.openDialog(
            params.monto,
            params.balanceBefore,
            params.balanceAfter
          );
        }
      }
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'Id_Egreso',
        name: 'Id_Egreso',
        width: '30'
      },
      {
        prop: 'Id_Proveedor',
        name: 'Id_Proveedor',
        width: '30'
      },
      {
        prop: 'NombreProveedor',
        name: 'Proveedor',
        width: '90'
      },
      {
        prop: 'NombreServicio',
        name: 'Servicio',
        width: '90'
      },
      {
        prop: 'Monto',
        name: 'Precio',
        width: '80'
      },
      {
        prop: 'Periodo',
        name: 'Tipo',
        width: '80'
      },
      {
        prop: 'datePeriodo',
        name: 'Periodo',
        width: '50'
      },
      {
        prop: 'FechaCobrado',
        name: 'Fecha Cobrado',
        width: '80'
      },
      {
        prop: 'Estado',
        name: 'Estado',
        width: '80'
      },
      {
        prop: 'NumeroCheque',
        name: 'Numero Cheque',
        width: '80'
      },
      {
        prop: 'Variable',
        name: 'Tipo',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'egresos');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.idCondo = params.Id_Condominio;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.egressService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Egress[]) {
    this.realData = data;
    const arrRows: Egress[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        let isVariable: string;
        if (item.Variable === '1') {
          isVariable = 'Variable';
        } else if (item.Variable === '0') {
          isVariable = 'Fijo';
        }
        const datePeriodo = item.Mes + '/' + item.Año;
        arrRows.push({
          Id_Egreso: item.Id_Egreso,
          Id_Proveedor: item.Id_Proveedor,
          NombreProveedor: item.NombreProveedor,
          NombreServicio: item.NombreServicio,
          Monto: item.Monto,
          Periodo: item.Periodo,
          datePeriodo: datePeriodo,
          FechaCobrado: item.FechaCobrado,
          Estado: item.Estado,
          NumeroCheque: item.NumeroCheque,
          Variable: isVariable,
          Mes: +item.Mes,
          Año: +item.Año
        });
      }
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
    // set years
    arrRows.forEach(item => {
      const year = item.Año;
      if (!isNaN(year)) {
        if (this.yearOptions.indexOf(year.toString()) === -1) {
          this.yearOptions.push(year.toString());
        }
      }
    });
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('recibo'))
      .disabled;
    const isDisabledPay = (<HTMLInputElement>document.getElementById('pay'))
      .disabled;
    const isDisabledTransit = (<HTMLInputElement>(
      document.getElementById('transit')
    )).disabled;
    if (isDisabledPay && event.target.textContent === 'Pagar') {
      this.errorToShow = 'Seleccione un egreso en transito';
    } else if (isDisabledTransit && event.target.textContent === 'Transito') {
      this.errorToShow = 'Seleccione un egreso pagado';
    } else if (isDisabledEdit && event.target.textContent === 'Recibo') {
      this.errorToShow = 'Seleccione un egreso';
    } else {
      this.errorToShow = '';
    }
  }
  // edit() {
  //   this.router.navigate(['new-edit-renter']);
  //   this.renterService.renterSelect = this.renterSelect;
  // }
  select(event: Egress[]) {
    this.egressSelect = this.realData.filter(item => {
      if (item.Id_Egreso === event[0].Id_Egreso) {
        return item;
      }
    });
    if (this.egressSelect[0].Estado === 'Pagado') {
      this.isPay = true;
      this.isTransit = false;
    }
    if (this.egressSelect[0].Estado === 'En transito') {
      this.isTransit = true;
      this.isPay = false;
    }
    console.log(this.egressSelect)
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item: string) {
    if (item === 'state') {
      this.state = undefined;
      this.state = undefined;
      delete this.activeFilters.Variable;
    }
    if (item === 'monthInput') {
      this.monthInput = undefined;
      delete this.activeFilters.Mes;
    }
    if (item === 'yearInput') {
      this.yearInput = undefined;
      delete this.activeFilters.Año;
    }
    this.rows = this.rows2;
    Object.keys(this.activeFilters).forEach(key => {
      this.searchSet(this.activeFilters[key], key);
    });
  }
  /**
   *
   * @param filter string a buscar
   * @param param columna en donde esta
   */
  setfilters(filter, param: string) {
    this.rows = this.rows2;
    this.activeFilters[param] = filter;
    Object.keys(this.activeFilters).forEach(key => {
      this.searchSet(this.activeFilters[key], key);
    });
  }
  /**
   *
   * @param filter string a buscar
   * @param param columna en donde esta
   */
  searchSet(filter, param: string) {
    const dataTemp = this.rows;
    if (param === 'Año' || param === 'Mes') {
      if (filter !== 0) {
        this.rows = dataTemp.filter(d => {
          if (+d[param] === +filter) {
            return d;
          }
        });
      }
    } else {
      // filter our data
      if (filter !== '') {
        this.rows = dataTemp.filter(data => {
          if (data[param] === filter) {
            return data;
          }
        });
      }
    }
  }
  openDialog(monto, balanceBefore, balanceAfter): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        monto: monto,
        balanceBefore: balanceBefore,
        balanceAfter: balanceAfter
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  pay() {
    this.egressService
      .payEgress(this.idCondo, this.egressSelect[0].Id_Egreso)
      .subscribe(res => {
        this.updateTable();
        this.openSnackBar(res.respuesta);
      });
  }
  transit() {
    this.egressService
      .transitEgress(this.idCondo, this.egressSelect[0].Id_Egreso)
      .subscribe(res => {
        this.updateTable();
        this.openSnackBar(res.respuesta);
      });
  }
  updateTable() {
    this.getData(this.idCondo);
    this.rows = [...this.rows];
  }
}
