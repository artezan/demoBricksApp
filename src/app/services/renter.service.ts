import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { Apartment } from '../models/apartment';
import { Renter } from '../models/renter';

@Injectable({
  providedIn: 'root'
})
export class RenterService {
  renterSelect: Renter[] = [];
  constructor(private http: HttpClient) {}

  getData(id): Observable<Renter[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<Renter[]>(END_POINT.RENTER_GET + data);
  }
  newRenter(apart) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.RENTER_NEW + data));
  }

  editRenter(apart: Apartment) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.RENTER_EDIT + data));
  }
  // helper
  private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    // salida -- entrada
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
