import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { Propietary } from '../../../models/propietary';
import { PropietariesService } from '../../../services/propietaries.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-propietaries',
  templateUrl: './list-propietaries.component.html',
  styleUrls: ['./list-propietaries.component.scss']
})
export class ListPropietariesComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  propietarySelect: Propietary[];
  realData: Propietary[];
  hasData: boolean;
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private porpietariesService: PropietariesService,
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
        prop: 'Id_Propietario',
        name: 'Id_Propietario',
        width: '30'
      },
      {
        prop: 'NombrePropietario',
        name: 'Propietario',
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
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'propietarios');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.porpietariesService.getData(id).subscribe(data => {
      this.loadingIndicator = false;
      this.generateRows(data);
    });
  }
  generateRows(data: Propietary[]) {
    if (data.length === 1) {
      this.hasData = false;
    } else {
      this.hasData = true;
      this.realData = data;
      const arrRows: Propietary[] = [];
      data.forEach(item => {
        if (item.error !== '') {
          arrRows.push({
            Id_Propietario: item.Id_Propietario,
            NombrePropietario: item.NombrePropietario,
            ApellidoPaterno: item.ApellidoPaterno,
            ApellidoMaterno: item.ApellidoMaterno,
            CorreoElectronico: item.CorreoElectronico,
            TelefonoDepa: item.TelefonoDepa,
            TelefonoCel: item.TelefonoCel,
            TelefonoOficina: item.TelefonoOficina
          });
        }
      });
      this.rows = arrRows;
    }
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione una fila';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-propietaries']);
    this.porpietariesService.propietarySelect = this.propietarySelect;
  }
  select(event: Propietary[]) {
    this.propietarySelect = this.realData.filter(item => {
      if (item.Id_Propietario === event[0].Id_Propietario) {
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
