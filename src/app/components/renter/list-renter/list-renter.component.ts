import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment';
import { ActivatedRoute, Router } from '@angular/router';
import { RenterService } from '../../../services/renter.service';
import { Renter } from '../../../models/renter';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-renter',
  templateUrl: './list-renter.component.html',
  styleUrls: ['./list-renter.component.scss']
})
export class ListRenterComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  renterSelect: Renter[];
  realData: Renter[];
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private renterService: RenterService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
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
        prop: 'Id_Inquilino',
        name: 'Id_Inquilino',
        width: '30'
      },
      {
        prop: 'NombreInquilino',
        name: 'Nombre',
        width: '100'
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
        prop: 'CorreoElectronico',
        name: 'Correo',
        width: '80'
      },
      {
        prop: 'TelefonoDepa',
        name: 'TelDepa',
        width: '80'
      },
      {
        prop: 'TelefonoCel',
        name: 'Celular',
        width: '30'
      },
      {
        prop: 'TelefonoOficina',
        name: 'Tel Oficina',
        width: '80'
      },
      {
        prop: 'Condominio',
        name: 'Departamento',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'inquilinos');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.renterService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Renter[]) {
    this.realData = data;
    const arrRows: Renter[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id_Inquilino: item.Id_Inquilino,
          NombreInquilino: item.NombreInquilino,
          ApellidoPaterno: item.ApellidoPaterno,
          ApellidoMaterno: item.ApellidoMaterno,
          CorreoElectronico: item.CorreoElectronico,
          TelefonoDepa: item.TelefonoDepa,
          TelefonoCel: item.TelefonoCel,
          TelefonoOficina: item.TelefonoOficina,
          Condominio: item.Condominio
        });
      }
    });
    this.rows = arrRows;
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un inquilino';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-renter']);
    this.renterService.renterSelect = this.renterSelect;
  }
  select(event: Renter[]) {
    this.renterSelect = this.realData.filter(item => {
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
}
