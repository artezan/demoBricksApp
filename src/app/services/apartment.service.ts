import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { Apartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  apartementSelect: Apartment[] = [];
  constructor(private http: HttpClient) {}

  getData(id): Observable<Apartment[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Apartment[]>(END_POINT.APART_GET + data);
  }
  newApartment(apart) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.APART_NEW + data));
  }

  editApartment(apart: Apartment) {
    const data = this.makeReqEdit(apart);
    return this.http.get(encodeURI(END_POINT.APART_EDIT + data));
  }
  // helper
  private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.DiaExtemporaneo = dataReq.DiaExtemporanea;
    delete dataReq.DiaExtemporanea;
    const data = JSON.stringify([dataReq]);
    return data;
  }
  private makeReqEdit(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.Id_Departamento = dataReq.Id_Depa;
    delete dataReq.Id_Depa;
    dataReq.Accion = 'Modificacion';
    dataReq.DiaExtemporaneo = dataReq.DiaExtemporanea.toString();
    delete dataReq.DiaExtemporanea;
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
