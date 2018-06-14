import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Condo } from '../models/condo';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';

@Injectable({
  providedIn: 'root'
})
export class CondoService {
  selectCondo = {};
  constructor(private http: HttpClient) {}

  getCondoData(): Observable<Condo[]> {
    const data = localStorage.getItem('userKey');
    return this.http.get<Condo[]>(END_POINT.CONDO_GET + data);
  }
  newCondo(condo) {
    const data = this.makeReq(condo);
return this.http.get(encodeURI(END_POINT.CONDO_NEW + data));
  }

  editCondo(condo: any) {
    const userData = localStorage.getItem('userKey');
    condo.correo = JSON.parse(userData)[0].correo;
    condo.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([condo]);
    return this.http.get(encodeURI(END_POINT.CONDO_EDIT + data));
  }

  getDataById(id): Observable<Condo> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Condo>(END_POINT.CONDO_GET_BY_ID + data);
  }
  // helper
  private makeReq(condo: any) {
    const userData = localStorage.getItem('userKey');
    condo.correo = JSON.parse(userData)[0].correo;
    condo.contra = JSON.parse(userData)[0].contra;
    condo.ciudad = condo.Ciudad;
    delete condo.Ciudad;
    const data = JSON.stringify([condo]);
    return data;
  }
}
