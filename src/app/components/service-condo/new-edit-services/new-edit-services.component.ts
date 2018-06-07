import { ServicesCondoService } from './../../../services/services-condo.service';
import { Providers } from './../../../models/provider.model';
import { Service } from './../../../models/service.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { ProvidersService } from '../../../services/providers.service';


@Component({
  selector: 'app-new-edit-services',
  templateUrl: './new-edit-services.component.html',
  styleUrls: ['./new-edit-services.component.scss']
})
export class NewEditServicesComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  service: Service = {};
  isNew: boolean;
  providerSelect$: Observable<Providers[]>;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private serviceCondoServices: ServicesCondoService,
    private providerservice: ProvidersService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
    });
    this.providerSelect$ = this.providerservice.getData(this.id);
    if (this.serviceCondoServices.serviceSelect.length !== 0) {
      this.service = this.serviceCondoServices.serviceSelect[0];
      this.isNew = false;
      this.serviceCondoServices.serviceSelect.length = 0;
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
    console.log(this.service);
    this.service.Id_Condominio = this.id;
    // this.serviceCondoServices.newRenter(this.renter).subscribe((res: any) => {
    //   const toast: NavigationExtras = {
    //     queryParams: { res: res.respuesta }
    //   };
    //   this.router.navigate(['list-services'], toast);
    // });
  }
  editCondo() {
    console.log(this.service);
    this.service.Id_Condominio = this.id;
    // this.renterService.editRenter(this.renter).subscribe((res: any) => {
    //   const toast: NavigationExtras = {
    //     queryParams: { res: res.respuesta }
    //   };
    //   this.router.navigate(['list-services'], toast);
    // });
  }
}
