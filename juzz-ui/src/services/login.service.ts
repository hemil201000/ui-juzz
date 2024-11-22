import { inject, Injectable } from '@angular/core';
import { Constants } from '../util/Constants';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private apiService: ApiService) { }

  http= inject(HttpClient);

  login(credentials: { username: string; password: string }): Observable<any> {
    // return this.apiService.post(Constants.JUZZ_URL, `api/login`, credentials);
    return this.http.post(Constants.JUZZ_URL+`api/login`, credentials);
  }

}