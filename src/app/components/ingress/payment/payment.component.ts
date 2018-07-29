import { logoImgB64 } from './../../../_config/logo-img-b64';
import { Ingress } from './../../../models/ingress.model';
import { IngressService } from './../../../services/ingress.service';
import { ControllerMenuService } from './../../shared/general-menu/controller-menu.service';
import { Renter } from './../../../models/renter';
import { RenterService } from './../../../services/renter.service';
import { ApartmentService } from './../../../services/apartment.service';
import { Observable } from 'rxjs';
import { ProvidersService } from './../../../services/providers.service';
import { Providers } from './../../../models/provider.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Apartment } from '../../../models/apartment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  providerId: string;
  id;
  condoBalance = 0;
  // inputs
  refInput;
  depaInput: string;
  renterInput: string;
  concepto;
  totalInput;
  monthInput;
  yearInput;
  dayInput;
  // select
  depaOptions$: Observable<Apartment[]>;
  renterOptions$: Observable<Renter[]>;
  conceptoArr = [];
  conceptoUserSelect: string;
  // obj a enviar
  sendPaymentComplete = {
    AumentoSaldoCondominio: '',
    Id_Pago: '',
    Fecha: '',
    SaldoAnteriorDepa: '',
    Accion: '',
    SaldoNuevoDepa: '',
    Id_Condominio: ''
  };
  sendPaymentDepa = {
    AumentoSaldoCondominio: '',
    Accion: '',
    Abono: '',
    SaldoDepartamento: '',
    Id_Depa: '',
    Id_Pago: '',
    Fecha: '',
    SaldoAnteriorDepa: '',
    AdeudoDepartamento: '',
    Mes: '',
    Dia: '',
    SaldoNuevoDepa: '',
    Año: '',
    Id_Condominio: ''
  };
  depaSelect: string;
  // pdf
  colonia;
  propietary;
  depa;
  periodo;
  constructor(
    private router: Router,
    private userService: UserService,
    private apartmentService: ApartmentService,
    private renterService: RenterService,
    private ingressService: IngressService
  ) {
    const dateNow = new Date(Date.now());
    this.yearInput = dateNow.getFullYear();
    this.monthInput = (dateNow.getMonth() + 1).toString();
    this.dayInput = dateNow.getDate();
  }
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
      this.condoBalance = data['Saldo'];
      this.colonia = data.Colonia;
    });
    this.depaOptions$ = this.apartmentService.getData(this.id);
    this.renterOptions$ = this.renterService.getData(this.id);
  }
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
  getDepa(data) {
    this.apartmentService.getData(this.id).subscribe(arrApartments => {
      const apartmentSelect = arrApartments.find(
        apart => apart.Id_Depa === data || apart.Referencia === data
      );
      this.depaSelect = apartmentSelect.Id_Depa;
      this.depaInput = apartmentSelect.Id_Depa;
      this.refInput = apartmentSelect.Id_Depa;
      this.getRenterDepa(apartmentSelect.Id_Depa);
    });
  }
  getRenterDepa(data) {
    this.renterService.getData(this.id).subscribe(arrRenters => {
      const renterSelect = arrRenters.find(renter => renter.Id_Depa === data);
      if (renterSelect) {
        this.renterInput = renterSelect.Id_Depa;
        this.depaSelect = renterSelect.Id_Depa;
        this.depaInput = renterSelect.Id_Depa;
        this.refInput = renterSelect.Id_Depa;
      } else {
        this.renterInput = 'Sin Inquilino';
      }
      this.getConcepto(data);
    });
  }
  getConcepto(idDepa) {
    if (idDepa === 'def') {
      this.conceptoArr[0] = 'def';
    } else {
      // tslint:disable-next-line:prefer-const
      let arrOptions = [];
      const selectConcept = [];
      this.ingressService.getData(this.id).subscribe(data => {
        data.forEach(item => {
          if (item.error !== '') {
            const pos = arrOptions.indexOf(item.Concepto);
            if (pos === -1 && item.Id_Depa === idDepa) {
              arrOptions.push(item.Concepto);
              selectConcept.push({
                Total: item.Total,
                Concepto: item.Concepto,
                Id_Pago: item.Id_Pago,
                Periodo: item.Periodo,
                No: item.NumeroRecibo
              });
            }
          }
        });
      });
      this.conceptoArr = selectConcept;
    }
  }
  changeTotal(value) {
    if (value === 'def') {
      this.totalInput = '0';
    } else {
      this.totalInput = value.Total;
    }
  }
  newCondo() {
    this.apartmentService.getData(this.id).subscribe(data => {
      const depaSelect = data.find(
        apartment => apartment.Id_Depa === this.depaInput
      );
      const adeudoDepa = +depaSelect.AdeudoDepartamento * -1;
      this.sendPaymentComplete = {
        Accion: this.concepto.Concepto,
        AumentoSaldoCondominio: (
          +this.condoBalance + +this.totalInput
        ).toString(),
        SaldoAnteriorDepa: (+depaSelect.SaldoDepartamento + adeudoDepa).toString(),
        SaldoNuevoDepa: (+depaSelect.SaldoDepartamento + adeudoDepa + +this.totalInput).toString(),
        Fecha: this.yearInput + '-' + this.monthInput + '-' + this.dayInput,
        Id_Condominio: this.id,
        Id_Pago: this.concepto.Id_Pago
      };
      this.sendPaymentDepa = {
        Abono: this.totalInput,
        Accion: this.concepto.Concepto,
        AumentoSaldoCondominio: this.totalInput,
        SaldoDepartamento: this.sendPaymentComplete.SaldoNuevoDepa,
        SaldoAnteriorDepa: (+depaSelect.SaldoDepartamento + adeudoDepa).toString(),
        AdeudoDepartamento: ((adeudoDepa + +this.totalInput) * -1).toString(),
        SaldoNuevoDepa: (+depaSelect.SaldoDepartamento + adeudoDepa + +this.totalInput).toString(),
        Año: this.yearInput,
        Dia: this.dayInput,
        Mes: this.monthInput,
        Fecha: this.yearInput + '-' + this.monthInput + '-' + this.dayInput,
        Id_Depa: depaSelect.Id_Depa,
        Id_Condominio: this.id,
        Id_Pago: this.concepto.Id_Pago
      };
      // pdf
      this.propietary = depaSelect.NombrePropietario;
      this.depa = depaSelect.Interior;
      this.ingressService.addIngress(this.sendPaymentDepa).subscribe(c => {
        this.ingressService
          .newPayment(this.sendPaymentComplete)
          .subscribe(res => {
            // actualiza saldo cond
            this.userService.userDataSelect.next({
              Saldo: +this.sendPaymentComplete.AumentoSaldoCondominio,
              Colonia: this.colonia,
              Id_Condominio: this.id
            });
            const toast: NavigationExtras = {
              queryParams: {
                res: res.respuesta,
                monto: this.totalInput,
                balanceBefore: +this.condoBalance - +this.totalInput,
                balanceAfter: this.sendPaymentComplete.AumentoSaldoCondominio
              }
            };
            this.pdf();
            this.router.navigate(['list-ingress'], toast);
          });
      });
    });
  }

  // PDF

  pdf() {
    let Periodo = this.concepto.Periodo;
    let Concepto = this.concepto.Concepto;
    const date = new Date(Date.now());
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const dateFormat: string = day + '/' + month + '/' + year;
    if (!this.concepto.Periodo) {
      Periodo = this.monthInput.toString() + '/' + this.yearInput.toString();
    }
    if (!this.concepto.Concepto) {
      Concepto = 'Abono a Cuenta';
    }
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
          text: 'Condominio: ' + this.colonia,
          style: 'subheader'
        },
        {
          text: 'Recibo de Pago',
          style: 'subheader2'
        },
        {
          text: 'Recibo No: ' + this.concepto.No,
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
              text: ' ' + this.depa
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
              text: ' ' + Periodo
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
              text: ' ' + Concepto
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
              text: ' ' + this.sendPaymentComplete.Fecha
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
              text: ' ' + this.totalInput
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
              text: ' ' + this.sendPaymentComplete.SaldoAnteriorDepa
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
              text: ' ' + this.totalInput
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
              text: ' ' + this.sendPaymentComplete.SaldoNuevoDepa
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
  }
}
