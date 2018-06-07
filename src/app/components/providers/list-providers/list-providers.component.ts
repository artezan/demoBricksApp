import { Providers } from './../../../models/provider.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.scss']
})
export class ListProvidersComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  providerSelect: Providers[];
  realData: Providers[];
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private providersService: ProvidersService,
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
        prop: 'Id_Proveedor',
        name: 'Id_Proveedor',
        width: '30'
      },
      {
        prop: 'NombreProveedor',
        name: 'Nombre Proveedor',
        width: '100'
      },
      {
        prop: 'Domicilio',
        name: 'Domicilio',
        width: '90'
      },
      {
        prop: 'Correo',
        name: 'Correo',
        width: '90'
      },
      {
        prop: 'Telefono',
        name: 'Telefono',
        width: '80'
      },
      {
        prop: 'NombreCheque',
        name: 'Nombre Cheque',
        width: '80'
      },
      {
        prop: 'Banco',
        name: 'Banco',
        width: '30'
      },
      {
        prop: 'Cuenta',
        name: 'Cuenta',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'proveedores');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.providersService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Providers[]) {
    this.realData = data;
    const arrRows: Providers[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id_Proveedor: item.Id_Proveedor,
          NombreProveedor: item.NombreProveedor,
          Domicilio: item.Domicilio,
          Correo: item.Correo,
          Telefono: item.Telefono,
          NombreCheque: item.NombreCheque,
          Banco: item.Banco,
          Cuenta: item.Cuenta
        });
      }
    });
    this.rows = arrRows;
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un proveedor';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-providers']);
    this.providersService.providerSelect = this.providerSelect;
  }
  select(event: Providers[]) {
    this.providerSelect = this.realData.filter(item => {
      if (item.Id_Proveedor === event[0].Id_Proveedor) {
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
