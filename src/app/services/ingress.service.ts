import { Ingress } from './../models/ingress.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { Apartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class IngressService {
  ingressSelect: Ingress[] = [];

  constructor(private http: HttpClient) {}

  getData(id): Observable<Ingress[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<Ingress[]>(END_POINT.PAYMENTS_GET + data);
  }
  newPayment(payment): Observable<any> {
    const userData = localStorage.getItem('userKey');
    let dataReq: any = {};
    dataReq = payment;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<any>(END_POINT.PAYMENTS_NEW + data);
  }
  addIngress(payment): Observable<any> {
    const userData = localStorage.getItem('userKey');
    let dataReq: any = {};
    dataReq = payment;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get(
      'http://chobezin.com/php/CondominiosAdmin/registrarAbonoDepartamento.php?json=' +
        data
    );
  }
  deleteData(payment, id): Observable<Ingress[]> {
    const userData = localStorage.getItem('userKey');
    let dataReq: any = {};
    dataReq = payment;
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get<Ingress[]>(END_POINT.PAYMENTS_DELETE + data);
  }
  newDebit(debit): Observable<any> {
    const userData = localStorage.getItem('userKey');
    let dataReq: any = {};
    dataReq = debit;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    dataReq.jwt = JSON.parse(userData)[0].jwt;

    const data = JSON.stringify([dataReq]);
    return this.http.get(END_POINT.DEBIT_NEW + data);
  }
}
