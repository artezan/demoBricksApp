import { PdfEmailService } from './../../../services/pdf-email.service';
import { PropietariesService } from './../../../services/propietaries.service';
import { Providers } from './../../../models/provider.model';
import { ProvidersService } from './../../../services/providers.service';
import { EgressService } from './../../../services/egress.service';
import { Egress } from './../../../models/egress.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { GeneralDialogComponent } from '../../shared/general-dialog/general-dialog.component';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { logoImgB64 } from '../../../_config/logo-img-b64';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-egress',
  templateUrl: './list-egress.component.html',
  styleUrls: ['./list-egress.component.scss']
})
export class ListEgressComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  egressSelect: Egress[];
  realData: Egress[];
  rows2;
  state: string;
  monthInput;
  yearInput: string;
  yearOptions: string[] = [];
  activeFilters = { Variable: '', Año: 0, Mes: 0 };
  removable = true;
  idCondo: string;
  isPay = true;
  isTransit = true;

  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private egressService: EgressService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private providersService: ProvidersService,
    private propietaryService: PropietariesService,
    private pdfEmailService: PdfEmailService
  ) {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        if (!params.balanceAfter) {
          this.openSnackBar(params.res.toString());
        } else {
          this.openDialog(
            params.monto,
            params.balanceBefore,
            params.balanceAfter
          );
        }
      }
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'Id_Egreso',
        name: 'Id_Egreso',
        width: '30'
      },
      {
        prop: 'Id_Proveedor',
        name: 'Id_Proveedor',
        width: '30'
      },
      {
        prop: 'NombreProveedor',
        name: 'Proveedor',
        width: '90'
      },
      {
        prop: 'NombreServicio',
        name: 'Servicio',
        width: '90'
      },
      {
        prop: 'Monto',
        name: 'Precio',
        width: '80'
      },
      {
        prop: 'Periodo',
        name: 'Tipo',
        width: '80'
      },
      {
        prop: 'datePeriodo',
        name: 'Periodo',
        width: '50'
      },
      {
        prop: 'FechaCobrado',
        name: 'Fecha Cobrado',
        width: '80'
      },
      {
        prop: 'Estado',
        name: 'Estado',
        width: '80'
      },
      {
        prop: 'NumeroCheque',
        name: 'Numero Cheque',
        width: '80'
      },
      {
        prop: 'Variable',
        name: 'Tipo',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'egresos');
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.idCondo = params.Id_Condominio;
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.egressService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Egress[]) {
    this.realData = data;
    const arrRows: Egress[] = [];
    data.forEach(item => {
      if (item.error !== '') {
        let isVariable: string;
        if (item.Variable === '1') {
          isVariable = 'Variable';
        } else if (item.Variable === '0') {
          isVariable = 'Fijo';
        }
        const datePeriodo = item.Mes + '/' + item.Año;
        arrRows.push({
          Id_Egreso: item.Id_Egreso,
          Id_Proveedor: item.Id_Proveedor,
          NombreProveedor: item.NombreProveedor,
          NombreServicio: item.NombreServicio,
          Monto: item.Monto,
          Periodo: item.Periodo,
          datePeriodo: datePeriodo,
          FechaCobrado: item.FechaCobrado,
          Estado: item.Estado,
          NumeroCheque: item.NumeroCheque,
          Variable: isVariable,
          Mes: +item.Mes,
          Año: +item.Año
        });
      }
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
    // set years
    arrRows.forEach(item => {
      const year = item.Año;
      if (!isNaN(year)) {
        if (this.yearOptions.indexOf(year.toString()) === -1) {
          this.yearOptions.push(year.toString());
        }
      }
    });
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('recibo'))
      .disabled;
    const isDisabledPay = (<HTMLInputElement>document.getElementById('pay'))
      .disabled;
    const isDisabledTransit = (<HTMLInputElement>(
      document.getElementById('transit')
    )).disabled;
    if (isDisabledPay && event.target.textContent === 'Pagar') {
      this.errorToShow = 'Seleccione un egreso en transito';
    } else if (isDisabledTransit && event.target.textContent === 'Transito') {
      this.errorToShow = 'Seleccione un egreso pagado';
    } else if (isDisabledEdit && event.target.textContent === 'Recibo') {
      this.errorToShow = 'Seleccione un egreso';
    } else {
      this.errorToShow = '';
    }
  }
  // edit() {
  //   this.router.navigate(['new-edit-renter']);
  //   this.renterService.renterSelect = this.renterSelect;
  // }
  select(event: Egress[]) {
    this.egressSelect = this.realData.filter(item => {
      if (item.Id_Egreso === event[0].Id_Egreso) {
        return item;
      }
    });
    if (this.egressSelect[0].Estado === 'Pagado') {
      this.isPay = true;
      this.isTransit = false;
    }
    if (this.egressSelect[0].Estado === 'En transito') {
      this.isTransit = true;
      this.isPay = false;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item: string) {
    if (item === 'state') {
      this.state = undefined;
      this.state = undefined;
      delete this.activeFilters.Variable;
    }
    if (item === 'monthInput') {
      this.monthInput = undefined;
      delete this.activeFilters.Mes;
    }
    if (item === 'yearInput') {
      this.yearInput = undefined;
      delete this.activeFilters.Año;
    }
    this.rows = this.rows2;
    Object.keys(this.activeFilters).forEach(key => {
      this.searchSet(this.activeFilters[key], key);
    });
  }
  /**
   *
   * @param filter string a buscar
   * @param param columna en donde esta
   */
  setfilters(filter, param: string) {
    this.rows = this.rows2;
    this.activeFilters[param] = filter;
    Object.keys(this.activeFilters).forEach(key => {
      this.searchSet(this.activeFilters[key], key);
    });
  }
  /**
   *
   * @param filter string a buscar
   * @param param columna en donde esta
   */
  searchSet(filter, param: string) {
    const dataTemp = this.rows;
    if (param === 'Año' || param === 'Mes') {
      if (filter !== 0) {
        this.rows = dataTemp.filter(d => {
          if (+d[param] === +filter) {
            return d;
          }
        });
      }
    } else {
      // filter our data
      if (filter !== '') {
        this.rows = dataTemp.filter(data => {
          if (data[param] === filter) {
            return data;
          }
        });
      }
    }
  }
  openDialog(monto, balanceBefore, balanceAfter): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        monto: monto,
        balanceBefore: balanceBefore,
        balanceAfter: balanceAfter
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  pay() {
    this.egressService
      .payEgress(this.idCondo, this.egressSelect[0].Id_Egreso)
      .subscribe(res => {
        this.updateTable();
        this.openSnackBar(res.respuesta);
      });
  }
  transit() {
    this.egressService
      .transitEgress(this.idCondo, this.egressSelect[0].Id_Egreso)
      .subscribe(res => {
        this.updateTable();
        this.openSnackBar(res.respuesta);
      });
  }
  updateTable() {
    this.getData(this.idCondo);
    this.rows = [...this.rows];
  }
  // PDF
  pdf(isToSend) {
    this.providersService.getData(this.idCondo).subscribe(res => {
      const providerSelect = res.filter(provider => {
        if (provider.Id_Proveedor === this.egressSelect[0].Id_Proveedor) {
          return provider;
        }
      });
      const date = new Date(Date.now());
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      const dateFormat: string = day + '/' + month + '/' + year;
      const docDefinition = {
        header: [
          {
            image: logoImgB64,
            width: 150,
            style: 'rightme',
            fit: [100, 100]
          }
        ],
        content: [
          {
            text: 'Golem\n\n',
            style: 'header'
          },
          {
            text: 'Condominio: ' + this.condoName,
            style: 'subheader'
          },
          {
            text: 'Poliza de Egreso',
            style: 'subheader2'
          },
          {
            table: {
              widths: ['*'],
              body: [[' '], [' ']]
            },
            layout: {
              hLineWidth: function(i, node) {
                return i === 0 || i === node.table.body.length ? 0 : 2;
              },
              vLineWidth: function(i, node) {
                return 0;
              }
            }
          },
          {
            columns: [
              {
                text: ' '
              },
              {
                text: 'Fecha: ' + dateFormat,
                style: 'rightme'
              }
            ]
          },
          {
            text: [
              {
                text: 'Nombre Beneficiario: ',
                bold: true
              },
              {
                text: ' ' + providerSelect[0].NombreCheque
              }
            ],
            alignment: 'justify'
          },
          {
            text: '\n'
          },
          {
            text: 'Monto: ',
            bold: true
          },
          {
            text: ' ' + this.egressSelect[0].Monto
          },
          {
            text: '\n'
          },
          {
            columns: [
              {
                text: 'Banco: ',
                bold: true
              },
              {
                text: 'Numero de Cuenta: ',
                bold: true
              },
              {
                text: 'Numero de Cheque: ',
                bold: true
              }
            ]
          },
          {
            columns: [
              {
                text: ' ' + providerSelect[0].Banco
              },
              {
                text: ' ' + providerSelect[0].Cuenta
              },
              {
                text: ' ' + this.egressSelect[0].NumeroCheque
              }
            ]
          },
          {
            text: '\n'
          },
          {
            columns: [
              {
                text: ' Concepto: ',
                bold: true
              },
              {
                text: 'Firma de Recibido ',
                bold: true,
                style: 'rightme'
              }
            ]
          },
          {
            columns: [
              {
                text:
                  ' ' +
                  this.egressSelect[0].NombreProveedor +
                  ', Periodo ' +
                  this.egressSelect[0].Mes +
                  '/' +
                  this.egressSelect[0].Año +
                  ', Tipo de pago ' +
                  this.egressSelect[0].Periodo
              },
              {
                text: '__________________',
                style: 'rightme'
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true
          },
          bigger: {
            fontSize: 15,
            italics: true
          },
          center: {
            'text-align': 'center'
          },
          rightme: {
            alignment: 'right'
          },
          subheader: {
            fontSize: 18,
            bold: true
          },
          subheader2: {
            fontSize: 15,
            bold: true
          }
        }
      };
       pdfMake.createPdf(docDefinition).open();
      //  pdfMake.createPdf(docDefinition).download('Recibo');
      if (isToSend) {
        this.sendReport(
          pdfMake.createPdf(docDefinition),
          'Poliza de Egreso',
          providerSelect[0]
        );
      }
    });
  }
  sendReport(pdf, title, provider) {
    console.log(provider);
    this.propietaryService.getData(this.idCondo).subscribe(arrPropietary => {
      const propietary = arrPropietary.find(
        item => item.Id_Propietario === provider.Id_Propietario
      );
      pdf.getBuffer(dataURL => {
        const f = new File([dataURL], 'Recibo.pdf', {
          type: 'application/pdf'
        });
        const formData: FormData = new FormData();
        formData.append('file[]', f);
        formData.append('Asunto', 'Recibo de ' + title);
        formData.append(
          'Mensaje',
          'Hola ' +
            propietary.NombrePropietario +
            ' ' +
            propietary.ApellidoPaterno +
            ' te adjuntamos tu reporte. Saludos'
        );
        formData.append('Destinatarios[0]', propietary.CorreoElectronico);
        this.pdfEmailService.sendPdfEmail(formData).subscribe(c => {
          this.openSnackBar(c.respuesta);
        });
      });
    });
  }

}
