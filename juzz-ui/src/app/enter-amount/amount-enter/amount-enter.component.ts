import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { TransactionService } from '../../../services/transactionService';

interface ApiResponse {
  imageQR: string; // Adjust the type based on your actual data
  id: string;
  transactionUqNumber: string;
}

@Component({
  selector: 'app-amount-enter',
  standalone: true,
  imports: [HttpClientModule , FormsModule],
  templateUrl: './amount-enter.component.html',
  styleUrl: './amount-enter.component.css'
})
export class AmountEnterComponent {
  amount: number | null = null;

  constructor(private http: HttpClient , private router: Router , private transactionServie : TransactionService) {}

  addAmount() {
    if (this.amount && this.amount>0) {
      this.transactionServie.generateQR({ amount: this.amount })
        .subscribe({
          next: (response: ApiResponse) => {
            const qrCodeImage = response.imageQR;
            const receipt = response.id;
            const receiptNumber = response.transactionUqNumber

            this.router.navigate(['/payment'], {
              queryParams: {
                amount: this.amount,
                qrCodeImage: qrCodeImage,
                receipt: receipt,
                receiptNumber : receiptNumber

              }
            });
          },
          error: (error) => {
            console.error('Error occurred:', error);
          }
        });
    } else {
      alert('Please enter valid amount.');
    }
  }
}
