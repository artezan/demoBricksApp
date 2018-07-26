import { PropietariesService } from './../../../services/propietaries.service';
import { RenterService } from './../../../services/renter.service';
import { PdfEmailService } from './../../../services/pdf-email.service';
import { EmailSend } from './../../../models/email-send.model';
import { CondoService } from './../../../services/condo.service';
import { GeneralAlertComponent } from './../../shared/general-alert/general-alert.component';
import { NewEditDepaComponent } from './../../depa/new-edit-depa/new-edit-depa.component';
import { Apartment } from './../../../models/apartment';
import { ApartmentService } from './../../../services/apartment.service';
import { IngressService } from './../../../services/ingress.service';
import { Ingress } from './../../../models/ingress.model';
import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { logoImgB64 } from '../../../_config/logo-img-b64';
import { GeneralDialogComponent } from '../../shared/general-dialog/general-dialog.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-ingress',
  templateUrl: './list-ingress.component.html',
  styleUrls: ['./list-ingress.component.scss']
})
export class ListIngressComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any[];
  rows2;
  id: string;
  sub: any;
  ingressSelect: Ingress[];
  realData: Ingress[];
  panelOpenState = false;
  removable = true;
  selectable = true;
  apartment$: Observable<Apartment[]>;
  apartmentSelect: Apartment;
  state: string;
  monthInput;
  yearInput: string;
  yearOptions: string[] = [];
  apartmentNum: number;
  activeFilters = { Interior: '', Pagado: '', Year: 0, Mes: 0 };
  // pdf
  propietary;
  isSend = false;
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private ingressService: IngressService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public apartmentServices: ApartmentService,
    public dialog: MatDialog,
    public condoService: CondoService,
    private pdfEmailService: PdfEmailService,
    private depaService: ApartmentService,
    private propietariesService: PropietariesService
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
        prop: 'Id_Pago',
        name: 'Id_Pago',
        width: '40'
      },
      {
        name: 'Numero Recibo',
        prop: 'NumeroRecibo',
        width: '80'
      },
      {
        prop: 'Interior',
        name: 'Departamento',
        width: '80'
      },
      {
        prop: 'NombreInquilino',
        name: 'Inquilino',
        width: '90'
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
        prop: 'Concepto',
        name: 'Concepto',
        width: '80'
      },
      {
        prop: 'Total',
        name: 'Total',
        width: '40'
      },
      {
        prop: 'Periodo',
        name: 'Periodo',
        width: '80'
      },
      {
        prop: 'Pagado',
        name: 'Estado',
        width: '80'
      },
      {
        prop: 'FechaPagado',
        name: 'Fecha Pagado',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'ingresos');
    this.sub = this.userService.userDataSelect.subscribe((params: any) => {
      this.id = params['Id_Condominio'];
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
    });
    this.apartment$ = this.apartmentServices.getData(this.id);
    this.getData(this.id);
  }
  getData(id) {
    this.loadingIndicator = true;
    this.ingressService.getData(id).subscribe(data => {
      this.generateRows(data);
    });
  }
  generateRows(data: Ingress[]) {
    console.log(data);
    let isPayment: string;
    this.realData = data;
    const arrRows: Ingress[] = [];
    data.forEach(item => {
      if (item.Pagado === '1') {
        isPayment = 'Pagado';
      } else {
        isPayment = 'Por pagar';
      }
      if (item.error !== '') {
        const year = item.Periodo.substring(item.Periodo.indexOf('/') + 1);
        const month = item.Periodo.substring(0, item.Periodo.indexOf('/'));
        arrRows.push({
          Id_Pago: item.Id_Pago,
          NumeroRecibo: item.NumeroCheque,
          Interior: item.Interior,
          NombreInquilino: item.NombreInquilino,
          ApellidoPaterno: item.ApellidoPaterno,
          ApellidoMaterno: item.ApellidoMaterno,
          Concepto: item.Concepto,
          Total: item.Total,
          Periodo: item.Periodo,
          Pagado: isPayment,
          FechaPagado: item.FechaPagado,
          Year: +year,
          Mes: +month
        });
      }
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
    // set years
    arrRows.forEach(item => {
      const year = item.Year;
      if (!isNaN(year)) {
        if (this.yearOptions.indexOf(year.toString()) === -1) {
          this.yearOptions.push(year.toString());
        }
      }
    });
  }
  getPopMessage(event) {
    const isDisabledDetails = (<HTMLInputElement>(
      document.getElementById('details')
    )).disabled;
    if (isDisabledDetails) {
      this.errorToShow = 'Seleccione un Ingreso';
    } else {
      this.errorToShow = '';
    }
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un Ingreso';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-renter']);
    this.ingressService.ingressSelect = this.ingressSelect;
  }
  generateDoc() {
    if (this.ingressSelect[0].Pagado === '0') {
      this.openSnackBar('Seleccione un ingreso pagado');
    } else {
      this.apartmentServices.getData(this.id).subscribe(data => {
        const depaSelect = data.find(
          apartment => apartment.Id_Depa === this.ingressSelect[0].Id_Depa
        );
        this.propietary = depaSelect.NombrePropietario;
        this.pdf();
      });
    }
  }
  generateDocEmail() {
    if (this.ingressSelect[0].Pagado === '0') {
      this.openSnackBar('Seleccione un ingreso pagado');
    } else {
      this.apartmentServices.getData(this.id).subscribe(data => {
        const depaSelect = data.find(
          apartment => apartment.Id_Depa === this.ingressSelect[0].Id_Depa
        );
        this.propietary = depaSelect.NombrePropietario;
        this.sendPdfEmail();
      });
    }
  }
  select(event: Ingress[]) {
    this.ingressSelect = this.realData.filter(item => {
      if (item.Id_Pago === event[0].Id_Pago) {
        return item;
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item: string) {
    if (item === 'apartmentSelect') {
      this.apartmentSelect = undefined;
      delete this.activeFilters.Interior;
    }
    if (item === 'state') {
      this.state = undefined;
      this.state = undefined;
      delete this.activeFilters.Pagado;
    }
    if (item === 'monthInput') {
      this.monthInput = undefined;
      delete this.activeFilters.Mes;
    }
    if (item === 'yearInput') {
      this.yearInput = undefined;
      delete this.activeFilters.Year;
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
    if (param === 'Year' || param === 'Mes') {
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
  deletePayment(): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: 'Eliminar Ingreso',
        subHeader: 'Desea eliminar:',
        body:
          ' <p><b>Concepto:</b>' +
          this.ingressSelect[0].Concepto +
          '</p> ' +
          ' <p><b>Saldo:</b>' +
          this.ingressSelect[0].Total +
          '</p> ' +
          ' <p><b>Periodo:</b>' +
          this.ingressSelect[0].Periodo +
          '</p> ',
        isform: false
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
        this.deleteIngress();
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  deleteIngress() {
    this.ingressService
      .deleteData(this.ingressSelect[0], this.id)
      .subscribe(data => {
        this.openSnackBar('Ingreso Eliminado');
        this.condoService.getDataById(this.id).subscribe(condo => {
          this.userService.userDataSelect.next({
            Saldo: +condo.Saldo,
            Colonia: this.condoName,
            Id_Condominio: this.id
          });
          this.rows.forEach((item, i) => {
            if (item.Id_Pago === this.ingressSelect[0].Id_Pago) {
              this.rows.splice(i, 1);
            }
          });
          this.rows = [...this.rows];
        });
      });
  }

  // PDF

  pdf() {
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
          text: 'Recibo de Pago',
          style: 'subheader2'
        },
        {
          text: 'Recibo No: ' + this.ingressSelect[0].NumeroCheque,
          style: 'subheader2'
        },
        {
          text: 'Fecha: ' + dateFormat
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
          text: [
            {
              text: 'Recibimos de: ',
              bold: true
            },
            {
              text: ' ' + this.propietary
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: 'Depto: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].Interior
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: 'Correspondiente a: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].Periodo
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: 'Concepto: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].Concepto
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: 'Fecha de pago: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].FechaPagado
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: ' La Cantidad de: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].Total
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: 'Saldo anterior: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].SaldoAnteriorDepa
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: '+Pago: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].Total
            }
          ],
          alignment: 'justify'
        },
        {
          text: [
            {
              text: '=Saldo Nuevo: ',
              bold: true
            },
            {
              text: ' ' + this.ingressSelect[0].SaldoDepartamento
            }
          ],
          alignment: 'justify'
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
          text:
            'EL MONTO DE ESTE PAGO NO EXIME DE ADEUDOS ANTERIORES QUE PUEDA TENER EL CONDOMINIO',
          style: 'subheader',
          alignment: 'center'
        },
        {}
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
   pdfMake.createPdf(docDefinition).download('Recibo');
    return pdfMake.createPdf(docDefinition);
  }
  sendPdfEmail() {
    this.apartmentServices.getData(this.id).subscribe(depaArr => {
      const depa = depaArr.find(
        item => item.Id_Depa === this.ingressSelect[0].Id_Depa
      );
      if (depa) {
        this.propietariesService.getData(this.id).subscribe(propArr => {
          const prop = propArr.find(
            p => p.Id_Propietario === depa.Id_Propietario
          );
          if (prop) {
            this.pdf().getBuffer(dataURL => {
              const f = new File([dataURL], 'Recibo.pdf', {
                type: 'application/pdf'
              });
              const formData: FormData = new FormData();
              formData.append('file[]', f);
              formData.append(
                'Asunto',
                'Recibo de ' + this.ingressSelect[0].Concepto
              );
              formData.append(
                'Mensaje',
                'Hola ' +
                  prop.NombrePropietario +
                  ' ' +
                  prop.ApellidoPaterno +
                  ' te adjuntamos tu recibo. Saludos'
              );
              formData.append('Destinatarios[0]', prop.CorreoElectronico);
              this.pdfEmailService.sendPdfEmail(formData).subscribe(c => {
                this.openSnackBar(c.respuesta);
              });
            });
          }
        });
      }
    });
  }
  // detectFiles(event){
  //   var cargando = false
  //   var loading = this.loadingCtrl.create({
  //     content: 'Cargando archivos...' });
  //   let formData= new FormData();
  //   for (var i = event.target.files.length - 1; i >= 0; i--) {
  //     this.name_arr.push(event.target.files.item(i).name);
  //     this.path_arr.push(event.target.files.item(i).webkitRelativePath);
  //     this.type_arr.push(event.target.files.item(i).type);
  //     formData.append('file[]', event.target.files[i])
  //   }
  //   loading.present();
  //   this.http.post('https://theartezan.xyz/pdf/files.php', formData).subscribe(data=>{
  //     cargando=data.ok
  //     if (cargando==true) {
  //       loading.dismiss();
  //       this.p=100;
  //     }

  //   })
}
