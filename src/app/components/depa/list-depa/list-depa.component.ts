import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment';
import { map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-depa',
  templateUrl: './list-depa.component.html',
  styleUrls: ['./list-depa.component.scss']
})
export class ListDepaComponent implements OnInit {
  condoName = '';
  condoBalance = 0;
  columns: any;
  loadingIndicator = true;
  errorToShow = '';
  rows: any;
  id: string;
  sub: any;
  depaSelect: Apartment[];
  realData: Apartment[];
  hasData: boolean;
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
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
        prop: 'Id_Depa',
        name: 'Id_Depa',
        width: '30'
      },
      {
        name: 'Departamento',
        prop: 'Interior',
        width: '90'
      },
      {
        prop: 'NombrePropietario',
        name: 'Propietario',
        width: '100'
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
        prop: 'CuotaMensual',
        name: 'Cuota/mes',
        width: '80'
      },
      {
        prop: 'CuotaExtraordinario',
        name: 'CuotaExt',
        width: '80'
      },
      {
        prop: 'LugaresEstacionamiento',
        name: 'Lugares Estac',
        width: '30'
      },
      {
        prop: 'Referencia',
        name: 'Ref',
        width: '80'
      },
      {
        prop: 'DiaExtemporanea',
        name: 'DiaExtemp',
        width: '80'
      },
      {
        prop: 'SaldoDepartamento',
        name: 'Saldo',
        width: '80'
      }
    ];
    this.controllerMenu.menuSettings(false, false, 'departamento');
    this.sub = this.userService.userDataSelect.subscribe((params: any) => {
      this.id = params['Id_Condominio'];
      this.condoBalance = params['Saldo'];
      this.condoName = params.Colonia;
    });
    this.getData(this.id);
  }
  getData(id) {
    this.loadingIndicator = true;
    this.apartmentService.getData(id).subscribe(data => {
      this.loadingIndicator = false;
      this.generateRows(data);
    });
  }
  generateRows(data: Apartment[]) {
    if (data.length === 1) {
      this.hasData = false;
    } else {
      this.hasData = true;
      this.realData = data;
      const arrRows: Apartment[] = [];
      data.forEach(item => {
        if (item.DiaExtemporanea === '0') {
          item.DiaExtemporanea = 'Sin recargo';
        }
        if (item.error !== '') {
          arrRows.push({
            Id_Depa: item.Id_Depa,
            Interior: item.Interior,
            NombrePropietario: item.NombrePropietario,
            ApellidoPaterno: item.ApellidoPaterno,
            ApellidoMaterno: item.ApellidoMaterno,
            CuotaMensual: item.CuotaMensual,
            CuotaExtraordinario: item.CuotaExtraordinario,
            LugaresEstacionamiento: item.LugaresEstacionamiento,
            Referencia: item.Referencia,
            DiaExtemporanea: item.DiaExtemporanea,
            SaldoDepartamento: (
              +item.SaldoDepartamento - +item.AdeudoDepartamento
            ).toString()
          });
        }
      });
      this.rows = arrRows;
    }
  }
  getPopMessage(event) {
    const isDisabledDetails = (<HTMLInputElement>(
      document.getElementById('details')
    )).disabled;
    if (isDisabledDetails) {
      this.errorToShow = 'Seleccione un departamento';
    } else {
      this.errorToShow = '';
    }
  }
  getPopMessage2(event) {
    const isDisabledEdit = (<HTMLInputElement>document.getElementById('edit'))
      .disabled;
    if (isDisabledEdit) {
      this.errorToShow = 'Seleccione un departamento';
    } else {
      this.errorToShow = '';
    }
  }
  edit() {
    const depa: NavigationExtras = {
      queryParams: this.depaSelect[0]
    };
    this.router.navigate(['new-edit-depa']);
    this.apartmentService.apartementSelect = this.depaSelect;
  }
  select(event: Apartment[]) {
    this.depaSelect = this.realData.filter(item => {
      if (item.Id_Depa === event[0].Id_Depa) {
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
