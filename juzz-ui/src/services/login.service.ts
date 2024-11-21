import { Injectable } from '@angular/core';
import { Constants } from '../util/Constants';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.apiService.post(Constants.JUZZ_URL, `api/login`, credentials);
  }

}