import { Egress } from './../models/egress.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';


@Injectable({
  providedIn: 'root'
})
export class EgressService {
  egressSelect: Egress[] = [];

  constructor(private http: HttpClient) {}
  getData(id): Observable<Egress[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Egress[]>(END_POINT.EGRESS_GET + data);
  }
  newEgressFixed(egress) {
    const data = this.makeReq(egress);
    return this.http.get(encodeURI(END_POINT.EGRESS_FIXED + data));
  }
   // helper
   private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.Año = dataReq.year.toString();
    delete dataReq.year;
    dataReq.NumCheque = dataReq.NumeroCheque;
    delete dataReq.NumeroCheque;
    // salida -- entrada
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
