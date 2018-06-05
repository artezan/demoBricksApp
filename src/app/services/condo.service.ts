import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Condo } from '../models/condo';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';

@Injectable({
  providedIn: 'root'
})
export class CondoService {
  constructor(private http: HttpClient) {}
  getCondoData(email: string, password: any): Observable<Condo[]> {
    const data = JSON.stringify([{ correo: email, contra: password }]);
    return this.http.get<Condo[]>(END_POINT.CONDO_GET + data);
  }
}
