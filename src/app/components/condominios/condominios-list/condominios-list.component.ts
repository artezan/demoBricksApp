import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondoService } from '../../../services/condo.service';
import { Condo } from '../../../models/condo';
import { TableControllerService } from '../../shared/general-table/table-controller.service';

@Component({
  selector: 'app-condominios-list',
  templateUrl: './condominios-list.component.html',
  styleUrls: ['./condominios-list.component.scss']
})
export class CondominiosListComponent implements OnInit {
  loadingIndicator = true;
  columns: any;
  rows: any;
  rows2: any;
  constructor(
    private route: ActivatedRoute,
    public condoService: CondoService,
    public controllerTable: TableControllerService
  ) {}

  ngOnInit() {
    this.columns = [
      {
        prop: 'Id_Condominio',
        name: 'Id_Condominio'
      },
      {
        name: 'Dirección',
        prop: 'Direccion'
      },
      {
        prop: 'Ciudad',
        name: 'Ciudad'
      },
      {
        prop: 'Colonia',
        name: 'Colonia'
      },
      {
        prop: 'Saldo',
        name: 'Saldo'
      },
      {
        prop: 'Banco',
        name: 'Banco'
      },
      {
        prop: 'Cuenta',
        name: 'Cuenta'
      }
    ];
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.getData(params['correo'], params['contra']);
    });
  }
  getData(email, password) {
    this.loadingIndicator = true;
    this.condoService.getCondoData(email, password).subscribe(data => {
      this.loadingIndicator = false;
      this.generateRows(data);
    });
  }
  generateRows(data: Condo[]) {
    // this.rows = [
    //   {
    //     Direccion: 'Real de Los Reyes 87',
    //     Id_Condominio: 0,
    //     Ciudad: 'CDMX',
    //     Colonia: 'Los Reyes',
    //     Saldo: '401500.00',
    //     Banco: 'HSBC',
    //     Cuenta: 'Cuenta'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    //   {
    //     Id_Condominio: 1,
    //     Direccion: 'Real de los Reyes 88',
    //     Ciudad: 'Los Reyes',
    //     Colonia: 'CDMX',
    //     Saldo: '85061.00',
    //     Banco: 'HSBC',
    //     Cuenta: '1203491834092'
    //   },
    // ];
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
    console.log(arrRows);
    this.rows = arrRows;
  }
}
