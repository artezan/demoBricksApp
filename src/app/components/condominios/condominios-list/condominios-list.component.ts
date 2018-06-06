import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CondoService } from '../../../services/condo.service';
import { Condo } from '../../../models/condo';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import {MatSnackBar} from '@angular/material';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-condominios-list',
  templateUrl: './condominios-list.component.html',
  styleUrls: ['./condominios-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CondominiosListComponent implements OnInit {
  loadingIndicator = true;
  columns: any;
  rows: any;
  rows2: any;
  userSelect: Condo;
  errorToShow = '';
  constructor(
    private route: ActivatedRoute,
    public condoService: CondoService,
    private router: Router,
    private controllerMenu: ControllerMenuService,
    public snackBar: MatSnackBar,
    public userService: UserService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
      }
    });
  }

  ngOnInit() {
    this.controllerMenu.menuSettings(true, false, '');
    this.columns = [
      {
        prop: 'Id_Condominio',
        name: 'Id_Condominio',
        width: '100'
      },
      {
        name: 'Dirección',
        prop: 'Direccion',
        width: '150'
      },
      {
        prop: 'Ciudad',
        name: 'Ciudad',
        width: '150'
      },
      {
        prop: 'Colonia',
        name: 'Colonia',
        width: '150'
      },
      {
        prop: 'Saldo',
        name: 'Saldo',
        width: '150'
      },
      {
        prop: 'Banco',
        name: 'Banco',
        width: '150'
      },
      {
        prop: 'Cuenta',
        name: 'Cuenta',
        width: '150'
      }
    ];
    this.getData();
  }
  getData() {
    this.loadingIndicator = true;
    this.condoService.getCondoData().subscribe(data => {
      this.loadingIndicator = false;
      this.generateRows(data);
    });
  }
  generateRows(data: Condo[]) {
    const arrRows: Condo[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id_Condominio: item.Id_Condominio,
          Direccion: item.Direccion,
          Ciudad: item.Ciudad,
          Colonia: item.Colonia,
          Saldo: item.Saldo,
          Banco: item.Banco,
          Cuenta: item.Cuenta
        });
      }
    });
    this.rows = arrRows;
  }
  link() {
    const input = document.getElementById('fileInput').click();
  }
  select(event) {
    this.userSelect = event;
  }
  edit() {
    const condo: NavigationExtras = {
      queryParams: this.userSelect[0]
    };
    this.router.navigate(['new-edit-condo'], condo);
  }
  details() {
    const condo: NavigationExtras = {
      queryParams: this.userSelect[0]
    };
    this.router.navigate(['list-depa']);
    this.userService.userDataSelect.next(this.userSelect[0]);
    this.userService.datass = this.userSelect[0];
  }
  getPopMessage(event) {
    const isDisabledDetails = (<HTMLInputElement>(
      document.getElementById('details')
    )).disabled;
    if (isDisabledDetails) {
      this.errorToShow = 'Seleccione un condominio';
    } else {
      this.errorToShow = '';
    }
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un condominio';
    } else {
      this.errorToShow = '';
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
