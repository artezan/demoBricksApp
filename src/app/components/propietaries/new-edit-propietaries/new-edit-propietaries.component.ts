import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { Propietary } from '../../../models/propietary';
import { PropietariesService } from '../../../services/propietaries.service';

@Component({
  selector: 'app-new-edit-propietaries',
  templateUrl: './new-edit-propietaries.component.html',
  styleUrls: ['./new-edit-propietaries.component.scss']
})
export class NewEditPropietariesComponent implements OnInit {
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  propietary: Propietary = {};
  isNew: boolean;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private propietariesService: PropietariesService
  ) {}
  ngOnInit() {
    this.userService.userDataSelect.subscribe(data => {
      this.id = data['Id_Condominio'];
    });
    if (this.propietariesService.propietarySelect.length !== 0) {
      this.propietary = this.propietariesService.propietarySelect[0];
      this.isNew = false;
      this.propietariesService.propietarySelect.length = 0;
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
    this.propietary.condominio = this.id;
    this.propietariesService
      .newPropietary(this.propietary)
      .subscribe((res: any) => {
        const toast: NavigationExtras = {
          queryParams: { res: res.respuesta }
        };
        this.router.navigate(['list-propietaries'], toast);
      });
  }
  editCondo() {
    this.propietary.Id_Condominio = this.id;
    this.propietariesService
      .editPropietary(this.propietary)
      .subscribe((res: any) => {
        const toast: NavigationExtras = {
          queryParams: { res: res.respuesta }
        };
        this.router.navigate(['list-propietaries'], toast);
      });
  }
}
