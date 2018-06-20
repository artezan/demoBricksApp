import { UserSession } from './../models/user-session.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Condo } from '../models/condo';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from '../models/jwt-response.model';

@Injectable()
export class UserService {
  userDataSelect = new BehaviorSubject({
    Saldo: 0,
    Colonia: '',
    Id_Condominio: ''
  });
  datass;

  constructor(private http: HttpClient) {}
  requestApiToken(user, pass): Observable<JwtResponse> {
    const dataReq: UserSession = {};
    dataReq.contra = pass;
    dataReq.correo = user;
    const data = JSON.stringify([dataReq]);
   return this.http.get('https://chobezin.com/php/CondominiosAdmin/login2.php?json=' + data);
  }
}
