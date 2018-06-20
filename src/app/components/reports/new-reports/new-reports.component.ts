import { Egress } from './../../../models/egress.model';
import { EgressService } from './../../../services/egress.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment';
import { ActivatedRoute, Router } from '@angular/router';
import { RenterService } from '../../../services/renter.service';
import { Renter } from '../../../models/renter';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PropietariesService } from '../../../services/propietaries.service';
import { Propietary } from '../../../models/propietary';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { logoImgB64 } from '../../../_config/logo-img-b64';
import { IngressService } from '../../../services/ingress.service';
import { Ingress } from '../../../models/ingress.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface PdfColum {
  name: string;
  prop: string;
  type: string;
}

@Component({
  selector: 'app-new-reports',
  templateUrl: './new-reports.component.html',
  styleUrls: ['./new-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewReportsComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  columnsRenters: any;
  columnsPropietaries: any;
  columnsReport;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  rows2: any;
  rowsRenter: any;
  rowsPropietaries: any;
  rowsPropietaries2: any;
  rowsReport: any;
  renterSelect: Renter[];
  renterReport: Renter[];
  selectionType = 'multiClick';
  id;
  removable = true;
  arrUsers = [];
  selected = [];
  arrReports = [];
  rowDeselect = [];
  months = [];
  yearInput: number;
  balanceBefore: number;
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private renterService: RenterService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public propietariesService: PropietariesService,
    public dialog: MatDialog,
    public ingressService: IngressService,
    public egressService: EgressService
  ) {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
      }
    });
  }

  ngOnInit() {
    // todos
    this.getAll();
    // inquilinos
    // propietarios
    // reportes
    this.getReportsTable();

    this.controllerMenu.menuSettings(false, false, 'reports');
  }
  getAll() {
    this.columns = [
      {
        prop: 'Nombre',
        name: 'Nombre',
        width: '100'
      },
      {
        prop: 'ApellidoPaterno',
        name: 'Paterno',
        width: '90'
      },
      {
        prop: 'CorreoElectronico',
        name: 'Correo',
        width: '80'
      }
    ];
    this.userService.userDataSelect.subscribe((params: any) => {
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
      this.id = params['Id_Condominio'];
      this.getData(params['Id_Condominio']);
    });
  }
  getData(id) {
    this.loadingIndicator = true;
    this.propietariesService.getData(id).subscribe(propietary => {
      this.renterService.getData(id).subscribe(renter => {
        this.generateRows(renter, propietary);
      });
    });
  }
  generateRows(renter: Renter[], propietary: Propietary[]) {
    const arrRows = [];
    renter.forEach(item => {
      if (item.error !== '') {
        arrRows.push({
          Id: item.Id_Inquilino,
          Nombre: item.NombreInquilino,
          ApellidoPaterno: item.ApellidoPaterno,
          CorreoElectronico: item.CorreoElectronico,
          type: 'renter'
        });
      }
    });
    propietary.forEach(item => {
      arrRows.push({
        Nombre: item.NombrePropietario,
        ApellidoPaterno: item.ApellidoPaterno,
        CorreoElectronico: item.CorreoElectronico,
        Id: item.Id_Propietario,
        EsJunta: item.EsJunta,
        type: 'propietary'
      });
    });
    this.rows = arrRows;
    this.rows2 = arrRows;
  }
  getReportsTable() {
    this.columnsReport = [
      {
        prop: 'Reporte',
        name: 'Reporte',
        width: '50'
      }
    ];
    const arrRows = [
      {
        Reporte: 'Reporte Conciliacion',
        Cantidad: 1,
        reportId: 1
      },
      {
        Reporte: 'Reporte Ingresos Pagados Resumen',
        Cantidad: 1,
        reportId: 2
      },
      {
        // Ingresos Por pagar
        Reporte: 'Reporte Adeudos Resumen',
        Cantidad: 1,
        reportId: 3
      },
      {
        Reporte: 'Reporte Ingresos Pagados Desgloce',
        Cantidad: 1,
        reportId: 4
      },
      {
        // Ingresos Por pagar
        Reporte: 'Reporte Adeudos Desgloce',
        Cantidad: 1,
        reportId: 5
      },
      // egresos
      {
        Reporte: 'Reporte Egresos Variables',
        Cantidad: 1,
        reportId: 6
      },
      {
        Reporte: 'Reporte Egresos Fijos',
        Cantidad: 1,
        reportId: 7
      },
      {
        Reporte: 'Reporte Egresos Variables en Transito',
        Cantidad: 1,
        reportId: 8
      },
      {
        Reporte: 'Reporte Egresos Variables Pagados',
        Cantidad: 1,
        reportId: 9
      },
      {
        Reporte: 'Reporte Egresos Fijos en Transito',
        Cantidad: 1,
        reportId: 10
      },
      {
        Reporte: 'Reporte Egresos Fijos Pagados',
        Cantidad: 1,
        reportId: 11
      },
      {
        // los que pasaron a transito ese mes
        Reporte: 'Reporte Cheques en Tránsito (todos)',
        Cantidad: 1,
        reportId: 12
      },
      {
        // Todos los pagados
        Reporte: 'Reporte Cheques Pagados en ese periodo',
        Cantidad: 1,
        reportId: 13
      }
    ];
    this.rowsReport = arrRows;
  }

  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('enviar'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Verifique los datos';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    this.router.navigate(['new-edit-renter']);
    this.renterService.renterSelect = this.renterSelect;
  }
  select(event: [{ Id: string; Nombre: string; CorreoElectronico: string }]) {
    this.arrUsers = event;
    this.arrUsers = [...this.arrUsers];
    if (!event.length) {
      this.arrUsers.length = 0;
    }
  }
  selectReport(event) {
    this.arrReports = event;
    this.arrReports = [...this.arrReports];
    if (!event.length) {
      this.arrReports.length = 0;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  remove(item) {
    this.arrUsers.splice(this.arrUsers.indexOf(item.Id), 1);
    this.arrUsers = [...this.arrUsers];
    this.rowDeselect[0] = item;
    this.rowDeselect[0].isSelect = true;
    this.rowDeselect = [...this.rowDeselect];
  }
  removeReport(item) {
    this.arrReports.splice(this.arrReports.indexOf(item.Reporte), 1);
    this.arrReports = [...this.arrReports];
    this.rowDeselect[0] = item;
    this.rowDeselect[0].isSelect = true;
    this.rowDeselect = [...this.rowDeselect];
  }
  updateSel(event) {
    if (event.index === 0) {
      this.rows = this.rows2;
    }
    if (event.index === 1) {
      const arr: any[] = this.rows2;
      const arrFilter = arr.filter(rows => {
        if (rows.type === 'renter') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }
    if (event.index === 2) {
      const arr: any[] = this.rows2;
      const arrFilter = arr.filter(rows => {
        if (rows.type === 'propietary') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }
    if (event.index === 3) {
      const arr: any[] = this.rows2;
      const arrFilter = arr.filter(rows => {
        if (rows.type === 'propietary' && rows.EsJunta === 'true') {
          return rows;
        }
      });
      this.rows = arrFilter;
    }
  }
  send() {
    const users = [];
    const reports = [];
    this.arrUsers.forEach(user => {
      users.push(user.Nombre);
    });
    this.arrReports.forEach(report => {
      reports.push(report.Reporte);
    });
    const stringReport = reports.toString();
    const stringUsers = users.toString();
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: 'Enviar Reportes',
        subHeader:
          'Desea enviar ' + stringReport + ' a los siguientes usuarios:',
        body: '<p>' + stringUsers + '</p> ',
        isform: false
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
        this.openSnackBar('Reportes enviados correctamente');
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  dataPdf() {
    this.arrReports.forEach(report => {

      if (report.reportId === 1) {
        const colum: PdfColum[] = [
          {
            name: 'Descripción',
            prop: 'subTitle',
            type: 'normal'
          },
          {
            name: 'Conciliacion',
            prop: 'conciliation',
            type: 'money'
          },
          {
            name: 'Real',
            prop: 'real',
            type: 'money'
          }
        ];
        this.pdfReportFinal(report, colum, [165, 165, 165]);
      }
      // Reporte de ingresos pagados 1
      if (report.reportId === 2) {
        const colum: PdfColum[] = [
          {
            name: 'Interior',
            prop: 'Interior',
            type: 'normal'
          },
          {
            name: 'Total',
            prop: 'Total',
            type: 'money'
          }
        ];
        this.pdfReportIngress(report, '1', colum, [250, 250]);
      }
      // Ingresos Pagado 0
      if (report.reportId === 3) {
        const colum: PdfColum[] = [
          {
            name: 'Interior',
            prop: 'Interior',
            type: 'normal'
          },
          {
            name: 'Total',
            prop: 'Total',
            type: 'money'
          }
        ];
        this.pdfReportIngress(report, '0', colum, [250, 250]);
      }
      // desgloce ingr pagado 1
      if (report.reportId === 4) {
        const colum: PdfColum[] = [
          {
            name: 'Interior',
            prop: 'Interior',
            type: 'normal'
          },
          {
            name: 'Concepto',
            prop: 'Concepto',
            type: 'normal'
          },
          {
            name: 'Fecha de Pago',
            prop: 'FechaPagado',
            type: 'normal'
          },
          {
            name: 'Total',
            prop: 'Total',
            type: 'money'
          }
        ];
        this.pdfReportIngress(report, '1', colum, [125, 125, 125, 125]);
      }
      // desgloce ingr pagado 0
      if (report.reportId === 5) {
        const colum: PdfColum[] = [
          {
            name: 'Interior',
            prop: 'Interior',
            type: 'normal'
          },
          {
            name: 'Concepto',
            prop: 'Concepto',
            type: 'normal'
          },
          {
            name: 'Periodo',
            prop: 'Periodo',
            type: 'normal'
          },
          {
            name: 'Total',
            prop: 'Total',
            type: 'money'
          }
        ];
        this.pdfReportIngress(report, '0', colum, [125, 125, 125, 125]);
      }
      // Reporte Egresos Variables
      if (report.reportId === 6) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            prop: 'Estado',
            name: 'Estado',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(report, '1', colum, [100, 100, 100, 100, 100]);
      }
      // egresos fijos
      if (report.reportId === 7) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            prop: 'Estado',
            name: 'Estado',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(report, '0', colum, [100, 100, 100, 100, 100]);
      }
      // egresos variables transito
      if (report.reportId === 8) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '1',
          colum,
          [125, 125, 125, 125],
          'En transito'
        );
      }
      if (report.reportId === 9) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            prop: 'FechaCobrado',
            name: 'Fecha Cobrado',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '1',
          colum,
          [100, 100, 100, 100, 100],
          'Pagado'
        );
      }
      // egreso transito fijo
      if (report.reportId === 10) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '0',
          colum,
          [125, 125, 125, 125],
          'En transito'
        );
      }
      // egreso pagado fijo
      if (report.reportId === 11) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            prop: 'FechaCobrado',
            name: 'Fecha Cobrado',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '0',
          colum,
          [100, 100, 100, 100, 100],
          'Pagado'
        );
      }
      // los que pasaron a transito ese mes
      if (report.reportId === 12) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '',
          colum,
          [125, 125, 125, 125],
          'En transito',
          true
        );
      }
      // pagados en ese mes
      if (report.reportId === 13) {
        const colum: PdfColum[] = [
          {
            name: 'Proveedor',
            prop: 'NombreProveedor',
            type: 'normal'
          },
          {
            name: 'Servicio',
            prop: 'NombreServicio',
            type: 'normal'
          },
          {
            prop: 'NumeroCheque',
            name: 'Numero Cheque',
            type: 'normal'
          },
          {
            prop: 'FechaCobrado',
            name: 'Fecha Cobrado',
            type: 'normal'
          },
          {
            name: 'Monto',
            prop: 'Monto',
            type: 'money'
          }
        ];
        this.pdfReportEgress(
          report,
          '',
          colum,
          [100, 100, 100, 100, 100],
          'Pagado',
          true
        );
      }
    });
  }

  private pdfReportIngress(
    report: any,
    isPay: string,
    colum: PdfColum[],
    withColums: number[]
  ) {
    this.months.forEach(month => {
      this.ingressService.getData(this.id).subscribe(ingress => {
        const ingressPerMonth = ingress.filter(item => {
          if (item.Periodo) {
            const m = +item.Periodo.substring(0, item.Periodo.indexOf('/'));
            const year = +item.Periodo.substring(item.Periodo.indexOf('/') + 1);
            if (
              m === +month &&
              year === +this.yearInput &&
              item.Pagado === isPay
            ) {
              return item;
            }
          }
        });
        const data = this.generateTablePdf(colum, ingressPerMonth);
        this.exportToPdf(
          report.Reporte,
          month,
          this.yearInput,
          data.table,
          withColums,
          data.total
        );
      });
    });
  }
  /**
   *
   * @param report nombre reporte
   * @param itemVariable variable=1 o fijo=0
   * @param colum headers colum
   * @param withColums ancho colum
   * @param state pagado o en trans
   * @param check checar si se pago en ese mes
   */
  private pdfReportEgress(
    report: any,
    itemVariable: string,
    colum: PdfColum[],
    withColums: number[],
    state?: string,
    check = false
  ) {
    this.months.forEach(month => {
      this.egressService.getData(this.id).subscribe(egress => {
        const egressPerMonth = egress.filter(item => {
          // filtrar por variable o fijo
          if (item.Mes && item.Año && !state && !check) {
            if (
              +item.Mes === +month &&
              +item.Año === +this.yearInput &&
              item.Variable === itemVariable
            ) {
              return item;
            }
            // filtar variable o fijo y pagado o no
          } else if (item.Mes && item.Año && state && !check) {
            if (
              +item.Mes === +month &&
              +item.Año === +this.yearInput &&
              item.Variable === itemVariable &&
              item.Estado === state
            ) {
              return item;
            }
            // filtrar todos pagados y transito
          } else if ('' === itemVariable && state && check) {
            const dateCheck = new Date(item.FechaCobrado);
            const m = dateCheck.getMonth() + 1;
            const y = dateCheck.getFullYear();
            if (
              +month === m &&
              +this.yearInput === y &&
              state === item.Estado
            ) {
              return item;
            } else if (
              +item.Mes === +month &&
              +item.Año === +this.yearInput &&
              item.Estado === state
            ) {
              return item;
            }
            // filtrar en transito
          }
        });
        const data = this.generateTablePdf(colum, egressPerMonth);
        this.exportToPdf(
          report.Reporte,
          month,
          this.yearInput,
          data.table,
          withColums,
          data.total
        );
      });
    });
  }
  private pdfReportFinal(report: any, colum: PdfColum[], withColums: number[]) {
    this.months.forEach(month => {
      let ingressTotal = 0;
      let ingressTotalNoPay = 0;
      let ingressTotalPay = 0;
      let egressTotal = 0;
      let egressTotalFixed = 0;
      let egressTotalVariable = 0;
      this.ingressService.getData(this.id).subscribe(arrIngress => {
        arrIngress.forEach(ingress => {
          if (ingress.Pagado === '1') {
            ingressTotal += +ingress.Total;
            ingressTotalPay += +ingress.Total;
          } else if (ingress.Pagado === '0') {
            ingressTotal += +ingress.Total;
            ingressTotalNoPay += +ingress.Total;
          }
        });
        this.egressService.getData(this.id).subscribe(arrEgress => {
          arrEgress.forEach(egress => {
            if (egress.Variable === '1') {
              egressTotal += +egress.Monto;
              egressTotalVariable += +egress.Monto;
            } else if (egress.Variable === '0') {
              egressTotal += +egress.Monto;
              egressTotalFixed += +egress.Monto;
            }
          });
          const rows = [
            {
              subTitle: 'Ingresos no pagados',
              conciliation: (ingressTotalNoPay + this.balanceBefore).toString(),
              real: ingressTotalNoPay.toString()
            },
            {
              subTitle: 'Ingresos Pagados',
              conciliation: (ingressTotalPay + this.balanceBefore).toString(),
              real: ingressTotalPay.toString()
            },
            {
              subTitle: 'Total Ingresos',
              conciliation: (ingressTotal + this.balanceBefore).toString(),
              real: ingressTotal.toString()
            },
            {
              subTitle: 'Egresos Fijos',
              conciliation: (egressTotalFixed + this.balanceBefore).toString(),
              real: egressTotalFixed.toString()
            },
            {
              subTitle: 'Egresos  Variables',
              conciliation: (
                egressTotalVariable + this.balanceBefore
              ).toString(),
              real: egressTotalVariable.toString()
            },
            {
              subTitle: 'Total Egresos',
              conciliation: (egressTotal + this.balanceBefore).toString(),
              real: egressTotal.toString()
            },
            {
              subTitle: 'Total General',
              conciliation: (
                egressTotal +
                ingressTotal +
                this.balanceBefore
              ).toString(),
              real: (egressTotal + ingressTotal).toString()
            }
          ];
          const data = this.generateTablePdf(colum, rows);
          this.exportToPdf(
            report.Reporte,
            month,
            this.yearInput,
            data.table,
            withColums,
            data.total
          );
        });
      });
    });
  }

  generateTablePdf(
    columns: PdfColum[],
    rows: any[]
  ): { table: any; total: number } {
    let finalTotal = 0;
    const arrTable = [];
    const arrHeader = [];
    columns.forEach(colum => {
      arrHeader.push({ text: colum.name, style: 'subheader2' });
    });
    arrTable.push(arrHeader);
    rows.forEach(item => {
      const row = [];
      columns.forEach(colum => {
        if (colum.type === 'money') {
          row.push('$' + item[colum.prop]);
          finalTotal += +item[colum.prop];
        } else {
          row.push(item[colum.prop]);
        }
      });
      arrTable.push(row);
    });
    return { table: arrTable, total: finalTotal };
  }
  /**
   *
   * @param title titulo pdf
   * @param month periodo mes
   * @param data datos de tabla
   * @param withTable whith de c/u columna
   */
  exportToPdf(title, month, year, data, withTable: Array<any>, total?: number) {
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
        // headers
        {
          text: 'Golem\n\n',
          style: 'header'
        },
        {
          text: 'Condominio: ' + this.condoName,
          style: 'subheader'
        },
        {
          text: title,
          style: 'subheader2'
        },
        {
          text: 'Periodo: ' + month + '/' + year,
          style: 'subheader2'
        },
        // linea
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
        // table
        {
          style: 'tableExample',
          table: {
            widths: withTable,
            headerRows: 1,
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: data
          }
        },
        // linea final
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
              text: 'Total: ',
              bold: true
            },
            {
              text: ' $ ' + total.toString()
            }
          ],
          alignment: 'justify'
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
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: 'center'
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
