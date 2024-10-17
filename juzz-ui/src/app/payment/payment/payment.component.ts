import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

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
  transactionNumber: string = '';
  upiId: string = '';
  showTransactionField = false;
  showUpiField = false

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve data from the previous route
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.amount = +params['amount'];
      this.qrCodeImage = params['qrCodeImage']; // Assuming you pass the image as a URL
      this.receipt = params['receipt'];
    });
  }


  enterTransactionId() {

    this.http.post<ApiResponse>('http://localhost:8082/transaction/submit/transaction', {
      transactionId: this.receipt,
      transactionNumber: this.transactionNumber,
      upiId: this.upiId
    })
      .subscribe({
        next: (response: ApiResponse) => {
          console.log(response)
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