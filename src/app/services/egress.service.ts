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
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<Egress[]>(END_POINT.EGRESS_GET + data);
  }
  newEgressFixed(egress) {
    const data = this.makeReq(egress);
    return this.http.get(encodeURI(END_POINT.EGRESS_FIXED + data));
  }
  newEgressVariable(egress) {
    const data = this.makeReq(egress);
    return this.http.get(encodeURI(END_POINT.EGRESS_VAR + data));
  }
  payEgress(idCondo, idEgress): Observable<any> {
    const dateNow = '2018-06-11'; // new Date(Date.now())
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = idCondo;
    dataReq.Id_Egreso = idEgress;
    dataReq.FechaCobrado = dateNow;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<any>(END_POINT.EGRESS_PAY + data);
  }
  transitEgress(idCondo, idEgress): Observable<any> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = idCondo;
    dataReq.Id_Egreso = idEgress;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<any>(END_POINT.EGRESS_TRANSIT + data);
  }
   // helper
   private makeReq(dataReq: any) {
    const userData = localStorage.getItem('userKey');
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    dataReq.Año = dataReq.year.toString();
    delete dataReq.year;
    dataReq.NumCheque = dataReq.NumeroCheque;
    delete dataReq.NumeroCheque;
    // salida -- entrada
    const data = JSON.stringify([dataReq]);
    return data;
  }
}
