import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Providers } from './../models/provider.model';
import { Injectable } from '@angular/core';
import { END_POINT } from '../_config/api.end-points';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  providerSelect: Providers[] = [];
  constructor(private http: HttpClient) {}

  getData(id): Observable<Providers[]> {
    const userData = localStorage.getItem('userKey');
    const dataReq: any = {};
    dataReq.Id_Condominio = id;
    dataReq.correo = JSON.parse(userData)[0].correo;
    dataReq.contra = JSON.parse(userData)[0].contra;
    const data = JSON.stringify([dataReq]);
    return this.http.get<Providers[]>(END_POINT.PROVIDER_GET + data);
  }
  newProvider(apart) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.PROVIDER_NEW + data));
  }

  editProvider(apart: Providers) {
    const data = this.makeReq(apart);
    return this.http.get(encodeURI(END_POINT.PROVIDER_EDIT + data));
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
