import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondoService } from '../../../services/condo.service';
import { Condo } from '../../../models/condo';

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
    public condoService: CondoService
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
}
