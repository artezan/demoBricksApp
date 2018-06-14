import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CondoService } from '../../../services/condo.service';
import { Condo } from '../../../models/condo';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { MatSnackBar } from '@angular/material';
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
    this.route.queryParams.subscribe(params => {
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
    // this.condoService.selectCondo = this.userSelect[0];
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
      duration: 3000
    });
  }
  detectFiles(event) {
    const file = event.target.files[0];
    const name: string = event.target.files.item(0).name;
    const reader = new FileReader();
    reader.onload = r => {
      const jsonData = this.csvTojs(reader.result);
      this.uplodadData(jsonData);
    };
    reader.readAsText(file);
  }
  uplodadData(data: any[]) {
    data.forEach(item => {
    this.updateTable(item);
      this.condoService.newCondo(item).subscribe((res: any) => {
        console.log(res);
      });
    });
    const toast: NavigationExtras = {
      queryParams: { res: 'Condominio agregado desde Excel' }
    };

    this.router.navigate(['list-condo'], toast);
  }
  // helper
  updateTable(item) {
    this.rows.push(item);
    this.rows = [...this.rows];
  }
  csvTojs(csv) {
    // tslint:disable:prefer-const
    let lines = csv.split('\n');
    let result = [];
    let headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      let obj = {};

      let row = lines[i],
        queryIdx = 0,
        startValueIdx = 0,
        idx = 0;

      if (row.trim() === '') {
        continue;
      }

      while (idx < row.length) {
        /* if we meet a double quote we skip until the next one */
        let c = row[idx];

        if (c === '"') {
          do {
            c = row[++idx];
          } while (c !== '"' && idx < row.length - 1);
        }

        if (
          c === ',' ||
          /* handle end of line with no comma */ idx === row.length - 1
        ) {
          /* we've got a value */
          let value = row.substr(startValueIdx, idx - startValueIdx).trim();

          /* skip first double quote */
          if (value[0] === '"') {
            value = value.substr(1);
          }
          /* skip last comma */
          if (value[value.length - 1] === ',') {
            value = value.substr(0, value.length - 1);
          }
          /* skip last double quote */
          if (value[value.length - 1] === '"') {
            value = value.substr(0, value.length - 1);
          }

          const key = headers[queryIdx++];
          obj[key.trim()] = value;
          startValueIdx = idx + 1;
        }

        ++idx;
      }

      result.push(obj);
    }
    // return result;
    const arrResult = [];
    result.forEach(item => {
      const objectTrasnform = {};
      Object.keys(item).forEach(key => {
        // numero
        if (item[key] !== '') {
          if (!isNaN(item[key])) {
            objectTrasnform[key] = +item[key];
          } else {
            objectTrasnform[key] = item[key];
          }
        } else {
          objectTrasnform[key] = item[key];
        }
      });
      arrResult.push(objectTrasnform);
    });

    return arrResult;
  }
}
