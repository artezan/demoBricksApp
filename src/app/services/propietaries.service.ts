import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { Apartment } from '../models/apartment';
import { Propietary } from '../models/propietary';

@Injectable({
  providedIn: 'root'
})
export class PropietariesService {
  propietarySelect: Propietary[] = [];
  constructor(private http: HttpClient) {}

  getData(id): Observable<Propietary[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<Propietary[]>(END_POINT.PROPIETARIES_GET + data);
  }
  newPropietary(apart) {
    const data = this.makeReqNew(apart);
    return this.http.get(encodeURI(END_POINT.PROPIETARIES_NEW + data));
  }

  editPropietary(apart: Apartment) {
    const data = this.makeReqeEdit(apart);
    return this.http.get(encodeURI(END_POINT.PROPIETARIES_EDIT + data));
  }
  // helper
  private makeReqNew(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    // salida = entrada  --- borar entrada
    dataReq.telefonoCel = dataReq.TelefonoCel;
    delete dataReq.TelefonoCel;
    dataReq.correoPropietario = dataReq.CorreoElectronico;
    delete dataReq.CorreoElectronico;
    dataReq.telefonoDepa = dataReq.TelefonoDepa;
    delete dataReq.TelefonoDepa;
    dataReq.apellidoP = dataReq.ApellidoPaterno;
    delete dataReq.ApellidoPaterno;
    dataReq.apellidoM = dataReq.ApellidoMaterno;
    delete dataReq.ApellidoMaterno;
    dataReq.telefonoOficina = dataReq.TelefonoOficina;
    delete dataReq.TelefonoOficina;
    dataReq.nombre = dataReq.NombrePropietario;
    delete dataReq.NombrePropietario;
    const data = JSON.stringify([dataReq]);
    return data;
  }
  private makeReqeEdit(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return data;
  }
}
