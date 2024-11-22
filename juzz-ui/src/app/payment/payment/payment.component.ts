import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { TransactionService } from '../../../services/transactionService';

interface ApiResponse {
  submitTransactionId: string;
  message: string;
}
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HttpClientModule, FormsModule , CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount: number | null = null;
  qrCodeImage: string = ''; // URL or byte array for QR code
  receipt: string = '';
  receiptNumber : string = '';
  transactionNumber: string = '';
  upiId: string = '';
  showTransactionField = false;
  showUpiField = false

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute , private transactionServie : TransactionService ) { }

  ngOnInit() {
    // Retrieve data from the previous route
    this.route.queryParams.subscribe(params => {
      this.amount = +params['amount'];
      this.qrCodeImage = params['qrCodeImage']; // Assuming you pass the image as a URL
      this.receipt = params['receipt'];
      this.receiptNumber = params['receiptNumber'];
    });
  }


  enterTransactionId() {
    if(this.showTransactionField || this.showUpiField){
      if(this.showTransactionField && this.transactionNumber.length==0){
        alert("Please Enter Transaction Number")
      }else if (this.showUpiField && this.upiId.length==0){
        alert("Please Enter UPI Id")
      }else if(this.showTransactionField && this.transactionNumber.length!=0){
        this.callSubmitTransaction();
      }else if(this.showUpiField && this.upiId.length!=0){
        this.callSubmitTransaction();
      }
    }
  }

  callSubmitTransaction(){
    this.transactionServie.submitPaymentData({
      transactionId: this.receipt,
      transactionNumber: this.transactionNumber,
      upiId: this.upiId
    })
      .subscribe({
        next: (response: ApiResponse) => {
          const responseId = response.submitTransactionId;
          const responseMessage = response.message;

          if (responseMessage == "FAILED" || responseMessage == "INVALID TRANSACTION") {
            error: (error: any) => {
              console.error('Error occurred:', error);
            }
          } else {
            this.router.navigate(['/submit-transaction'], {
              queryParams: {
                submitResponseId: responseId,
                submitMessage: responseMessage
              }
            });

          }


        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });

  }
}