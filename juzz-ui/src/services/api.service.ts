import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {
 
    constructor(public http: HttpClient) {
    }
 
   get(_baseUrl : string, endpoint: string, params?: any, reqOpts?: any) {
     if (!reqOpts) {
       reqOpts = {
         params: new HttpParams()
       };
     }
 
     // Support easy query params for GET requests
     if (params) {
       reqOpts.params = new HttpParams();
       for (let k in params) {
         reqOpts.params.set(k, params[k]);
       }
     }
 
     return this.http.get(_baseUrl + endpoint, reqOpts);
   }
 
   post(_baseUrl : string,endpoint: string, body: any, reqOpts?: any) {
     //console.log(" this is trest "+_baseUrl + endpoint+" second param "+ JSON.stringify(body));
     return this.http.post<any>(_baseUrl + endpoint, body,{headers: {'Content-Type': 'application/json'} });
   }


 }
