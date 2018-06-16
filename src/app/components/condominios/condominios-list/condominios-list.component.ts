import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CondoService } from '../../../services/condo.service';
import { Condo } from '../../../models/condo';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../services/user.service';
import * as XLSX from 'xlsx';
import { END_POINT } from '../../../_config/api.end-points';

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
  userSelect: Condo[];
  realData: Condo[];
  errorToShow = '';
  dataXls;
  constructor(
    private route: ActivatedRoute,
    public condoService: CondoService,
    private router: Router,
    private controllerMenu: ControllerMenuService,
    public snackBar: MatSnackBar,
    public userService: UserService,
    public http: HttpClient
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
    this.realData = data;
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
  select(event: Condo[]) {
    this.userSelect = this.realData.filter(item => {
      if (item.Id_Condominio === event[0].Id_Condominio) {
        return item;
      }
    });
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
    this.userService.userDataSelect.next({
      Saldo: +this.userSelect[0].Saldo,
      Colonia: this.userSelect[0].Colonia,
      Id_Condominio: this.userSelect[0].Id_Condominio
    });
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
  detectFiles(evt: any) {
    this.loadingIndicator = true;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // /* grab first sheet */
      // const wsname: string = wb.SheetNames[1];
      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // /* save data */
      // this.dataXls = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      const dataExcelJson = this.exelToJson(wb);
      this.uplodadData(dataExcelJson);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  private exelToJson(wb: XLSX.WorkBook): Array<{ data: any[]; name: string }> {
    const arrJson = [];
    let columsNames: string[];
    wb.SheetNames.forEach(sheetName => {
      const arrRows = [];
      const dataRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
        header: 1
      });
      dataRows.forEach((row: Array<any>, numRow) => {
        const obj = {};
        // caputa nombre de colums
        if (numRow === 0) {
          columsNames = row;
        } else {
          // crea un obj con nomColumna: dato
          if (columsNames.length === row.length) {
            columsNames.forEach((nameColum, numColum) => {
              obj[nameColum] = row[numColum];
            });
            arrRows.push(obj);
          }
        }
      });
      arrJson.push({ name: sheetName, data: arrRows });
    });
    return arrJson;
  }

  // Crear desde Excel
  uplodadData(dataSheet) {
    const userData = localStorage.getItem('userKey');
    const correo = JSON.parse(userData)[0].correo;
    const contra = JSON.parse(userData)[0].contra;
    const sheets: [{ data: any[]; name: string }] = dataSheet;
    const findCondo = sheets.find(sheet => sheet.name === 'Condominio');
    const findDepa = sheets.find(sheet => sheet.name === 'Departamentos');
    const findRenter = sheets.find(sheet => sheet.name === 'Inquilinos');
    const findServer = sheets.find(sheet => sheet.name === 'Servicios');
    if (findCondo.name) {
      this.condoService.newCondo(findCondo.data[0]).subscribe((res: any) => {
        // this.depaService.newApartment(res.Id_Condominio);
        sheets.forEach(sheet => {
          if (sheet.name === 'Propietarios') {
            // crea un prop
            sheet.data.forEach(propietary => {
              propietary.correo = correo;
              propietary.contra = contra;
              propietary.condominio = res.Id_Condominio;
              const dataProp = JSON.stringify([propietary]);
              this.http
                .get(END_POINT.PROPIETARIES_NEW + dataProp)
                .subscribe((resProp: any) => {
                  // crea un depa
                  findDepa.data.forEach(depa => {
                    if (depa.Propietario === propietary.Propietario) {
                      depa.correo = correo;
                      depa.contra = contra;
                      depa.condominio = res.Id_Condominio;
                      depa.Id_Propietario = resProp.Id_Propietario;
                      const dataDepa = JSON.stringify([depa]);
                      this.http
                        .get(END_POINT.APART_NEW + dataDepa)
                        .subscribe((resDepa: any) => {
                          // crea inquilino
                          findRenter.data.forEach(renter => {
                            if (renter.Departamento === depa.Interior) {
                              renter.correo = correo;
                              renter.contra = contra;
                              renter.Id_Condominio = res.Id_Condominio;
                              renter.Id_Depa = resDepa.Id_Departamento;
                              delete renter.Departamento;
                              const dataRenter = JSON.stringify([renter]);
                              this.http
                                .get(END_POINT.RENTER_NEW + dataRenter)
                                .subscribe(end => {
                                  this.loadingIndicator = false;
                                  console.log(end);
                                });
                            }
                          });
                        });
                    }
                  });
                });
            });
          } else if (sheet.name === 'Proveedores') {
            sheet.data.forEach(providerRes => {
              providerRes.correo = correo;
              providerRes.contra = contra;
              providerRes.Id_Condominio = res.Id_Condominio;
              const dataProp = JSON.stringify([providerRes]);
              this.http
                .get(END_POINT.PROVIDER_NEW + dataProp)
                .subscribe((resIdProv: any) => {
                  // crea server
                  findServer.data.forEach(server => {
                    if (server.Proveedor === providerRes.Proveedor) {
                      server.correo = correo;
                      server.contra = contra;
                      server.Id_Condominio = res.Id_Condominio;
                      server.Id_Proveedor = resIdProv.Id_Proveedor;
                      const dataServer = JSON.stringify([server]);
                      this.http
                        .get(END_POINT.SERVICE_NEW + dataServer)
                        .subscribe(end => console.log(end));
                    }
                  });
                });
            });
          }
        });
      });
    }
    this.updateTable();
    this.openSnackBar('Condominio agregado desde Excel');
  }
  // helper
  updateTable() {
    this.getData();
    this.rows = [...this.rows];
  }
  // excel to json
}
