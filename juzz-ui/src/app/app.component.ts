import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmountEnterComponent } from './enter-amount/amount-enter/amount-enter.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { PaymentSubmitComponent } from './payment-submit/payment-submit.component';
import { AdminTransactionComponent } from './admin-transaction/admin-transaction.component';
import { StringFilterComponent } from './shared/string-filter/string-filter.component';
import { TransactionService } from '../services/transactionService';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , AmountEnterComponent , PaymentComponent , PaymentSubmitComponent , StringFilterComponent , HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TransactionService , ApiService]
})
export class AppComponent {
  title = 'juzz-ui';
}
