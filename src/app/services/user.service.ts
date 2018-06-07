import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Condo } from '../models/condo';


@Injectable()
export class UserService {
  userDataSelect = new BehaviorSubject('');
  datass;

  constructor() {}
}