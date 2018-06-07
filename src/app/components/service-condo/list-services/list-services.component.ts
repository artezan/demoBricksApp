import { ServicesCondoService } from './../../../services/services-condo.service';
import { Service } from './../../../models/service.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  serviceSelect: Service[];
  realData: Service[];
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public servicesCondoService: ServicesCondoService
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
        prop: 'Id_Servicio',
        name: 'Id_Servicio',
        width: '50'
      },
      {
        prop: 'Id_Proveedor',
        name: 'Id_Proveedor',
        width: '50'
      },
      {
        prop: 'NombreProveedor',
        name: 'Nombre Proveedor',
        width: '100'
      },
      {
        prop: 'NombreServicio',
        name: 'Nombre Servicio',
        width: '100'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'servicios');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.servicesCondoService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Service[]) {
    this.realData = data;
    const arrRows: Service[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id_Servicio: item.Id_Servicio,
          Id_Proveedor: item.Id_Proveedor,
          NombreProveedor: item.NombreProveedor,
          NombreServicio: item.NombreServicio
        });
      }
    });
    this.rows = arrRows;
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un Servicio';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-services']);
    this.servicesCondoService.serviceSelect = this.serviceSelect;
  }
  select(event: Service[]) {
    this.serviceSelect = this.realData.filter(item => {
      if (item.Id_Servicio === event[0].Id_Servicio) {
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
