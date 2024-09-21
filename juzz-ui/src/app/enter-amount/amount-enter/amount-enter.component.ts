import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

interface ApiResponse {
  imageQR: string; // Adjust the type based on your actual data
  id: string;
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

  constructor(private http: HttpClient , private router: Router) {}

  addAmount() {
    if (this.amount) {
      this.http.post<ApiResponse>('http://localhost:8082/transaction/generateQR', { amount: this.amount })
        .subscribe({
          next: (response: ApiResponse) => {
            console.log(response)
            const qrCodeImage = response.imageQR;
             // Now TypeScript knows this exists
            const receipt = response.id;

            this.router.navigate(['/payment'], {
              queryParams: {
                amount: this.amount,
                // qrCodeImage: `data:image/png;base64,${qrCodeImage}`,
                qrCodeImage: qrCodeImage,
                receipt: receipt
              }
            });
          },
          error: (error) => {
            console.error('Error occurred:', error);
          }
        });
    } else {
      alert('Please enter an amount.');
    }
  }
}
