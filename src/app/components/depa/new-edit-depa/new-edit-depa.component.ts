import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Apartment } from '../../../models/apartment';
import { ApartmentService } from '../../../services/apartment.service';
import { UserService } from '../../../services/user.service';
import { PropietariesService } from '../../../services/propietaries.service';
import { Propietary } from '../../../models/propietary';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-edit-depa',
  templateUrl: './new-edit-depa.component.html',
  styleUrls: ['./new-edit-depa.component.scss']
})
export class NewEditDepaComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  apartment: Apartment = {};
  isNew: boolean;
  id;
  extra2;
  propietaries: Observable<Propietary[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private userService: UserService,
    private propietariesService: PropietariesService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
    });
    if (this.apartmentService.apartementSelect.length !== 0) {
      this.apartment = this.apartmentService.apartementSelect[0];
      this.isNew = false;
      if (
        +this.apartmentService.apartementSelect[0].DiaExtemporanea < 49
      ) {
          this.extra2 = +this.apartmentService.apartementSelect[0]
            .DiaExtemporanea;
          this.apartment.DiaExtemporanea = 'other';
      }
      if (this.apartmentService.apartementSelect[0].DiaExtemporanea === '1ero del Mes') {
        this.apartment.DiaExtemporanea = '100';
      }
      if (this.apartmentService.apartementSelect[0].DiaExtemporanea === 'Sin recargo') {
        this.apartment.DiaExtemporanea = '50';
      }
      this.apartmentService.apartementSelect.length = 0;
    } else {
      this.isNew = true;
    }
    this.propietaries = this.propietariesService.getData(this.id);
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
  newCondo() {
    if (this.apartment.DiaExtemporanea === 'other') {
      this.apartment.DiaExtemporanea = this.extra2.toString();
    }
    this.apartment.condominio = this.id;
    this.apartmentService.newApartment(this.apartment).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-depa'], toast);
    });
  }
  editCondo() {
    if (this.apartment.DiaExtemporanea === 'other' ) {
      this.apartment.DiaExtemporanea = this.extra2.toString();
    } else {
    }
    this.apartment.condominio = this.id;
    this.apartmentService
      .editApartment(this.apartment)
      .subscribe((res: any) => {
        const toast: NavigationExtras = {
          queryParams: { res: res.respuesta }
        };
        this.router.navigate(['list-depa'], toast);
      });
  }
  }

