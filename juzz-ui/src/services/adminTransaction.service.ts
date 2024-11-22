import { Inject, Injectable } from '@angular/core';
import { Constants } from '../util/Constants';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminTransactionService {

    constructor(private apiService: ApiService) { }

    http = Inject(HttpClient)

    getTransactionList(data: any , token : any): Observable<any> {
        return this.apiService.postAdmin(Constants.JUZZ_URL,"admin/transaction/list",data , token)
    }
    

}