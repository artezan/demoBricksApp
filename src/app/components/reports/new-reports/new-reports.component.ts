import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment';
import { ActivatedRoute, Router } from '@angular/router';
import { RenterService } from '../../../services/renter.service';
import { Renter } from '../../../models/renter';
import { MatSnackBar } from '@angular/material';
import { PropietariesService } from '../../../services/propietaries.service';
import { Propietary } from '../../../models/propietary';

@Component({
  selector: 'app-new-reports',
  templateUrl: './new-reports.component.html',
  styleUrls: ['./new-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewReportsComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  columnsRenters: any;
  columnsPropietaries: any;
  columnsReport;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  rows2: any;
  rowsRenter: any;
  rowsPropietaries: any;
  rowsPropietaries2: any;
  rowsReport: any;
  renterSelect: Renter[];
  renterReport: Renter[];
  selectionType = 'multiClick';
  id;
  removable = true;
  arrUsers = [];
  selected = [];
  arrReports = [];
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private renterService: RenterService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public propietariesService: PropietariesService
  ) {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
      }
    });
  }

  ngOnInit() {
    // todos
    this.getAll();
    // inquilinos
    // propietarios
    // reportes
    this.getReportsTable();

    this.controllerMenu.menuSettings(false, false, 'reports');
  }
  getAll() {
    this.columns = [
      {
        prop: 'Nombre',
        name: 'Nombre',
        width: '100'
      },
      {
        prop: 'ApellidoPaterno',
        name: 'Paterno',
        width: '90'
      },
      {
        prop: 'CorreoElectronico',
        name: 'Correo',
        width: '80'
      }
    ];
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.id = params['Id_Condominio'];
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.propietariesService.getData(id).subscribe(propietary => {
      this.renterService.getData(id).subscribe(renter => {
        this.generateRows(renter, propietary);
      });
    });
  }
  generateRows(renter: Renter[], propietary: Propietary[]) {
    const arrRows = [];
    renter.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id: item.Id_Inquilino,
          Nombre: item.NombreInquilino,
          ApellidoPaterno: item.ApellidoPaterno,
          CorreoElectronico: item.CorreoElectronico,
          type: 'renter'
        });
      }
    });
    propietary.forEach(item => {
      arrRows.push({
        Nombre: item.NombrePropietario,
        ApellidoPaterno: item.ApellidoPaterno,
        CorreoElectronico: item.CorreoElectronico,
        Id: item.Id_Propietario,
        EsJunta: item.EsJunta,
        type: 'propietary'
      });
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
  }
  getReportsTable() {
    this.columnsReport = [
      {
        prop: 'Reporte',
        name: 'Reporte',
        width: '50'
      },
      {
        prop: 'Cantidad',
        name: 'Cantidad',
        width: '30'
      }
    ];
    const arrRows = [
      {
        Reporte: 'Resumen Ingresos',
        Cantidad: 1
      },
      {
        Reporte: 'Resumen Egresos',
        Cantidad: 1
      },
      {
        Reporte: 'Resumen Ingresos',
        Cantidad: 1
      },
      {
        Reporte: 'Resumen Egresos',
        Cantidad: 1
      },
      {
        Reporte: 'Resumen Ingresos',
        Cantidad: 1
      },
      {
        Reporte: 'Resumen Egresos',
        Cantidad: 1
      }
    ];
    this.rowsReport = arrRows;
  }

  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('enviar'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Verifique los datos';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-renter']);
    this.renterService.renterSelect = this.renterSelect;
  }
  select(event: [{ Id: string; Nombre: string; CorreoElectronico: string }]) {
    this.arrUsers = event;
    this.arrUsers = [...this.arrUsers];
    if (!event.length) {
      this.arrUsers.length = 0;
    }
  }
  selectReport(event) {
    this.arrReports = event;
    this.arrReports = [...this.arrReports];
    if (!event.length) {
      this.arrReports.length = 0;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item) {
    this.arrUsers.splice(this.arrUsers.indexOf(item.Id), 1);
    this.arrUsers = [...this.arrUsers];
  }
  removeReport(item) {
    this.arrReports.splice(this.arrReports.indexOf(item.Reporte), 1);
    this.arrReports = [...this.arrReports];
  }
  updateSel(event) {
    if (event.index === 0) {
      this.rows = this.rows2;
    }
    if (event.index === 1) {
      const arr: any[] = this.rows2;
     const arrFilter = arr.filter(rows => {
        if (rows.type === 'renter') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }
    if (event.index === 2) {
      const arr: any[] = this.rows2;
     const arrFilter = arr.filter(rows => {
        if (rows.type === 'propietary') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }
    if (event.index === 3) {
      const arr: any[] = this.rows2;
     const arrFilter = arr.filter(rows => {
        if (rows.type === 'propietary' && rows.EsJunta === 'true') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }

  }
}
