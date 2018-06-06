import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { Apartment } from '../../../models/apartment';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private controllerMenu: ControllerMenuService,
    public userService: UserService,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute
  ) {}

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
        name: 'CuataExt',
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
    const arrRows: Apartment[] = [];
    data.forEach(item => {
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
