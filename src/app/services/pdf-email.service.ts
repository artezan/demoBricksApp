import { EmailSend } from './../models/email-send.model';
import { END_POINT } from './../_config/api.end-points';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { UserSession } from '../models/user-session.model';

@Injectable({
  providedIn: 'root'
})
export class PdfEmailService {
  constructor(private http: HttpClient) {}
  sendPdfEmail(body: FormData): Observable<any> {
    const userData: UserSession = JSON.parse(
      localStorage.getItem('userKey')
    )[0];
    // body.correo = userData.correo;
    // body.jwt = userData.jwt;
    console.log(body);
    console.log(END_POINT.EMAIL_SEND);
    return this.http.post('https://chobezin.com/php/CondominiosAdmin/mail.php', body);
  }
}
