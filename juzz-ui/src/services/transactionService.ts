import { Injectable } from '@angular/core';
import { Constants } from '../util/Constants';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionService {

  constructor(private apiService: ApiService) { }

  generateQR(data: any): Observable<any> {
    return this.apiService.post(Constants.JUZZ_URL, `v1/generateQR`, data);
  }

  submitPaymentData(data: any): Observable<any> {
    return this.apiService.post(Constants.JUZZ_URL, `v1/submit/transaction`, data);
  }

}