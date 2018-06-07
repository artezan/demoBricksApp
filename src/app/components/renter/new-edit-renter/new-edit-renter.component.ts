import { ApartmentService } from './../../../services/apartment.service';
import { RenterService } from './../../../services/renter.service';
import { Renter } from './../../../models/renter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { Apartment } from '../../../models/apartment';

@Component({
  selector: 'app-new-edit-renter',
  templateUrl: './new-edit-renter.component.html',
  styleUrls: ['./new-edit-renter.component.scss']
})
export class NewEditRenterComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  renter: Renter = {};
  isNew: boolean;
  depasSelect$: Observable<Apartment[]>;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private renterService: RenterService,
    private apartmentService: ApartmentService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
    });
    this.depasSelect$ = this.apartmentService.getData(this.id);
    if (this.renterService.renterSelect.length !== 0) {
      this.renter = this.renterService.renterSelect[0];
      this.isNew = false;
      this.renterService.renterSelect.length = 0;
    } else {
      this.isNew = true;
    }
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
    console.log(this.renter);
    this.renter.Id_Condominio = this.id;
    this.renterService.newRenter(this.renter).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-renter'], toast);
    });
  }
  editCondo() {
    console.log(this.renter);
    this.renter.Id_Condominio = this.id;
    this.renterService.editRenter(this.renter).subscribe((res: any) => {
      const toast: NavigationExtras = {
        queryParams: { res: res.respuesta }
      };
      this.router.navigate(['list-renter'], toast);
    });
  }
}
