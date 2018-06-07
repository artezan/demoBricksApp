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
    const data = JSON.stringify([dataReq]);
    return this.http.get<Ingress[]>(END_POINT.PAYMENTS_GET + data);
    //  return this.http.get<Ingress[]>('https://next.json-generator.com/api/json/get/Nk1XxIMer');
  }
}
