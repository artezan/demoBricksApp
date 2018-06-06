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
  constructor(private http: HttpClient) {}

  getData(id): Observable<Propietary[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Propietary[]>(END_POINT.PROPIETARIES_GET + data);
  }
  // helper
  private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.ciudad = dataReq.Ciudad;
    delete dataReq.Ciudad;
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
