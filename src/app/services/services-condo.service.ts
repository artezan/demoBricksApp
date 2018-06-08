import { Service } from './../models/service.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';


@Injectable({
  providedIn: 'root'
})
export class ServicesCondoService {
  serviceSelect: Service[] = [];
  constructor(private http: HttpClient) {}

  getData(id): Observable<Service[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Service[]>(END_POINT.SERVICE_GET + data);
  }
  newRenter(apart) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.SERVICE_NEW + data));
  }

  editRenter(apart: Service) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.SERVICE_EDIT + data));
  }
  // helper
  private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    // salida -- entrada
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
